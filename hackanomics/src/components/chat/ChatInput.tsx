'use client';

import { Camera, Mic, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="w-full px-4 mb-2 z-20 relative bg-transparent">
       <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full border-2 border-gray-100 px-2 py-2 pr-2 shadow-sm focus-within:border-orange-200 focus-within:shadow-md transition-all">
          <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
             <Camera size={22} />
          </button>
          
          <input 
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What did you eat today?"
            className="flex-1 bg-transparent px-2 py-2 outline-none text-[15px] font-medium placeholder-gray-400 text-gray-800 break-words"
          />

          {!message.trim() && (
             <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                <Mic size={22} />
             </button>
          )}

          <button 
             type="submit" 
             disabled={!message.trim()}
             className={`ml-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
               message.trim() ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-100 text-orange-200'
             }`}
          >
             <Send size={18} className="ml-[-2px] mt-[1px]" />
          </button>
       </form>
    </div>
  );
}
