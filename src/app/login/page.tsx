'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const type = typeParam === 'admin' ? 'admin' : 'student';

  const isStudent = type === 'student';
  const themeColor = isStudent ? 'orange' : 'indigo';
  const title = isStudent ? 'Student Login' : 'Hostel Admin Login';
  const subtitle = isStudent ? 'Welcome back to MyFoodAI' : 'Welcome back to SmartMess';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      // Save user session in localStorage
      localStorage.setItem('userType', type);
      localStorage.setItem('userName', username || (isStudent ? 'Harsh' : 'Admin'));
      localStorage.setItem('hostelName', isStudent ? 'Block B Hostel' : 'Block B Hostel'); // Example specific values
      
      // Route appropriately
      if (isStudent) {
        router.push('/myfoodai');
      } else {
        router.push('/smartmess');
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 justify-center px-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-${themeColor}-100 text-${themeColor}-600 rounded-full mb-4 shadow-sm text-3xl`}>
          {isStudent ? '🍛' : '🏢'}
        </div>
        <h1 className="text-2xl font-black tracking-tight text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 bg-white shadow-sm border border-gray-100">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email / Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500/50 focus:border-${themeColor}-500 transition-all text-sm`}
                placeholder={isStudent ? "student@hostel.com" : "admin@smartmess.com"}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500/50 focus:border-${themeColor}-500 transition-all text-sm`}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`mt-4 w-full py-3 rounded-xl font-bold text-white shadow-md transition-all active:scale-95 ${
                isStudent 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-orange-500/30' 
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:shadow-indigo-500/30'
              } ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </Card>
        
        <div className="text-center mt-6">
           {isStudent && (
             <p className="text-xs text-gray-400 mb-4">
               Don't have an account? 
               <button onClick={() => router.push('/signup?type=student')} className="ml-1.5 text-orange-500 font-bold hover:underline">Sign Up</button>
             </p>
           )}
           <button onClick={() => router.push('/')} className="text-sm font-medium text-gray-400 hover:text-gray-600">
             ← Back to Gateway
           </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
