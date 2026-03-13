'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Dumbbell, Flame, Timer, TrendingUp, Calendar, Zap, Watch, Footprints } from 'lucide-react';

export default function ActivityPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const n = localStorage.getItem('userName') || '';
    setUserName(n);
  }, []);

  const activities = [
    { name: 'Morning Walk', status: 'Completed', time: '7:30 AM', duration: '30 min', calories: 120, icon: '🚶' },
    { name: 'Gym Session', status: 'In Progress', time: '5:00 PM', duration: '45 min', calories: 350, icon: '💪' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50/50 px-6 py-8 overflow-y-auto no-scrollbar pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Activity Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Track your fitness journey{userName ? `, ${userName}` : ''}!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-5 bg-gradient-to-br from-orange-400 to-orange-600 text-white border-0 shadow-lg shadow-orange-500/25">
          <Flame size={24} className="mb-3 opacity-80" />
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Calories Burned</p>
          <h2 className="text-2xl font-black mt-1">1,240 <span className="text-sm opacity-60">kcal</span></h2>
        </Card>
        <Card className="p-5 bg-white border border-gray-100 shadow-sm">
          <Timer size={24} className="mb-3 text-orange-500" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Active Time</p>
          <h2 className="text-2xl font-black mt-1 text-gray-800">45 <span className="text-sm text-gray-400 font-bold">min</span></h2>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Recent Activities</h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:underline">View All</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {activities.map((act, i) => (
            <Card key={i} className="p-4 bg-white border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner italic">
                {act.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">{act.name}</h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold mt-1">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {act.time}</span>
                  <span className="flex items-center gap-1"><Timer size={10} /> {act.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-orange-600">-{act.calories} kcal</p>
                <p className="text-[9px] font-bold text-gray-300 uppercase mt-0.5">{act.status}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Future Version Update — improved mobile layout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-sm p-6 relative overflow-hidden mb-4"
      >
        {/* BG decoration */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.07]">
          <TrendingUp size={130} className="text-orange-600" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🚀</span>
            <h3 className="text-orange-800 font-black text-lg leading-tight">Future Version</h3>
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-orange-400 mb-4">Coming in next release</p>

          <div className="flex flex-col gap-3">
            {[
              { icon: Watch, label: 'Wearable Integration', desc: 'Sync with your smartwatch' },
              { icon: Footprints, label: 'Real-time Step Counter', desc: 'Live tracking via sensors' },
              { icon: Zap, label: 'Advanced Fitness AI', desc: 'Personalized workout plans' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 bg-white/60 rounded-2xl px-4 py-3 border border-orange-100">
                <div className="w-8 h-8 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-orange-800">{label}</p>
                  <p className="text-[10px] text-orange-500 font-medium">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
