'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingDown, X, ChevronDown } from 'lucide-react';

export default function ReminderCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="px-6 relative">
       <div className="flex items-center gap-2 mb-3">
         <span className="text-orange-400">✨</span>
         <h2 className="text-xs font-bold text-gray-600 tracking-wider uppercase">Chat with Nutribuddy</h2>
       </div>

       <Card className="bg-purple-50 border border-purple-100 shadow-sm relative">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-purple-300 hover:text-purple-500 transition-colors"
          >
            <X size={16} />
          </button>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
               <TrendingDown size={20} />
            </div>
            
            <div className="flex-1 pt-1">
              <h3 className="text-[15px] font-bold text-indigo-900 mb-1">Protein Gap — 450g behind 💪</h3>
              <p className="text-xs text-indigo-900/70 leading-relaxed mb-3 pr-4">
                You're only at 5% of expected protein for day 5. Here are easy fixes:
              </p>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
              >
                 <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                 {isExpanded ? 'Hide' : '3 quick fixes'} 
                 {!isExpanded && <span className="ml-1">→</span>}
              </button>
              
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-purple-200/50 flex flex-col gap-2">
                  <div className="text-xs text-indigo-900/80">• Add 2 boiled eggs to your breakfast (+12g)</div>
                  <div className="text-xs text-indigo-900/80">• Snack on 50g of roasted peanuts (+13g)</div>
                  <div className="text-xs text-indigo-900/80">• Include 1 cup of dal with lunch (+18g)</div>
                </div>
              )}
            </div>
          </div>
       </Card>
    </div>
  );
}
