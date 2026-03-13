'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/dashboard/Header';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import SmartMessAnalytics from '@/components/smartmess/SmartMessAnalytics';
import MenuManager from '@/components/smartmess/MenuManager';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export default function SmartMess() {
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
          systemPrompt: 'You are SmartMess AI, a sophisticated data analyst bot for a Hostel Manager. You predict food quantities, reduce wastage, and suggest menu edits based on attendance. Use professional, analytical tone but stay helpful and encouraging. Keep your answers concise and actionable.',
          messages: [...messages, newUserMsg]
        })
      });

      const data = await response.json();
      
      // Replace 'Thinking...' with the actual response
      setMessages((prev) => prev.map(msg => 
        msg.id === loadingId ? { ...msg, content: data.message || "I'm having trouble connecting to the analytics engine right now." } : msg
      ));
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => prev.map(msg => 
        msg.id === loadingId ? { ...msg, content: "Sorry, my servers are currently offline. Please check your connection or API key." } : msg
      ));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <Header 
        userName="Hostel Manager"
        avatarUrl=""
        progress={100}
        dateStr="SmartMess Analytics"
        mode="Management Mode"
      />

      <div className="flex-1 relative flex flex-col pt-4 overflow-y-auto no-scrollbar scroll-smooth">
         <AnimatePresence>
            {!isChatMode && (
              <motion.div
                key="dashboard-content"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-2 shrink-0 px-6 pb-6"
              >
                <SmartMessAnalytics />
                <MenuManager />
                
                <div className="mt-6 flex items-center gap-2">
                   <div className="h-px bg-gray-200 flex-1"></div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ask SmartMess AI</span>
                   <div className="h-px bg-gray-200 flex-1"></div>
                </div>
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
                <ChatMessage 
                  role="bot" 
                  content="Hello System Admin. How can I assist you with predictions, menu planning, or waste reduction today?" 
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
