import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-[1.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-4 ${onClick ? 'cursor-pointer hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
