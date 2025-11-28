
import React, { useState, useEffect } from 'react';
import { UserStats } from '../types';
import { Heart, Star, Settings, UserCircle, Gift } from 'lucide-react';

interface StatusPanelProps {
  stats: UserStats;
  onOpenSettings: () => void;
  notification: { amount?: number; id: number; reason?: string; drop?: { icon: string, text: string } } | null;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ stats, onOpenSettings, notification }) => {
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    if (notification) {
      setShowNotify(true);
      const timer = setTimeout(() => setShowNotify(false), 3500); // Slightly longer for drops
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
       <div className="max-w-5xl mx-auto flex justify-between items-start pointer-events-auto">
          
          {/* Player Card */}
          <div className="bg-white/80 backdrop-blur-md border-2 border-white rounded-3xl shadow-lg p-2 pr-6 flex items-center gap-3 animate-pop-in">
             <div className="relative">
                 <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center border-2 border-pink-200 text-pink-400">
                    <UserCircle size={32} />
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-white">
                    LV.{stats.level}
                 </div>
             </div>
             <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold cute-font text-slate-700">小小魔法师</span>
                </div>
                
                {/* Health Hearts */}
                <div className="flex gap-1">
                   {Array.from({ length: 5 }).map((_, i) => {
                       const hpPerHeart = stats.maxHp / 5;
                       const currentHeartHp = Math.max(0, Math.min(hpPerHeart, stats.hp - (i * hpPerHeart)));
                       const fillPct = (currentHeartHp / hpPerHeart) * 100;
                       
                       return (
                           <div key={i} className="relative w-4 h-4 text-slate-200">
                               <Heart size={16} fill="currentColor" className="absolute top-0 left-0" />
                               <div style={{ width: `${fillPct}%` }} className="overflow-hidden absolute top-0 left-0">
                                   <Heart size={16} fill="#fb7185" className="text-rose-400" />
                               </div>
                           </div>
                       )
                   })}
                </div>
             </div>
             
             {/* Badge Collection Preview (Mini) */}
             {stats.badges.length > 0 && (
                 <div className="hidden md:flex items-center gap-1 ml-4 border-l-2 border-slate-100 pl-4">
                     {stats.badges.slice(-3).map((badge, i) => (
                         <div key={badge.id} className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-lg border border-indigo-100 shadow-sm" title={badge.name}>
                             {badge.icon}
                         </div>
                     ))}
                     {stats.badges.length > 3 && (
                         <div className="text-xs text-slate-400 font-bold">+{stats.badges.length - 3}</div>
                     )}
                 </div>
             )}
          </div>

          {/* Right Side: Resources & Settings */}
          <div className="flex gap-3">
              {/* Stars/Gold */}
              <div className="bg-white/80 backdrop-blur-md border-2 border-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 animate-pop-in relative">
                 <Star fill="#facc15" className="text-yellow-400" size={20} />
                 <span className="font-bold text-slate-600 font-mono">{stats.gold}</span>
                 
                 {/* Combined Notification Bubble */}
                 {showNotify && notification && (
                    <div className="absolute top-14 right-0 min-w-[180px] bg-white border-2 border-pink-100 rounded-2xl animate-bounce shadow-xl z-50 overflow-hidden">
                        {/* XP Section */}
                        {notification.amount && (
                            <div className="bg-yellow-50 px-3 py-2 flex justify-between items-center border-b border-yellow-100">
                                <span className="text-yellow-700 font-bold text-xs">+{notification.amount} 经验</span>
                                {notification.reason && (
                                    <span className="text-[10px] text-pink-400 font-bold ml-2 bg-white px-1.5 rounded-full">{notification.reason}</span>
                                )}
                            </div>
                        )}
                        {/* Item Drop Section */}
                        {notification.drop && (
                            <div className="px-3 py-2 flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50">
                                <div className="text-xl animate-spin-slow">{notification.drop.icon}</div>
                                <div className="text-xs font-bold text-purple-600 leading-tight">
                                    {notification.drop.text}
                                </div>
                            </div>
                        )}
                    </div>
                 )}
              </div>

              <button 
                onClick={onOpenSettings}
                className="bg-white/80 hover:bg-white backdrop-blur-md border-2 border-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-slate-400 hover:text-pink-400 transition-colors"
              >
                  <Settings size={24} />
              </button>
          </div>
       </div>
    </div>
  );
};

export default StatusPanel;
