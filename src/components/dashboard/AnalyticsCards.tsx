import { Card } from '@/components/ui/Card';

const mockData = [
  { id: 'carbs', title: 'CARBS', value: 210, total: 2975, unit: 'g', percent: 7, color: 'text-yellow-500', bg: 'bg-yellow-50', icon: '🌾' },
  { id: 'fat', title: 'FAT', value: 26, total: 539, unit: 'g', percent: 5, color: 'text-purple-500', bg: 'bg-purple-50', icon: '🥜' },
  { id: 'activity', title: 'ACTIVITY', value: 0, total: null, unit: 'kcal · rest', percent: 0, color: 'text-blue-500', bg: 'bg-red-50', icon: '🏃' },
];

export default function AnalyticsCards() {
  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-3 px-6">
        <h2 className="text-sm font-bold text-orange-500 tracking-wider">THIS WEEK</h2>
        <div className="h-[1px] flex-1 bg-orange-200 ml-4"></div>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-6 pb-4 pt-1 no-scrollbar snap-x">
        {mockData.map((item) => (
          <Card key={item.id} className={`min-w-[140px] snap-start flex-shrink-0 relative overflow-hidden ${item.bg} border border-white`}>
            {/* Top row */}
            <div className="flex justify-between items-center mb-2 relative z-10">
              <div className="flex items-center gap-1">
                 <span className="text-lg">{item.icon}</span>
                 <span className={`text-[10px] font-bold ${item.color}`}>{item.title}</span>
              </div>
              <span className={`text-[10px] font-bold ${item.color}`}>{item.percent}%</span>
            </div>
            
            {/* Value row */}
            <div className="flex items-baseline gap-1 mt-4 relative z-10">
              <span className={`text-2xl font-black ${item.color}`}>{item.value}</span>
              {item.total && (
                <span className="text-xs text-gray-500 font-medium">/ {item.total} {item.unit}</span>
              )}
              {!item.total && (
                <span className="text-xs text-gray-500 font-medium">{item.unit}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {/* Scroll indicator - decorative */}
      <div className="px-6 flex justify-center items-center mt-[-4px]">
         <div className="w-[40%] h-1.5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
