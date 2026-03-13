import { Card } from '@/components/ui/Card';

interface ChatPromptProps {
  onShowProgressClick: () => void;
}

export default function ChatPrompt({ onShowProgressClick }: ChatPromptProps) {
  return (
    <div className="px-6 relative mt-8">
      {/* Show Progress Button Overlap */}
      <div className="absolute -top-12 right-6 z-20">
        <button 
           onClick={onShowProgressClick}
           className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
        >
          Show my progress
        </button>
      </div>
      
      {/* Bot Message */}
      <div className="flex gap-3 mb-6 items-end mt-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
           {/* Avatar placeholder */}
           <span className="text-xl">🍲</span>
        </div>
        <Card className="rounded-xl rounded-bl-sm border border-gray-100 p-4 shrink tracking-wide shadow-sm flex-1">
          <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
            Hello there! To show your progress, I need a bit more info, yaar. Are you looking for your food intake, activity, hydration, or sleep details?
          </p>
        </Card>
      </div>

      {/* Suggested chips line */}
      <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar pb-2">
         {['🥚 Post-workout meal', '💧 Hydration tip', '😴 Rest needed'].map((chip) => (
           <button key={chip} className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0 shadow-sm">
             {chip}
           </button>
         ))}
      </div>
    </div>
  );
}
