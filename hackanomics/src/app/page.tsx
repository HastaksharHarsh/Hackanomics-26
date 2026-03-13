'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Utensils, Building } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex flex-col h-full bg-gray-50/50 justify-center px-6">
      <div className="text-center mb-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-primary-dark rounded-full mb-6 shadow-lg text-4xl"
        >
          🍛
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-black tracking-tight mb-2"
        >
          Welcome to <br />
          <span className="text-orange-500">MyFood</span><span className="text-indigo-900">AI</span> Ecosystem
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-gray-500 font-medium"
        >
          Choose your gateway to continue
        </motion.p>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/login?type=student" className="block">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-6 bg-white border-2 border-orange-100 shadow-sm hover:border-orange-400 transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Utensils size={24} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-gray-800">MyFoodAI</h2>
                <p className="text-xs text-gray-500">For Students - Track nutrition</p>
              </div>
              <div className="ml-auto text-orange-400">→</div>
            </Card>
          </motion.div>
        </Link>
        
        <Link href="/login?type=admin" className="block">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-6 bg-white border-2 border-indigo-100 shadow-sm hover:border-indigo-400 transition-colors flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Building size={24} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-gray-800">SmartMess</h2>
                <p className="text-xs text-gray-500">For PG / Hostels - Management</p>
              </div>
              <div className="ml-auto text-indigo-400">→</div>
            </Card>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
