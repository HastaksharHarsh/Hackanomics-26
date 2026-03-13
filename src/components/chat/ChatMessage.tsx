import { Card } from '@/components/ui/Card';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isBot = role === 'bot';

  return (
    <div className={`flex gap-3 mb-6 w-full ${isBot ? 'items-end' : 'justify-end items-end'} px-6 mt-4`}>
       {isBot && (
         <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200 shadow-sm z-10">
           <span className="text-sm">🍲</span>
         </div>
       )}

       <Card 
         className={`
           rounded-2xl p-4 max-w-[85%]
           ${isBot 
             ? 'bg-white rounded-bl-sm border border-gray-100 text-gray-700' 
             : 'bg-orange-500 rounded-br-sm text-white shadow-orange-500/20'
           }
         `}
       >
          <p className="text-[15px] leading-relaxed font-medium">
            {content}
          </p>
       </Card>
    </div>
  );
}
