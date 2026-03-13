'use client';

import { Card } from '@/components/ui/Card';
import { Users, Droplets, Scale, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SmartMessAnalytics() {
  return (
    <div className="flex flex-col gap-4">
      {/* Primary Analytics row */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="p-4 bg-white border border-indigo-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-2">
              <Users size={20} />
            </div>
            <h3 className="text-2xl font-black text-gray-800">450</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Students Tonight</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="p-4 bg-white border border-green-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-2">
              <TrendingDown size={20} />
            </div>
            <h3 className="text-2xl font-black text-gray-800">15<span className="text-sm">kg</span></h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Wastage Reduced</p>
          </Card>
        </motion.div>
      </div>

      {/* Prediction / Quantity Card */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Scale size={16} className="text-white" />
            </div>
            <h2 className="text-sm font-bold tracking-wide uppercase">AI Food Prediction</h2>
          </div>
          
          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex justify-between items-end border-b border-white/20 pb-2">
              <span className="text-white/80 text-sm font-medium">Roti (Wheat)</span>
              <span className="text-xl font-black">900 <span className="text-xs font-normal opacity-80">pcs</span></span>
            </div>
            <div className="flex justify-between items-end border-b border-white/20 pb-2">
              <span className="text-white/80 text-sm font-medium">Rice</span>
              <span className="text-xl font-black">45 <span className="text-xs font-normal opacity-80">kg</span></span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-white/80 text-sm font-medium">Dal Makhani</span>
              <span className="text-xl font-black">35 <span className="text-xs font-normal opacity-80">ltr</span></span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-white/20 flex items-start gap-2 text-xs text-indigo-100 font-medium leading-relaxed">
            <Droplets size={14} className="shrink-0 mt-0.5 text-yellow-300" />
            <p>Rain is forecasted tonight. Expect ~5% less attendance than usual. Quantities adjusted.</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
