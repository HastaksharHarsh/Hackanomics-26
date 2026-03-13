'use client';

import { MessageCircle, Utensils, Dumbbell, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Chat', href: '/', icon: MessageCircle },
    { name: 'Food', href: '/food', icon: Utensils },
    { name: 'Activity', href: '/activity', icon: Dumbbell },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center h-20 px-2 pb-2 z-50 rounded-b-[2rem]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-current' : ''}`} />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
