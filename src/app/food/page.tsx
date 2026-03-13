'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  Search, 
  UtensilsCrossed, 
  ChefHat, 
  Flame, 
  Clock, 
  IndianRupee, 
  ChevronRight,
  Info,
  ExternalLink,
  MapPin,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  X,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Curated Budget Eats for Students
const BUDGET_EATS = [
  {
    id: 1,
    name: "Classic Egg Roll",
    price: "₹45",
    calories: 320,
    protein: "12g",
    fat: "14g",
    carbs: "38g",
    tag: "Budget King",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Veg Maggi (Double Masala)",
    price: "₹30",
    calories: 280,
    protein: "6g",
    fat: "10g",
    carbs: "42g",
    tag: "Hostel Classic",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Chicken Biryani (Half)",
    price: "₹90",
    calories: 550,
    protein: "24g",
    fat: "18g",
    carbs: "72g",
    tag: "Protein Deal",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    name: "Dosa with Sambar",
    price: "₹50",
    calories: 310,
    protein: "8g",
    fat: "8g",
    carbs: "52g",
    tag: "Healthyish",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
  }
];

const NEARBY_MESSES = [
  { id: 1, name: "Block B Mess (Central)", distance: "200m", rating: "4.2", special: "Chole Bhature Today" },
  { id: 2, name: "International Hostel Mess", distance: "450m", rating: "4.5", special: "Healthy Bowls available" },
  { id: 3, name: "Block A Mess", distance: "600m", rating: "3.9", special: "Egg Curry night" }
];

export default function FoodPage() {
  const [activeTab, setActiveTab] = useState<'budget' | 'cook' | 'mess' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isMessOptedOut, setIsMessOptedOut] = useState(false);
  const [hostelName, setHostelName] = useState('Block B - Boys Hostel');

  // Fetch recipes from TheMealDB
  const fetchRecipes = async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedHostel = localStorage.getItem('hostelName');
    if (storedHostel) setHostelName(storedHostel);
  }, []);

  useEffect(() => {
    if (activeTab === 'cook' && !searchQuery) {
      fetchRecipes('Indian');
    }
  }, [activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab !== 'cook') return;
    fetchRecipes(searchQuery);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 overflow-y-auto no-scrollbar pb-24">
      {/* Header with integrated Mess Card */}
      <div className="px-6 pt-10 pb-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-b-3xl shadow-md z-10 relative mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-sm font-medium opacity-90">Eat smart, stay within budget</span>
            <h1 className="text-3xl font-black tracking-tight mt-1">Food Discovery</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center p-2 backdrop-blur-sm shadow-inner">
            <span className="text-2xl">🍽️</span>
          </div>
        </div>

        {/* Your Mess Integrated Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
               <MapPin size={16} className="text-yellow-300" />
               <span className="font-bold tracking-wide text-sm">{hostelName}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
              isMessOptedOut ? 'bg-red-500/20 text-red-100 border border-red-500/50' : 'bg-green-500/30 text-green-100 border border-green-400/50'
            }`}>
              {isMessOptedOut ? 'Declined' : 'Active'}
            </div>
          </div>
          
          {!isMessOptedOut ? (
             <div className="mb-4">
               <p className="text-[10px] font-bold text-white/70 uppercase mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-green-300" /> Today's Menu (Lunch)
               </p>
               <p className="text-sm font-medium text-white/90 leading-relaxed italic border-l-2 border-yellow-400 pl-3">
                 Dal Makhani, Jeera Rice, Paneer Butter Masala, Roti, and Gulab Jamun.
               </p>
             </div>
          ) : (
             <div className="mb-4 flex gap-3 items-center p-3 bg-red-500/20 rounded-xl border border-red-500/30">
               <AlertCircle size={20} className="text-red-200 shrink-0" />
               <p className="text-xs font-medium text-red-100 leading-relaxed text-left">
                 You have declined today's mess. Explore the budget alternatives below!
               </p>
             </div>
          )}

          <button 
            onClick={() => setIsMessOptedOut(!isMessOptedOut)}
            className={`w-full py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 ${
              isMessOptedOut 
                ? 'bg-white text-gray-800 hover:bg-gray-100' 
                : 'bg-red-500 text-white hover:bg-red-600 border border-red-400 text-shadow-sm'
            }`}
          >
            {isMessOptedOut ? (
              <><CheckCircle size={14} /> Rejoin Mess</>
            ) : (
              <><XCircle size={14} /> Decline Today's Mess</>
            )}
          </button>
        </div>
      </div>

      <div className="px-6 flex-1 flex flex-col">
        {/* The 3 Main Options Directly List */}
        <h2 className="text-sm font-black text-gray-800 uppercase tracking-wide mb-4">Explore Alternatives</h2>
        <div className="grid grid-cols-1 gap-3 mb-8">
        {[
          { id: 'mess', name: 'Nearby Mess Halls', desc: 'Eat at another block', icon: MapPin, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { id: 'budget', name: 'Outside Food', desc: 'Budget student meals', icon: UtensilsCrossed, color: 'text-orange-500', bg: 'bg-orange-50' },
          { id: 'cook', name: 'Cooking', desc: 'Quick DIY recipes', icon: ChefHat, color: 'text-green-500', bg: 'bg-green-50' }
        ].map((opt) => (
          <button 
            key={opt.id}
            onClick={() => {
              setActiveTab(activeTab === opt.id ? null : opt.id as any);
              if (opt.id === 'cook' && !recipes.length) {
                fetchRecipes('Indian');
              }
            }}
            className={`p-4 rounded-2xl bg-white border transition-all flex items-center justify-between text-left shadow-sm ${
              activeTab === opt.id ? 'border-orange-500 ring-2 ring-orange-100 shadow-md' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${opt.bg} ${opt.color}`}>
                <opt.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{opt.name}</h3>
                <p className="text-xs text-gray-400 font-medium">{opt.desc}</p>
              </div>
            </div>
            <div className={`p-2 rounded-full transition-transform ${activeTab === opt.id ? 'bg-orange-500 text-white rotate-90' : 'bg-gray-50 text-gray-400'}`}>
               <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Render Section underneath */}
      <AnimatePresence mode="wait">
        {activeTab && (
           <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, height: 0 }}
             className="pt-2"
           >
              {activeTab !== 'mess' && (
                <form onSubmit={handleSearch} className="relative mb-6">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTab === 'budget' ? "Search budget meals..." : activeTab === 'cook' ? "Search recipes..." : "Search..."}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium text-sm shadow-sm"
                  />
                </form>
              )}

              {activeTab === 'budget' && (
                <div className="grid grid-cols-1 gap-6 pb-4">
                  {BUDGET_EATS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                    <Card key={item.id} className="overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col group">
                      <div className="h-40 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-[10px] font-black uppercase tracking-wider text-orange-600">
                          {item.tag}
                        </div>
                        <div className="absolute bottom-3 right-3 px-3 py-1 bg-orange-500 shadow-lg rounded-full text-xs font-black text-white">
                          {item.price}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">{item.name}</h3>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          <div className="text-center p-2 bg-orange-50 rounded-xl">
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Cal</p>
                            <p className="text-xs font-black text-gray-800">{item.calories}</p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded-xl">
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Pro</p>
                            <p className="text-xs font-black text-gray-800">{item.protein}</p>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded-xl">
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Fat</p>
                            <p className="text-xs font-black text-gray-800">{item.fat}</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded-xl">
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Carb</p>
                            <p className="text-xs font-black text-gray-800">{item.carbs}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'mess' && (
                <div className="flex flex-col gap-4 pb-4">
                  {NEARBY_MESSES.map((mess) => (
                    <Card key={mess.id} className="p-5 bg-white border border-gray-100 shadow-sm flex flex-col gap-3 group relative overflow-hidden">
                      <div className="flex justify-between items-start z-10">
                        <div>
                          <h3 className="font-black text-gray-800 text-lg tracking-tight">{mess.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold mt-1">
                            <MapPin size={12} className="text-indigo-500" /> {mess.distance} away
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            ⭐ {mess.rating}
                          </div>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                          <ShieldCheck size={20} />
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mt-2 z-10">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Live Update</p>
                        <p className="text-xs font-bold text-gray-700 italic">" {mess.special} "</p>
                      </div>
                      <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest mt-2 hover:bg-orange-600 transition-colors">
                        Navigate to Mess
                      </button>
                      <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform">
                        <MapPin size={100} />
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'cook' && (
                <div className="flex flex-col gap-6 pb-4">
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex gap-4 items-start mb-2 text-sm text-green-700 leading-relaxed font-medium shadow-sm italic">
                    <span className="p-2 bg-green-500 text-white rounded-lg"><ChefHat size={18} /></span>
                    Searching for budget-friendly, high-nutrition recipes for students using TheMealDB.
                  </div>

                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                      <p className="text-sm font-bold text-gray-400">Fetching recipes...</p>
                    </div>
                  ) : recipes.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {recipes.map((meal) => (
                        <Card key={meal.idMeal} className="p-4 bg-white border border-gray-100 shadow-sm flex items-center gap-4 hover:border-green-200 transition-all group">
                          <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover group-hover:rotate-6 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 truncate">{meal.strMeal}</h3>
                            <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                              <span className="flex items-center gap-1 text-orange-500"><IndianRupee size={10} /> Low Cost</span>
                              <span className="flex items-center gap-1"><Clock size={10} /> 20-30m</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedRecipe(meal)}
                            className="p-2 bg-gray-50 text-gray-300 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-gray-400 font-medium tracking-tight">No recipes found for your search.</p>
                    </div>
                  )}
                </div>
              )}
           </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Recipe Modal Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] p-6 flex items-center justify-center overflow-y-auto no-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] w-full max-w-md max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl relative"
          >
            <div className="h-64 relative">
              <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 pr-6">
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-[10px] font-black uppercase mb-2 inline-block shadow-lg">Instructional</span>
                <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{selectedRecipe.strMeal}</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xs font-black uppercase text-green-500 tracking-widest mb-3 flex items-center gap-2">
                    <Flame size={14} /> Quick Prep Info
                  </h4>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Serves</p>
                      <p className="text-sm font-black text-gray-800">1-2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Time</p>
                      <p className="text-sm font-black text-gray-800">~25m</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Cost</p>
                      <p className="text-sm font-black text-gray-800">Low</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3">Cooking Instructions</h4>
                  <div className="bg-white border border-gray-50 p-5 rounded-2xl text-sm leading-relaxed text-gray-600 shadow-sm italic">
                    {selectedRecipe.strInstructions}
                  </div>
                </div>

                <a 
                  href={selectedRecipe.strYoutube || "#"} 
                  target="_blank"
                  className="w-full py-4 rounded-xl bg-orange-600 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-orange-600/20 active:scale-95 transition-all"
                >
                  <ExternalLink size={16} /> Watch Tutorial on YouTube
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

