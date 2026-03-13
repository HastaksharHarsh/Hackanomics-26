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

const WELCOME_MSG = "Hey yaar! 👋 I'm MyFoodAI, your nutrition buddy. What did you eat today, or how can I help you track your health goals?";

// --- Helpers ---
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDateStr(): string {
  const now = new Date();
  return now.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).replace(',', '') + ' · Week ' + getAcademicWeek(now);
}

/** Simple academic week counter from Jan 1 of current year */
function getAcademicWeek(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - start.getTime();
  return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
}

export default function Home() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('You');
  const [userGoal, setUserGoal] = useState('');
  const [currentCondition, setCurrentCondition] = useState('');

  // Load user info from localStorage
  useEffect(() => {
    const name = localStorage.getItem('userName') || 'You';
    setUserName(name);
    const condition = localStorage.getItem('currentCondition') || '';
    setCurrentCondition(condition);
    try {
      const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      setUserGoal(profile.goal || '');
    } catch {}
  }, []);

  // Always seed a fresh greeting on mount — clears any in-memory state from previous nav
  useEffect(() => {
    setMessages([
      { id: 'welcome', role: 'bot', content: WELCOME_MSG }
    ]);
    setIsChatMode(false);
  }, []);

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: 'You are an enthusiastic Indian nutritionist bot named MyFoodAI. Help the student track their macros, remind them about hydration, and use casual, friendly English with occasional Indian slang (like "yaar", "achha"). Keep your answers concise.',
          messages: [...messages, newUserMsg],
          currentCondition,
        })
      });

      const data = await response.json();
      
      // Handle condition update from AI
      if (data.conditionUpdate) {
        const { condition, status } = data.conditionUpdate;
        if (status === 'cleared') {
          localStorage.removeItem('currentCondition');
          setCurrentCondition('');
        } else if (condition) {
          localStorage.setItem('currentCondition', condition);
          setCurrentCondition(condition);
        }
      }
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
      <Header 
        userName={userName}
        avatarUrl=""
        progress={6}
        dateStr={getDateStr()}
        mode={userGoal || 'Health Tracking'}
        greeting={getGreeting()}
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
                
                <ChatPrompt onSendMessage={handleSendMessage} />
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
