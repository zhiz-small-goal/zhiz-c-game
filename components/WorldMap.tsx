
import React, { useState } from 'react';
import { TopicNode } from '../types';
import { REGION_COLORS, REGION_BG } from '../constants';
import { Lock, Check, MapPin, Sparkles, Cloud, Sun, Star, Heart } from 'lucide-react';

interface WorldMapProps {
  nodes: TopicNode[];
  onNodeClick: (node: TopicNode) => void;
}

const REGION_NAMES: Record<string, string> = {
  'Plains': '草莓语法地',
  'Forest': '糖果循环林',
  'Fortress': '云朵函数城',
  'Peaks': '星星指针山',
  'Void': '梦幻造物岛'
};

const REGION_ICONS: Record<string, React.ReactNode> = {
  'Plains': <Sun className="text-pink-200 w-24 h-24 absolute -top-4 -right-4 rotate-12" />,
  'Forest': <Cloud className="text-teal-200 w-24 h-24 absolute -bottom-2 -left-4" />,
  'Fortress': <Cloud className="text-sky-200 w-24 h-24 absolute top-2 right-10" />,
  'Peaks': <Star className="text-violet-200 w-24 h-24 absolute top-0 left-0 animate-pulse" />,
  'Void': <Sparkles className="text-fuchsia-200 w-24 h-24 absolute bottom-0 right-0" />,
};

const WorldMap: React.FC<WorldMapProps> = ({ nodes, onNodeClick }) => {
  
  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-12 pb-32">
      
      {/* Header */}
      <header className="text-center relative z-10 animate-pop-in mt-8">
        <div className="inline-block relative">
             <div className="absolute -top-6 -right-6 text-yellow-300 animate-bounce-slow">
                 <Sparkles size={40} />
             </div>
            <h2 className="text-5xl font-black cute-font text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-sm">
            魔法代码世界
            </h2>
        </div>
        <p className="text-slate-500 font-medium mt-2 bg-white/60 px-4 py-2 rounded-full inline-block backdrop-blur-sm shadow-sm">
          一起去探索神奇的 C++ 乐园吧！
        </p>
      </header>

      {/* Render Regions */}
      {['Plains', 'Forest', 'Fortress', 'Peaks', 'Void'].map((region, regionIdx) => {
        const regionNodes = nodes.filter(n => n.region === region);
        if (regionNodes.length === 0) return null;

        const colorClass = REGION_COLORS[region as keyof typeof REGION_COLORS];
        const bgClass = REGION_BG[region as keyof typeof REGION_BG];
        const regionDisplayName = REGION_NAMES[region] || region;

        return (
          <div 
            key={region} 
            className={`
              relative w-full p-8 rounded-[40px] border-4 border-white shadow-xl
              ${bgClass} transition-transform duration-500 hover:scale-[1.02]
            `}
          >
             {/* Cute Decor */}
             {REGION_ICONS[region]}

             {/* Label */}
             <div className="absolute -top-5 left-8 z-20">
               <div className="bg-white px-5 py-2 text-lg font-bold cute-font text-slate-600 border-4 border-white rounded-full shadow-md flex items-center gap-2">
                 <span className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0].replace('text', 'bg')}`}/>
                 {regionDisplayName}
               </div>
             </div>
             
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 relative mt-4 z-10">
               
               {/* Dotted Path */}
               <div className="absolute top-1/2 left-10 right-10 h-0 border-t-4 border-dotted border-white/60 -z-10 hidden md:block"></div>

               {regionNodes.map((node, idx) => {
                 const isUnlocked = !node.locked;
                 const isCompleted = node.completed;
                 const isActive = isUnlocked && !isCompleted;
                 
                 return (
                 <div key={node.id} className="flex flex-col items-center group">
                    <button
                      onClick={() => !node.locked && onNodeClick(node)}
                      disabled={node.locked}
                      className={`
                        relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300
                        ${node.locked 
                            ? 'bg-slate-200/50 border-slate-300 cursor-not-allowed grayscale' 
                            : 'bg-white cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-xl'}
                        ${isCompleted ? 'border-green-300' : ''}
                        ${isActive ? 'border-pink-400 scale-110 ring-4 ring-pink-100 animate-bounce-slow' : ''}
                      `}
                    >
                      {node.locked ? (
                          <Lock size={24} className="text-slate-400" />
                      ) : node.completed ? (
                          <div className="text-green-400 bg-green-50 rounded-full p-2">
                            <Check size={28} strokeWidth={4} />
                          </div>
                      ) : (
                          <div className="text-pink-400">
                              <Star size={32} fill="currentColor" className="text-pink-200" />
                          </div>
                      )}
                    </button>
                    
                    {/* Node Title */}
                    <div 
                      className={`mt-3 px-3 py-1 rounded-xl text-sm font-bold cute-font text-slate-600 bg-white/80 backdrop-blur shadow-sm transition-all
                        ${isActive ? 'scale-110 text-pink-500' : 'scale-100'}
                      `}
                    >
                        {node.title}
                    </div>
                 </div>
               )})}
             </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorldMap;
