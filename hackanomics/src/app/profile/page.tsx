'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { LogOut, Settings, Bell, CircleUser, Users, Home } from 'lucide-react';

export default function Profile() {
  const router = useRouter();
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null);
  const [userName, setUserName] = useState('');
  const [hostelName, setHostelName] = useState('');

  useEffect(() => {
    // Read auth state
    const type = localStorage.getItem('userType');
    if (!type) {
      // Not logged in -> redirect to root
      router.push('/');
      return;
    }
    setUserType(type as 'student' | 'admin');
    setUserName(localStorage.getItem('userName') || (type === 'student' ? 'Student' : 'Admin'));
    setHostelName(localStorage.getItem('hostelName') || 'Unknown Hostel');
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (!userType) return null; // or loading spinner

  const isStudent = userType === 'student';
  const themeColor = isStudent ? 'orange' : 'indigo';
  const themeColorExt = isStudent ? 'orange-500' : 'indigo-600';
  const themeBgColor = isStudent ? 'bg-orange-50' : 'bg-indigo-50';

  return (
    <div className="flex flex-col h-full bg-gray-50/50 px-6 py-8 overflow-y-auto no-scrollbar pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-8"
      >
        <div className={`w-24 h-24 rounded-full ${themeBgColor} text-${themeColorExt} flex items-center justify-center mb-4 border-4 border-white shadow-md relative`}>
           <CircleUser size={48} strokeWidth={1.5} />
           {/* Active dot */}
           <div className="absolute bottom-1 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h1 className="text-2xl font-black text-gray-800">{userName}</h1>
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 mt-1">
          <Home size={14} /> {hostelName}
        </div>
        
        <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isStudent ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-700'}`}>
           {isStudent ? 'Student Account' : 'Admin Account'}
        </span>
      </motion.div>

      <div className="flex flex-col gap-6">
        {/* Dynamic Content based on User Type */}
        {!isStudent && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-1">Management</h2>
            <Card className="bg-white border border-indigo-100 shadow-sm overflow-hidden">
               <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left border-b border-indigo-50">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Student List</h3>
                    <p className="text-xs text-gray-500">Manage all 450 residents</p>
                  </div>
                  <div className="text-gray-300">→</div>
               </button>
               <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Home size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Hostel Configuration</h3>
                    <p className="text-xs text-gray-500">Edit mess timings & rules</p>
                  </div>
                  <div className="text-gray-300">→</div>
               </button>
            </Card>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-1">Settings & Preferences</h2>
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
               {isStudent && (
                 <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left border-b border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <span className="text-lg">🥗</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm">Dietary Preferences</h3>
                      <p className="text-xs text-gray-500">Vegetarian, No Peanuts</p>
                    </div>
                    <div className="text-gray-300">→</div>
                 </button>
               )}
               <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                    <p className="text-xs text-gray-500">Meal reminders are ON</p>
                  </div>
                  <div className="text-gray-300">→</div>
               </button>
               <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                    <Settings size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Account Settings</h3>
                    <p className="text-xs text-gray-500">Password, Email, Security</p>
                  </div>
                  <div className="text-gray-300">→</div>
               </button>
               <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-left group">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 group-hover:bg-red-100 transition-colors flex items-center justify-center shrink-0">
                    <LogOut size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-600 text-sm">Sign Out</h3>
                  </div>
               </button>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}
