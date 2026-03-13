'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Scale, 
  Target, 
  Utensils, 
  Home, 
  CheckCircle2,
  ChevronRight,
  Search
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

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'student';
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    mealType: '',
    canCook: 'no',
    mealsPerDay: '3',
    hostel: ''
  });

  const [hostelSearch, setHostelSearch] = useState('');
  const [showHostelDropdown, setShowHostelDropdown] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userType', 'student');
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('hostelName', formData.hostel);
      localStorage.setItem('userProfile', JSON.stringify(formData));
      router.push('/myfoodai');
    }, 1500);
  };

  const filteredHostels = HOSTELS.filter(h => 
    h.toLowerCase().includes(hostelSearch.toLowerCase())
  );

  const stepVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 justify-center px-6 py-12">
      {/* Header */}
      <div className="max-w-md mx-auto w-full mb-8">
        <button 
          onClick={() => step === 1 ? router.push('/login?type=student') : prevStep()}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft size={16} /> 
          {step === 1 ? 'Back to Login' : 'Previous Step'}
        </button>
        
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-800">Create Profile</h1>
            <p className="text-gray-500 text-sm">Step {step} of 4</p>
          </div>
          <div className="flex gap-1.5 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-orange-500' : 'w-2 bg-gray-200'
                } ${i < step ? 'bg-orange-200' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Card className="max-w-md mx-auto w-full p-8 bg-white shadow-xl shadow-orange-500/5 border border-white">
        <form onSubmit={handleSignup} className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5"
              >
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User className="text-orange-500" size={20} /> Account Details
                  </h2>
                  <p className="text-gray-400 text-xs">Let's start with your account info</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Full Name</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                      placeholder="name@university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Create Password</label>
                    <input 
                      type="password" required
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                      placeholder="At least 8 characters"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5"
              >
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Scale className="text-orange-500" size={20} /> Personal Stats
                  </h2>
                  <p className="text-gray-400 text-xs">Essential data for AI calculations</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Gender Identity</label>
                    <div className="flex gap-2">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => updateFormData('gender', g)}
                          className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                            formData.gender === g 
                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                            : 'bg-gray-50 border-gray-100 text-gray-500'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Age (Years)</label>
                    <input 
                      type="number" required
                      value={formData.age}
                      onChange={(e) => updateFormData('age', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                      placeholder="21"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Weight (KG)</label>
                    <input 
                      type="number" required
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                      placeholder="70"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Height (CM)</label>
                    <input 
                      type="number" required
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                      placeholder="175"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5"
              >
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Target className="text-orange-500" size={20} /> Nutrition Goals
                  </h2>
                  <p className="text-gray-400 text-xs">Tell us what you want to achieve</p>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">Primary Fitness Goal</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'loss', label: 'Weight Loss', icon: '↘️' },
                        { id: 'gain', label: 'Muscle Gain', icon: '↗️' },
                        { id: 'maintain', label: 'Maintenance', icon: '➡️' }
                      ].map(g => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => updateFormData('goal', g.label)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                            formData.goal === g.label 
                            ? 'bg-orange-50 border-orange-200 ring-2 ring-orange-500/20' 
                            : 'bg-white border-gray-100 group hover:border-orange-200 hover:bg-orange-50/30'
                          }`}
                        >
                          <span className="text-2xl">{g.icon}</span>
                          <span className={`font-bold text-sm ${formData.goal === g.label ? 'text-orange-600' : 'text-gray-600'}`}>
                            {g.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">Dietary Preference</label>
                    <div className="flex flex-wrap gap-2">
                      {['Veg', 'Non-Veg', 'Vegan', 'Eggetarian'].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => updateFormData('mealType', d)}
                          className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all ${
                            formData.mealType === d 
                            ? 'bg-gray-800 border-gray-800 text-white' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5"
              >
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Home className="text-orange-500" size={20} /> Lifestyle & Hostel
                  </h2>
                  <p className="text-gray-400 text-xs">Almost done!</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-700">Can you cook meals occasionally?</span>
                      <div className="flex bg-white p-1 rounded-lg border border-gray-200">
                        {['yes', 'no'].map(v => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => updateFormData('canCook', v)}
                            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                              formData.canCook === v ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-400'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5 ml-1">Select Your Hostel</label>
                    <div 
                      className="group relative flex items-center"
                      onFocus={() => setShowHostelDropdown(true)}
                    >
                      <Search className="absolute left-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={16} />
                      <input 
                        type="text" required
                        autoComplete="off"
                        value={formData.hostel || hostelSearch}
                        onChange={(e) => {
                          setHostelSearch(e.target.value);
                          updateFormData('hostel', '');
                          setShowHostelDropdown(true);
                        }}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-sm font-medium"
                        placeholder="Search hostel name..."
                      />
                    </div>
                    
                    {showHostelDropdown && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-10 max-h-48 overflow-y-auto no-scrollbar">
                        {filteredHostels.length > 0 ? (
                          filteredHostels.map(h => (
                            <button
                              key={h}
                              type="button"
                              onClick={() => {
                                updateFormData('hostel', h);
                                setShowHostelDropdown(false);
                                setHostelSearch('');
                              }}
                              className="w-full text-left px-5 py-3.5 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between group"
                            >
                              {h}
                              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-300" size={14} />
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center text-xs text-gray-400 italic">No hostels found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Review & Finish</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">By clicking "Complete Profile", you agree to our terms of nutrition coaching.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <div className="mt-8">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 hover:shadow-orange-500/25 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating AI Profile...
                </>
              ) : (
                <>
                  {step === 4 ? 'Complete Profile' : 'Continue'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </Card>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 font-medium">
          Already have an account? 
          <button onClick={() => router.push('/login')} className="ml-1.5 text-orange-500 font-bold hover:underline">Sign In</button>
        </p>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
