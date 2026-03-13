'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  LogOut, 
  Settings, 
  Bell, 
  CircleUser, 
  Users, 
  Home, 
  Edit3, 
  Save, 
  X,
  User,
  Scale,
  Target,
  Utensils,
  MapPin,
  ChevronRight,
  Search,
  MessageSquare,
  Clock,
  Lock,
  Thermometer,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';

const HOSTELS = [
  "Block A - Boys Hostel",
  "Block B - Boys Hostel",
  "Block C - Boys Hostel",
  "Block D - Girls Hostel",
  "Block E - Girls Hostel",
  "International Students Hostel",
  "PG Hostel"
];

export default function Profile() {
  const router = useRouter();
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile State
  const [profileData, setProfileData] = useState<any>({
    name: '',
    hostel: '',
    weight: '',
    height: '',
    goal: '',
    mealType: '',
    canCook: 'no'
  });

  const [hostelSearch, setHostelSearch] = useState('');
  const [showHostelDropdown, setShowHostelDropdown] = useState(false);
  const [currentCondition, setCurrentCondition] = useState('');

  useEffect(() => {
    const type = localStorage.getItem('userType');
    if (!type) {
      router.push('/');
      return;
    }
    setUserType(type as 'student' | 'admin');
    
    const savedName = localStorage.getItem('userName') || (type === 'student' ? 'Student' : 'Admin');
    const savedHostel = localStorage.getItem('hostelName') || 'Unknown Hostel';
    
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData({
        ...parsed,
        name: savedName,
        hostel: savedHostel
      });
    } else {
      setProfileData({
        name: savedName,
        hostel: savedHostel,
        weight: '',
        height: '',
        goal: 'Maintenance',
        mealType: 'Veg',
        canCook: 'no'
      });
    }

    // Load current health condition
    const condition = localStorage.getItem('currentCondition') || '';
    setCurrentCondition(condition);
  }, [router]);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      localStorage.setItem('userName', profileData.name);
      localStorage.setItem('hostelName', profileData.hostel);
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (!userType) return null;

  const isStudent = userType === 'student';
  const themeColorExt = isStudent ? 'text-orange-500' : 'text-indigo-600';
  const themeBgColor = isStudent ? 'bg-orange-50' : 'bg-indigo-50';

  const filteredHostels = HOSTELS.filter(h => 
    h.toLowerCase().includes(hostelSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-50/50 px-6 py-8 overflow-y-auto no-scrollbar pb-24">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-10"
      >
        <div className={`w-28 h-28 rounded-full ${themeBgColor} ${themeColorExt} flex items-center justify-center mb-4 border-4 border-white shadow-xl relative`}>
           <CircleUser size={56} strokeWidth={1.2} />
           <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
        </div>
        
        {isEditing ? (
          <div className="w-full max-w-[200px]">
            <input 
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="w-full text-center text-2xl font-black text-gray-800 bg-white border border-gray-100 rounded-xl px-2 py-1 outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        ) : (
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">{profileData.name}</h1>
        )}
        
        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">
          <MapPin size={12} /> {profileData.hostel}
        </div>
        
        <div className="flex gap-2 mt-4">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isStudent ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-700'}`}>
             {isStudent ? 'Student Account' : 'Admin Account'}
          </span>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isLoading}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${
              isEditing 
                ? 'bg-gray-800 text-white shadow-gray-800/10' 
                : 'bg-white text-gray-600 border border-gray-100 shadow-sm'
            }`}
          >
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isEditing ? (
              <><Save size={12} /> Save Changes</>
            ) : (
              <><Edit3 size={12} /> Edit Profile</>
            )}
          </button>
          {isEditing && (
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* CURRENT HEALTH CONDITION */}
        {isStudent && (
          <AnimatePresence>
            {currentCondition ? (
              <motion.div
                key="condition-active"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
                  <HeartPulse size={14} className="text-red-500" /> Current Health Status
                </h2>
                <div className="rounded-3xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                    <Thermometer size={22} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-black text-gray-800 text-sm">{currentCondition}</h3>
                      <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Active</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Your diet & AI suggestions are personalised for this condition. Tell the AI when you have recovered!</p>
                    <button
                      onClick={() => {
                        localStorage.removeItem('currentCondition');
                        setCurrentCondition('');
                      }}
                      className="flex items-center gap-2 bg-green-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-md shadow-green-500/20 hover:bg-green-600 active:scale-95 transition-all"
                    >
                      <CheckCircle2 size={14} /> Mark as Recovered
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="condition-clear"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
                  <HeartPulse size={14} className="text-green-500" /> Current Health Status
                </h2>
                <div className="rounded-3xl bg-green-50 border border-green-200 p-4 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-green-800">All good, yaar! 💪</p>
                    <p className="text-[10px] text-green-600">No active conditions. Tell the AI if you feel unwell anytime.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* PERSONAL STATS SECTION */}
        {isStudent && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
              <Scale size={14} className="text-orange-500" /> AI Health Metrics
            </h2>
            <Card className="bg-white border border-gray-100 shadow-sm p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-100/50">
                  <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Weight</p>
                  {isEditing ? (
                    <input 
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                      className="w-full bg-transparent text-sm font-black text-gray-800 outline-none"
                    />
                  ) : (
                    <p className="text-sm font-black text-gray-800">{profileData.weight || '--'} <span className="text-[10px] opacity-40">kg</span></p>
                  )}
                </div>
                <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-100/50">
                  <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Height</p>
                  {isEditing ? (
                    <input 
                      type="number"
                      value={profileData.height}
                      onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                      className="w-full bg-transparent text-sm font-black text-gray-800 outline-none"
                    />
                  ) : (
                    <p className="text-sm font-black text-gray-800">{profileData.height || '--'} <span className="text-[10px] opacity-40">cm</span></p>
                  )}
                </div>
                <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-100/50">
                  <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Goal</p>
                  {isEditing ? (
                    <select 
                      value={profileData.goal}
                      onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
                      className="w-full bg-transparent text-xs font-black text-orange-600 outline-none appearance-none"
                    >
                      <option>Weight Loss</option>
                      <option>Muscle Gain</option>
                      <option>Maintenance</option>
                    </select>
                  ) : (
                    <p className="text-[11px] font-black text-orange-600 truncate uppercase mt-0.5">{profileData.goal || 'N/A'}</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* LIFESTYLE & DIET SECTION */}
        {isStudent && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
              <Utensils size={14} className="text-orange-500" /> Lifestyle & Diet
            </h2>
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-5 flex items-center gap-4 border-b border-gray-50">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <span className="text-xl italic">🥗</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Dietary Preference</h3>
                    {isEditing ? (
                      <div className="flex gap-2 mt-2">
                        {['Veg', 'Non-Veg', 'Vegan'].map(v => (
                          <button 
                            key={v}
                            onClick={() => setProfileData({...profileData, mealType: v})}
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${
                              profileData.mealType === v ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-50 text-gray-400'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">{profileData.mealType || 'Vegetarian'}</p>
                    )}
                  </div>
               </div>
               <div className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <span className="text-xl italic">👨‍🍳</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Can You Cook?</h3>
                    {isEditing ? (
                      <div className="flex gap-2 mt-2">
                        {['yes', 'no'].map(v => (
                          <button 
                            key={v}
                            onClick={() => setProfileData({...profileData, canCook: v})}
                            className={`px-4 py-1 rounded-full text-[10px] font-black uppercase transition-all ${
                              profileData.canCook === v ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-50 text-gray-400'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">{profileData.canCook === 'yes' ? 'Can prep basic meals' : 'Prefers mess/ordering'}</p>
                    )}
                  </div>
               </div>
            </Card>
          </motion.div>
        )}

        {/* HOSTEL CONFIG SECTION */}
        {isStudent && isEditing && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
              <Home size={14} className="text-orange-500" /> Location Settings
            </h2>
            <div className="relative">
              <div className="group relative flex items-center">
                <Search className="absolute left-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={16} />
                <input 
                  type="text"
                  autoComplete="off"
                  onFocus={() => setShowHostelDropdown(true)}
                  value={hostelSearch || profileData.hostel}
                  onChange={(e) => {
                    setHostelSearch(e.target.value);
                    setProfileData({...profileData, hostel: ''});
                    setShowHostelDropdown(true);
                  }}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-100 bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-bold shadow-sm"
                  placeholder="Search hostel..."
                />
              </div>
              
              <AnimatePresence>
                {showHostelDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 max-h-48 overflow-y-auto no-scrollbar"
                  >
                    {filteredHostels.map(h => (
                      <button
                        key={h}
                        onClick={() => {
                          setProfileData({...profileData, hostel: h});
                          setShowHostelDropdown(false);
                          setHostelSearch('');
                        }}
                        className="w-full text-left px-5 py-4 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between group"
                      >
                        {h}
                        <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-300" size={14} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* PAST CONVERSATIONS SECTION */}
        {isStudent && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
              <MessageSquare size={14} className="text-orange-500" /> Past Conversations
            </h2>
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
              {/* Dummy conversation items */}
              {[
                { label: 'Protein intake discussion', time: 'Yesterday, 9:41 PM', emoji: '🥩' },
                { label: 'Mess food alternatives', time: 'Mar 12, 6:15 PM', emoji: '🍱' },
                { label: 'Weekly nutrition summary', time: 'Mar 11, 11:00 AM', emoji: '📊' },
              ].map((conv, i) => (
                <button
                  key={i}
                  onClick={() => alert('Conversation history is coming soon in a future update!')}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-orange-50/50 transition-colors text-left ${
                    i < 2 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 text-lg">
                    {conv.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{conv.label}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {conv.time}
                    </p>
                  </div>
                  <div className="text-gray-200">
                    <Lock size={14} />
                  </div>
                </button>
              ))}
              <div className="px-4 py-3 bg-orange-50/60 border-t border-orange-100/50 flex items-center justify-center gap-2">
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Full History Coming Soon</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ACCOUNT & SECURITY SECTION */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-1 flex items-center gap-2">
              <Settings size={14} className="text-gray-400" /> Account & Security
            </h2>
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                {!isStudent && (
                  <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left border-b border-indigo-50">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Users size={18} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm">Student Management</h3>
                      <p className="text-xs text-gray-500">Access resident dashboard</p>
                    </div>
                    <div className="text-gray-300">→</div>
                  </button>
                )}
               <button className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                    <p className="text-xs text-gray-500">Smart meal alerts are ON</p>
                  </div>
                  <div className="text-gray-300">→</div>
               </button>
               <button className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                    <Settings size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">Privacy & Security</h3>
                    <p className="text-xs text-gray-500">Manage password & access</p>
                  </div>
                  <div className="text-gray-300">→</div>
               </button>
               <button onClick={handleLogout} className="w-full flex items-center gap-4 p-5 hover:bg-red-50 transition-colors text-left group">
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

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
