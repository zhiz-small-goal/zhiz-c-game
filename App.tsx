
import React, { useState, useEffect, useRef } from 'react';
import StatusPanel from './components/StatusPanel';
import WorldMap from './components/WorldMap';
import QuestScreen from './components/QuestScreen';
import { UserStats, TopicNode, QuestContent, AppScreen, DifficultyLevel } from './types';
import { INITIAL_STATS, TOPIC_MAP, XP_PER_LEVEL, DIFFICULTY_SETTINGS, BONUS_PERFECT, BONUS_SPEED, SPEED_THRESHOLD_MS, POSSIBLE_BADGES } from './constants';
import { generateQuest } from './services/geminiService';
import { audioService } from './services/audioService';
import { Loader2, X, Star, Cloud, LockKeyholeOpen, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [nodes, setNodes] = useState<TopicNode[]>(TOPIC_MAP);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('MAP');
  const [activeQuest, setActiveQuest] = useState<QuestContent | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(() => {
    try {
      const saved = localStorage.getItem('cpp_quest_difficulty');
      if (saved && ['EASY', 'NORMAL', 'HARD'].includes(saved)) {
        return saved as DifficultyLevel;
      }
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }
    return 'NORMAL';
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [gameNotification, setGameNotification] = useState<{ amount?: number; id: number; reason?: string; drop?: { icon: string, text: string } } | null>(null);

  // Secret Unlock State
  const [secretCode, setSecretCode] = useState("");

  // Bonus Tracking
  const questStartTimeRef = useRef<number>(0);
  const [questMistakes, setQuestMistakes] = useState(0);

  const changeDifficulty = (level: DifficultyLevel) => {
    setDifficulty(level);
    try {
      localStorage.setItem('cpp_quest_difficulty', level);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  // Level Up Effect
  useEffect(() => {
    if (stats.xp >= stats.level * XP_PER_LEVEL) {
      audioService.playLevelUp(); // Sound Effect
      setStats(prev => ({
        ...prev,
        level: prev.level + 1,
        maxHp: prev.maxHp + 20,
        hp: prev.maxHp + 20, 
        xp: prev.xp - (prev.level * XP_PER_LEVEL)
      }));
    }
  }, [stats.xp, stats.level]);

  // Defeat Effect
  useEffect(() => {
    if (stats.hp <= 0 && currentScreen !== 'DEFEAT') {
      audioService.playDefeat();
      setCurrentScreen('DEFEAT');
    }
  }, [stats.hp, currentScreen]);

  // Reusable function to start a quest
  const startQuest = async (nodeId: string, nodeTitle: string) => {
    setLoading(true);
    setErrorMsg(null);
    setActiveNodeId(nodeId);
    setQuestMistakes(0); // Reset mistakes
    questStartTimeRef.current = Date.now(); // Start timer

    try {
      // Pass node.id as the first argument to lookup static quests
      const quest = await generateQuest(nodeId, nodeTitle, stats.level, difficulty);
      setActiveQuest(quest);
      setCurrentScreen('QUEST');
      // Update start time again to be precise when the screen actually shows
      questStartTimeRef.current = Date.now();
    } catch (err) {
      setErrorMsg("哎呀，好像连不上魔法网络了。");
      setActiveNodeId(null);
      setCurrentScreen('MAP');
    } finally {
      setLoading(false);
    }
  };

  const handleNodeClick = (node: TopicNode) => {
    audioService.playClick();
    startQuest(node.id, node.title);
  };

  const handleBuyHint = (cost: number): boolean => {
    audioService.playClick();
    if (stats.gold >= cost) {
      setStats(prev => ({ ...prev, gold: prev.gold - cost }));
      return true;
    }
    return false;
  };

  const handleQuestMistake = () => {
    audioService.playMistake();
    setQuestMistakes(prev => prev + 1);
    setStats(prev => ({ ...prev, hp: Math.max(0, prev.hp - 5) }));
  };

  const handleQuestComplete = (success: boolean) => {
    const config = DIFFICULTY_SETTINGS[difficulty];

    if (success) {
      audioService.playSuccess();
      
      let newXp = config.xpReward;
      let reason = "";
      const duration = Date.now() - questStartTimeRef.current;
      const isPerfect = questMistakes === 0;
      const isSpeed = duration < SPEED_THRESHOLD_MS;

      // Bonus Logic
      if (isPerfect) {
        newXp += BONUS_PERFECT;
        reason = "完美通关！";
      }

      if (isSpeed) {
        newXp += BONUS_SPEED;
        reason = reason ? "完美 & 极速！" : "极速通关！";
      }

      // Treasure Chest Logic (30% chance on bonus)
      let dropMessage = undefined;
      let newGold = stats.gold + 10;
      let newBadges = [...stats.badges];

      if (isPerfect || isSpeed) {
        if (Math.random() < 0.3) {
           // Chest Spawned!
           // 50/50 Chance for Gold or Badge
           if (Math.random() < 0.5) {
               const bonusGold = Math.floor(Math.random() * 50) + 20;
               newGold += bonusGold;
               dropMessage = { icon: '💰', text: `宝箱: ${bonusGold} 糖果` };
           } else {
               // Try to find a badge user doesn't have
               const unowned = POSSIBLE_BADGES.filter(b => !stats.badges.find(ub => ub.id === b.id));
               if (unowned.length > 0) {
                   const newBadge = unowned[Math.floor(Math.random() * unowned.length)];
                   newBadges.push(newBadge);
                   dropMessage = { icon: '🎁', text: `获得: ${newBadge.name} ${newBadge.icon}` };
               } else {
                   // Fallback to gold if all badges owned
                   const bonusGold = 88;
                   newGold += bonusGold;
                   dropMessage = { icon: '💎', text: `大宝藏: ${bonusGold} 糖果` };
               }
           }
        }
      }

      setStats(prev => ({ ...prev, xp: prev.xp + newXp, gold: newGold, badges: newBadges }));
      setGameNotification({ amount: newXp, id: Date.now(), reason, drop: dropMessage });
      
      // Determine next node logic
      let nextNodeToLoad: TopicNode | null = null;

      if (activeNodeId) {
         const nodeIndex = nodes.findIndex(n => n.id === activeNodeId);
         if (nodeIndex !== -1) {
            const updatedNodes = [...nodes];
            updatedNodes[nodeIndex] = { ...updatedNodes[nodeIndex], completed: true };

            if (nodeIndex + 1 < updatedNodes.length) {
                updatedNodes[nodeIndex + 1].locked = false;
                nextNodeToLoad = updatedNodes[nodeIndex + 1];
            }
            setNodes(updatedNodes);
         }
      }
      
      // Auto-advance delay
      setTimeout(() => {
          if (nextNodeToLoad) {
              startQuest(nextNodeToLoad.id, nextNodeToLoad.title);
          } else {
              setCurrentScreen('MAP');
              setActiveNodeId(null);
          }
      }, 1500); // 1.5s delay to show success feedback before loading next

    } else {
      audioService.playMistake(); // Larger mistake sound
      setStats(prev => ({ ...prev, hp: Math.max(0, prev.hp - config.damage) }));
      setTimeout(() => setCurrentScreen('MAP'), 2000); 
    }
  };

  const handleReset = () => {
    audioService.playClick();
    setStats(INITIAL_STATS);
    setNodes(TOPIC_MAP);
    setCurrentScreen('MAP');
    setActiveNodeId(null);
  };

  const handleSecretUnlock = () => {
    if (secretCode === "枝枝宝最可爱") {
        audioService.playLevelUp();
        setNodes(nodes.map(n => ({ ...n, locked: false })));
        setGameNotification({ 
            amount: 9999, 
            id: Date.now(), 
            reason: "终极咒语生效！", 
            drop: { icon: '🔓', text: '全关卡已解锁' } 
        });
        setSecretCode("");
        setShowSettings(false);
    } else {
        audioService.playMistake();
        setSecretCode(""); // Clear on error
    }
  };

  return (
    <div className="min-h-screen font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-[10%] left-[-100px] text-pink-100 opacity-60 animate-cloud"><Cloud size={200} fill="currentColor" /></div>
          <div className="absolute top-[40%] left-[-200px] text-blue-50 opacity-60 animate-cloud" style={{ animationDelay: '10s' }}><Cloud size={300} fill="currentColor" /></div>
          <div className="absolute top-[20%] left-[-150px] text-yellow-50 opacity-40 animate-cloud" style={{ animationDelay: '20s' }}><Cloud size={150} fill="currentColor" /></div>
      </div>

      <StatusPanel stats={stats} onOpenSettings={() => setShowSettings(true)} notification={gameNotification} />
      
      <main className="h-screen overflow-y-auto scroll-smooth">
        
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[60] flex flex-col items-center justify-center animate-pop-in">
            <div className="relative">
                <div className="absolute inset-0 bg-pink-200 rounded-full blur-xl animate-pulse"></div>
                <Loader2 className="relative w-16 h-16 text-pink-500 animate-spin" />
            </div>
            <p className="text-pink-400 cute-font text-2xl mt-6 font-bold">兔兔正在准备题目...</p>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
           <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-pop-in">
              <div className="bg-white rounded-[40px] p-8 w-full max-w-lg shadow-2xl relative border-4 border-pink-100 max-h-[90vh] overflow-y-auto">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="absolute top-6 right-6 text-slate-300 hover:text-pink-400 bg-slate-50 rounded-full p-2"
                  >
                    <X size={24} />
                  </button>
                  
                  <h2 className="text-3xl font-black text-slate-700 cute-font mb-6 text-center">
                    游戏设置
                  </h2>

                  <div className="space-y-4 mb-8">
                    {(['EASY', 'NORMAL', 'HARD'] as DifficultyLevel[]).map((level) => {
                      const config = DIFFICULTY_SETTINGS[level];
                      const isSelected = difficulty === level;
                      
                      return (
                        <button
                          key={level}
                          onClick={() => { audioService.playClick(); changeDifficulty(level); }}
                          className={`w-full text-left p-6 rounded-3xl border-4 transition-all duration-200 group
                            ${isSelected 
                                ? 'bg-indigo-50 border-indigo-200 shadow-inner' 
                                : 'bg-white border-slate-100 hover:border-pink-100'}
                          `}
                        >
                             <div className={`font-bold text-xl mb-1 cute-font ${isSelected ? 'text-indigo-500' : 'text-slate-600'}`}>
                                {config.label}
                             </div>
                             <div className="text-sm text-slate-400 font-medium">{config.description}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Badge Collection Section */}
                  {stats.badges.length > 0 && (
                      <div className="mb-8">
                          <h3 className="text-xl font-bold text-slate-600 cute-font mb-3 text-center flex items-center justify-center gap-2">
                              <Star size={20} className="text-yellow-400" fill="currentColor" />
                              我的宝物馆 ({stats.badges.length})
                          </h3>
                          <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                              {stats.badges.map(badge => (
                                  <div key={badge.id} className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-100 shadow-sm" title={badge.description}>
                                      <div className="text-2xl mb-1">{badge.icon}</div>
                                      <div className="text-[10px] text-slate-500 font-bold truncate w-full text-center px-1">{badge.name}</div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  <div className="mt-4 text-center">
                    <button 
                        onClick={() => { audioService.playClick(); setShowSettings(false); }}
                        className="px-10 py-3 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-full shadow-lg shadow-pink-200 transition-all hover:-translate-y-1"
                    >
                        好啦！
                    </button>
                  </div>
                  
                  {/* Secret Unlock Section */}
                  <div className="mt-8 pt-6 border-t-2 border-slate-50">
                     <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">
                            <Wand2 size={12} />
                            <span>神秘咒语</span>
                        </div>
                        <div className="flex gap-2 w-full max-w-xs">
                            <input 
                                type="text" 
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                placeholder="输入神秘咒语..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-pink-300 text-slate-600 placeholder:text-slate-300"
                            />
                            <button 
                                onClick={handleSecretUnlock}
                                disabled={!secretCode}
                                className="bg-slate-100 hover:bg-pink-100 text-slate-400 hover:text-pink-500 p-2 rounded-xl transition-colors disabled:opacity-50"
                            >
                                <LockKeyholeOpen size={18} />
                            </button>
                        </div>
                     </div>
                  </div>

              </div>
           </div>
        )}

        <div key={currentScreen} className="min-h-full">
            {currentScreen === 'MAP' && (
                <WorldMap nodes={nodes} onNodeClick={handleNodeClick} />
            )}

            {currentScreen === 'QUEST' && activeQuest && (
            <QuestScreen 
                key={activeNodeId}
                questId={activeNodeId!}
                quest={activeQuest} 
                userGold={stats.gold}
                onComplete={handleQuestComplete} 
                onBuyHint={handleBuyHint}
                onMistake={handleQuestMistake}
                onExit={() => { // Pass exit handler
                    audioService.playClick();
                    setCurrentScreen('MAP');
                    setActiveNodeId(null);
                }}
            />
            )}

            {currentScreen === 'DEFEAT' && (
            <div className="flex flex-col items-center justify-center h-[90vh] text-center p-4">
                <div className="bg-white p-12 rounded-[50px] shadow-2xl border-8 border-rose-100 max-w-lg w-full">
                    <div className="text-6xl mb-6">🥺</div>
                    <h1 className="text-4xl font-black text-rose-400 cute-font mb-4">
                        没关系，下次一定行！
                    </h1>
                    <p className="text-lg text-slate-500 mb-8 font-medium">
                        虽然这次能量用光了，但是你已经学到了很多呢。要不要休息一下再来？
                    </p>
                    <button 
                        onClick={handleReset}
                        className="w-full py-4 bg-rose-400 hover:bg-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 transition-transform hover:-translate-y-1"
                    >
                        重新开始
                    </button>
                </div>
            </div>
            )}
        </div>

      </main>
    </div>
  );
};

export default App;
