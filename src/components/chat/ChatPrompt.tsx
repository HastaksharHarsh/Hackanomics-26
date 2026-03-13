import { Card } from '@/components/ui/Card';

interface ChatPromptProps {
  onSendMessage: (msg: string) => void;
}

const CHIPS = [
  { label: '🥚 Post-workout meal', prompt: 'What should I eat after a workout for muscle recovery? Give me quick hostel-friendly options.' },
  { label: '💧 Hydration tip', prompt: 'Give me a quick hydration tip for today. How much water should I drink as a student?' },
  { label: '😴 Rest needed', prompt: 'I am feeling tired and low on energy. What should I eat and how should I rest to recover fast?' },
];

export default function ChatPrompt({ onSendMessage }: ChatPromptProps) {
  return (
    <div className="px-6 relative mt-8">
      {/* Bot Message */}
      <div className="flex gap-3 mb-6 items-end mt-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
           <span className="text-xl">🍲</span>
        </div>
        <Card className="rounded-xl rounded-bl-sm border border-gray-100 p-4 shrink tracking-wide shadow-sm flex-1">
          <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
            Start chatting below to track your meals, get nutrition tips, and stay on your goals!
          </p>
        </Card>
      </div>

      {/* Quick-start chips */}
      <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar pb-2">
         {CHIPS.map((chip) => (
           <button
             key={chip.label}
             onClick={() => onSendMessage(chip.prompt)}
             className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 active:scale-95 shrink-0 shadow-sm transition-all"
           >
             {chip.label}
           </button>
         ))}
      </div>
    </div>
  );
}
