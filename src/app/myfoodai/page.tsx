'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/dashboard/Header';
import AnalyticsCards from '@/components/dashboard/AnalyticsCards';
import ReminderCard from '@/components/dashboard/ReminderCard';
import ChatPrompt from '@/components/chat/ChatPrompt';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export default function Home() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatMode]);

  const handleSendMessage = async (content: string) => {
    if (!isChatMode) {
      setIsChatMode(true);
    }
    
    // Add User message
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((prev) => [...prev, newUserMsg]);

    // Add a temporary loading bot message
    const loadingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: loadingId, role: 'bot', content: 'Thinking...' }
    ]);

    try {
      // Send context to Grok AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: 'You are an enthusiastic Indian nutritionist bot named MyFoodAI. Help the student track their macros, remind them about hydration, and use casual, friendly English with occasional Indian slang (like "yaar", "achha"). Keep your answers concise.',
          messages: [...messages, newUserMsg]
        })
      });

      const data = await response.json();
      
      // Replace 'Thinking...' with the actual response
      setMessages((prev) => prev.map(msg => 
        msg.id === loadingId ? { ...msg, content: data.message || "I'm having trouble connecting right now." } : msg
      ));
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => prev.map(msg => 
        msg.id === loadingId ? { ...msg, content: "Sorry yaar, my servers are currently offline. Try again later!" } : msg
      ));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* 
        This is the fixed / relative header. 
        It stays on top.
      */}
      <Header 
        userName="Harsh"
        avatarUrl=""
        progress={6}
        dateStr="Fri, Mar 13 · Week 11"
        mode="maintenance mode"
      />

      <div className="flex-1 relative flex flex-col pt-4 overflow-y-auto no-scrollbar scroll-smooth">
         <AnimatePresence>
            {!isChatMode && (
              <motion.div
                key="dashboard-content"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-6 shrink-0"
              >
                <AnalyticsCards />
                
                <ReminderCard />
                
                <ChatPrompt onShowProgressClick={() => {}} />
              </motion.div>
            )}
         </AnimatePresence>

         <AnimatePresence>
            {isChatMode && (
              <motion.div
                key="chat-history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 flex flex-col"
              >
                {/* When entering chat mode, we might want to still show the initial prompt 
                    as the very first message. Let's prepend it statically if in chat mode */}
                <ChatMessage 
                  role="bot" 
                  content="Hello there! To show your progress, I need a bit more info, yaar. Are you looking for your food intake, activity, hydration, or sleep details?" 
                />
                
                {messages.map((msg) => (
                   <motion.div 
                     key={msg.id}
                     initial={{ opacity: 0, y: 20, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ duration: 0.3 }}
                   >
                     <ChatMessage role={msg.role} content={msg.content} />
                   </motion.div>
                ))}
                
                <div ref={messagesEndRef} className="h-4" />
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="shrink-0 pt-2 pb-4 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
