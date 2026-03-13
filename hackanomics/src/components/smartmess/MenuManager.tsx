'use client';

import { Card } from '@/components/ui/Card';
import { Calendar, Edit3, Upload, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MenuManager() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold tracking-wider text-gray-700 uppercase flex items-center gap-2">
          <Calendar size={16} className="text-orange-500" />
          Menu Management
        </h2>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <button className="w-full">
          <Card className="p-4 bg-orange-50 border border-orange-100 shadow-sm flex items-center gap-4 hover:border-orange-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Upload size={20} />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-gray-800 text-sm">Upload Weekly Timetable</h3>
              <p className="text-xs text-gray-500 mt-0.5">Import Excel or CSV format</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </Card>
        </button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <button className="w-full">
          <Card className="p-0 bg-white border border-gray-100 shadow-sm hover:border-indigo-200 transition-colors overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <h3 className="font-bold text-gray-800 text-sm">Tonight's Menu</h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                <Edit3 size={12} />
                Edit Menu
              </div>
            </div>
            <div className="p-4 bg-gray-50/50">
              <ul className="text-sm font-medium text-gray-600 flex flex-col gap-2 text-left">
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Note: Roti (Wheat)
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Rice
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Dal Makhani
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Mixed Veg
                </li>
              </ul>
            </div>
          </Card>
        </button>
      </motion.div>
    </div>
  );
}
