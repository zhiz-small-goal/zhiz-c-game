
import React, { useState, useEffect } from 'react';
import { QuestContent } from '../types';
import { BookOpen, AlertOctagon, Lightbulb, Star, AlignLeft, RefreshCcw, ArrowRight, Heart, Link as LinkIcon, CheckCircle2, XCircle, Zap, Terminal, X, Home } from 'lucide-react';
import { evaluateAnswer } from '../services/geminiService';

interface QuestScreenProps {
  questId: string;
  quest: QuestContent;
  userGold: number;
  onComplete: (success: boolean) => void;
  onBuyHint: (cost: number) => boolean; 
  onMistake: () => void;
  onExit: () => void; // Added onExit prop
}

// Helper to generate a simple hash for the question to differentiate saves
const getChallengeHash = (str: string) => {
  if (!str) return 'unknown';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

const QuestScreen: React.FC<QuestScreenProps> = ({ questId, quest, userGold, onComplete, onBuyHint, onMistake, onExit }) => {
  // Guard clause: If quest or challenge is missing, display error instead of crashing
  if (!quest || !quest.challenge) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white/80 rounded-3xl shadow-xl">
            <AlertOctagon size={64} className="text-amber-400 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-slate-700 cute-font mb-2">魔法书好像缺了一页！</h2>
            <p className="text-slate-500 mb-6">这个问题有点害羞，躲起来了。请点击返回，重试一下吧。</p>
            <button 
                onClick={onExit}
                className="px-6 py-3 bg-indigo-400 text-white rounded-full font-bold shadow-lg hover:bg-indigo-500 transition-colors"
            >
                返回地图
            </button>
        </div>
    );
  }

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // Generate unique storage key based on quest ID AND question content
  const challengeHash = getChallengeHash(quest.challenge.question);
  const storageKey = `quest_autosave_${questId}_${challengeHash}`;

  // Lazy initialize codeAnswer from localStorage if available, otherwise from snippet
  const [codeAnswer, setCodeAnswer] = useState<string>(() => {
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) return saved;
    } catch (e) {
        console.warn("Failed to load autosave", e);
    }
    
    // Only pre-fill for code-fix type
    if (quest.challenge.type === 'code-fix' && quest.challenge.codeSnippet) {
        return quest.challenge.codeSnippet;
    }
    return '';
  });

  // Reset state when quest/challenge changes (important if component is recycled)
  useEffect(() => {
    setFeedback(null);
    setCompilerError(null);
    setShowHint(false);
    setSelectedOption(null);
    
    // Attempt to load saved answer for this specific challenge
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) {
            setCodeAnswer(saved);
        } else if (quest.challenge.type === 'code-fix' && quest.challenge.codeSnippet) {
            setCodeAnswer(quest.challenge.codeSnippet);
        } else {
            setCodeAnswer('');
        }
    } catch (e) {
        // ignore
    }
  }, [quest.challenge.question, storageKey, quest.challenge.codeSnippet, quest.challenge.type]);

  // Auto-save effect
  useEffect(() => {
    if (quest.challenge.type !== 'multiple-choice') {
        try {
            localStorage.setItem(storageKey, codeAnswer);
        } catch (e) {
            console.warn("Failed to autosave", e);
        }
    }
  }, [codeAnswer, storageKey, quest.challenge.type]);

  const handleSubmit = async () => {
    // 1. Validate Input
    const answer = quest.challenge.type === 'multiple-choice' ? selectedOption : codeAnswer;
    
    if (!answer || (typeof answer === 'string' && !answer.trim())) {
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
      setFeedback("请先告诉兔兔你的答案哦！");
      setCompilerError(null);
      return;
    }

    setIsSubmitting(true);
    setCompilerError(null);
    setFeedback(null);

    const result = await evaluateAnswer(quest, answer);
    
    if (!result.isCorrect) {
      // Error Logic
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500); // Reset animation class

      setFeedback(result.feedback);
      if (result.compilerError) {
          setCompilerError(result.compilerError);
      }
      onMistake(); 
      setIsSubmitting(false);
      return; 
    }

    // Success Logic
    setFeedback(result.feedback);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(true);
    }, 2000);
  };

  const handleBuyHint = () => {
    if (onBuyHint(20)) {
      setShowHint(true);
    }
  };

  const handleFormatCode = () => {
    let indentLevel = 0;
    const formatted = codeAnswer.split('\n').map(line => {
        const trimmed = line.trim();
        if (!trimmed) return ''; 
        if (trimmed.startsWith('}')) {
             indentLevel = Math.max(0, indentLevel - 1);
        }
        const result = '  '.repeat(indentLevel) + trimmed;
        const open = (trimmed.match(/{/g) || []).length;
        const close = (trimmed.match(/}/g) || []).length;
        indentLevel = Math.max(0, indentLevel + open - close);
        return result;
    }).join('\n');
    setCodeAnswer(formatted);
  };

  const renderLessonContent = (content: string) => {
    const parts = content.split(/```/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
         const cleanCode = part.replace(/^(cpp|c\+\+|c)\n?/, '').trim();
         return (
           <div key={index} className="my-4 rounded-xl bg-slate-800 border-2 border-slate-700 p-4 overflow-x-auto relative shadow-inner group">
             <div className="absolute top-2 right-2 text-[10px] text-slate-400 font-mono opacity-50">C++</div>
             <pre className="font-mono text-sm text-green-400 leading-relaxed whitespace-pre">
               {cleanCode}
             </pre>
           </div>
         );
      }
      return (
        <div key={index} className="space-y-4">
          {part.split(/\n+/).filter(p => p.trim()).map((p, pIdx) => {
            const trimmed = p.trim();
            if (trimmed.startsWith('【') && trimmed.endsWith('】')) {
                return (
                    <h3 key={pIdx} className="text-xl font-black text-rose-400 mt-6 mb-2 cute-font tracking-wide flex items-center gap-2">
                        <Star size={20} fill="currentColor" className="text-rose-200" />
                        {trimmed}
                    </h3>
                )
            }
            return (
                <p key={pIdx} className="leading-7 text-slate-600">
                    {trimmed}
                </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-24 animate-pop-in relative">
      
      {/* EXIT BUTTON - Fixed Top Left but moved down to avoid overlap */}
      <button 
        onClick={onExit}
        className="fixed top-24 left-4 z-[60] bg-white/90 backdrop-blur-md border-4 border-white text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all p-3 rounded-full shadow-xl hover:scale-110 group"
        title="返回地图"
      >
        <Home size={28} strokeWidth={2.5} className="group-hover:animate-bounce-slow" />
      </button>

      {/* Magic Book Container */}
      <div className="bg-white rounded-[40px] shadow-2xl border-8 border-white overflow-hidden flex flex-col md:flex-row min-h-[70vh]">
        
        {/* Left Page: Story & Lesson */}
        <div className="md:w-1/2 bg-rose-50/50 p-8 md:p-10 border-r-4 border-rose-100 border-dashed relative flex flex-col max-h-[80vh] md:max-h-none overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-rose-200 p-2 rounded-full text-rose-500 shadow-sm">
                    <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-black cute-font text-slate-700">{quest.title}</h2>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 mb-6 italic text-slate-600 relative">
                <span className="text-4xl text-rose-200 absolute -top-4 -left-2">"</span>
                {quest.storyContext}
                <span className="text-4xl text-rose-200 absolute -bottom-8 -right-2">"</span>
            </div>

            <div className="prose prose-pink prose-sm md:prose-base font-medium flex-grow">
                {renderLessonContent(quest.lessonContent)}
            </div>

            {/* Grounding Sources */}
            {quest.sources && quest.sources.length > 0 && (
                <div className="mt-8 pt-6 border-t-2 border-rose-100/50">
                    <div className="flex items-center gap-2 mb-3 text-rose-300">
                        <LinkIcon size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider">魔法参考书目</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quest.sources.slice(0, 3).map((source, idx) => (
                            <a 
                                key={idx}
                                href={source.uri}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] bg-white text-rose-400 px-3 py-1.5 rounded-full border border-rose-100 hover:bg-rose-100 transition-colors truncate max-w-[200px]"
                            >
                                {source.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Right Page: Challenge */}
        <div className="md:w-1/2 p-8 md:p-10 bg-white relative flex flex-col max-h-[80vh] md:max-h-none overflow-y-auto">
            <div className="mb-6">
                 <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm mb-4">
                    <Zap size={16} fill="currentColor" /> 小小挑战
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2 leading-relaxed">{quest.challenge.question}</h3>
                 
                 {/* Display code snippet for multiple-choice/concept challenges if present */}
                 {quest.challenge.type !== 'code-fix' && quest.challenge.codeSnippet && (
                    <div className="my-4 bg-slate-800 border border-slate-700 rounded-xl p-4 overflow-x-auto relative group shadow-inner">
                        <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-2">
                           <Terminal size={14} className="text-slate-400" />
                           <span className="text-xs text-slate-400 font-mono font-bold">Code Preview</span>
                        </div>
                        <pre className="font-mono text-sm text-blue-300 whitespace-pre">
                            {quest.challenge.codeSnippet}
                        </pre>
                    </div>
                 )}
            </div>

            {/* Inputs */}
            <div className={`flex-1 transition-transform ${isShake ? 'animate-shake' : ''}`}>
                {quest.challenge.type === 'multiple-choice' ? (
                    <div className="space-y-3">
                    {quest.challenge.options?.map((opt, idx) => (
                        <button
                        key={idx}
                        onClick={() => { setSelectedOption(opt); setFeedback(null); }}
                        disabled={isSubmitting}
                        className={`w-full text-left p-4 rounded-2xl transition-all border-2 font-medium
                            ${selectedOption === opt 
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm scale-[1.02]' 
                            : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 text-slate-600'}
                        `}
                        >
                            <span className="inline-block w-8 font-bold text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                        </button>
                    ))}
                    </div>
                ) : (
                    <div className="relative group h-full">
                        {/* Only show Code Formatter for code-fix type */}
                        {quest.challenge.type === 'code-fix' && (
                            <div className="absolute top-2 right-2 flex gap-2 z-20">
                                <button onClick={handleFormatCode} className="p-2 bg-white rounded-lg shadow-sm text-slate-400 hover:text-indigo-500 border border-slate-100" title="整理代码">
                                    <AlignLeft size={16} />
                                </button>
                            </div>
                        )}
                        <textarea 
                            value={codeAnswer}
                            onChange={(e) => { setCodeAnswer(e.target.value); setCompilerError(null); setFeedback(null); }}
                            className={`w-full min-h-[250px] p-4 pt-12 rounded-3xl border-2 focus:outline-none focus:ring-4 transition-all resize-none
                                ${compilerError 
                                    ? 'bg-amber-50 border-amber-200 focus:ring-amber-100 text-slate-700' 
                                    : 'bg-slate-50 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 text-slate-700'}
                                ${quest.challenge.type === 'code-fix' ? 'font-mono text-sm' : 'font-sans text-base'}
                            `}
                            placeholder={quest.challenge.type === 'code-fix' ? "// 在这里写下你的魔法咒语..." : "请在这里写下你的理解..."}
                            disabled={isSubmitting}
                            spellCheck={false}
                        />
                         {compilerError && (
                            <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-700 text-sm p-4 rounded-2xl flex items-start gap-3 animate-pop-in shadow-sm">
                                <div className="bg-amber-100 p-1.5 rounded-full shrink-0 text-amber-500">
                                    <AlertOctagon size={18} />
                                </div>
                                <div>
                                    <div className="font-bold mb-1">魔法反噬警告</div>
                                    <div className="opacity-90">{compilerError}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
                
                {/* Feedback Area - Separates success, warning and error visually */}
                {feedback && !compilerError && (
                    <div className={`p-4 rounded-2xl shadow-md animate-pop-in flex items-center gap-3 font-bold border-2
                        ${feedback.includes("棒") || feedback.includes("对") 
                            ? 'bg-green-50 border-green-200 text-green-600' 
                            : feedback.includes("请先") 
                                ? 'bg-amber-50 border-amber-200 text-amber-600'
                                : 'bg-rose-50 border-rose-200 text-rose-500'}
                    `}>
                        {feedback.includes("棒") || feedback.includes("对") 
                            ? <div className="bg-green-200 p-1 rounded-full"><CheckCircle2 size={20} /></div>
                            : feedback.includes("请先")
                                ? <div className="bg-amber-200 p-1 rounded-full"><AlertOctagon size={20} /></div>
                                : <div className="bg-rose-200 p-1 rounded-full"><XCircle size={20} /></div>
                        }
                        <span>{feedback}</span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4">
                     {/* Hint Button */}
                    {showHint ? (
                    <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-sm border border-yellow-100 flex-1 flex items-center gap-2">
                        <Lightbulb className="shrink-0 w-4 h-4 text-yellow-400" /> 
                        <span>{quest.hint}</span>
                    </div>
                    ) : (
                    <button 
                        onClick={handleBuyHint}
                        disabled={userGold < 20}
                        className={`text-sm font-bold text-slate-400 hover:text-yellow-500 transition-colors flex items-center gap-1 ${userGold < 20 ? 'opacity-50' : ''}`}
                    >
                        <Lightbulb size={18} /> 偷看一眼 (20)
                    </button>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`
                            px-8 py-3 rounded-2xl font-bold text-white shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ml-auto
                            bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500
                            ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
                        `}
                    >
                        {isSubmitting ? <RefreshCcw className="animate-spin" /> : 
                        <>施展魔法 <ArrowRight size={18} /></>}
                    </button>
                </div>
            </div>
            
        </div>

      </div>
    </div>
  );
};

export default QuestScreen;
