import Image from 'next/image';

interface HeaderProps {
  userName: string;
  avatarUrl: string;
  progress: number;
  dateStr: string;
  mode: string;
}

export default function Header({ userName, avatarUrl, progress, dateStr, mode }: HeaderProps) {
  return (
    <header className="px-6 py-6 bg-gradient-to-br from-orange-400 to-primary-dark text-white rounded-b-3xl shadow-md z-10 relative">
      <div className="flex justify-between items-start mb-4">
        {/* User Info */}
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center p-2 backdrop-blur-sm">
            {/* The bowl avatar can be a placeholder emoji since we don't have the exact asset */}
            <span className="text-3xl">🍲</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium opacity-90">Good morning, {userName}</span>
            <h1 className="text-2xl font-black tracking-tight">MyFood<span className="text-yellow-300 font-extrabold tracking-normal">AI</span></h1>
          </div>
        </div>

        {/* Progress Circular & Profile Icon container */}
        <div className="flex gap-3 items-center">
          {/* Progress Circular indicator details */}
          <div className="flex flex-col items-center">
            {/* Minimal SVG Circle for progress */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/20" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125" strokeDashoffset={125 - (125 * progress) / 100} className="text-yellow-400" strokeLinecap="round" />
              </svg>
              <div className="absolute font-bold text-xs">{progress}%</div>
            </div>
            <span className="text-[10px] font-medium mt-1 uppercase tracking-wider opacity-80">Just started</span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-lg font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs font-medium opacity-80 pt-2 border-t border-white/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span>{dateStr}</span>
        </div>
        <div>{mode}</div>
      </div>
    </header>
  );
}
