import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Power, Zap, Waves, Activity, Thermometer } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { auth, database } from '../lib/firebase';
import { ref, onValue, update } from 'firebase/database';

interface DeviceState {
  power: boolean;
  mode: 1 | 2;
  intensity: 1 | 2 | 3;
}

interface DeviceData {
  deviceId: string;
  status: string;
  state?: DeviceState;
}

export const ControlPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceData | null>(null);
  const [loading, setLoading] = useState(true);

  // Default state if not present in DB
  const currentState: DeviceState = device?.state || { power: false, mode: 1, intensity: 1 };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/signin');
        return;
      }

      if (!id) return;

      const deviceRef = ref(database, `users/${user.uid}/devices/${id}`);
      
      const unsubscribeSnapshot = onValue(deviceRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setDevice(data);
        } else {
          // Device not found
          navigate('/dashboard');
        }
        setLoading(false);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, [id, navigate]);

  const updateState = async (updates: Partial<DeviceState>) => {
    if (!auth.currentUser || !id) return;
    
    // Optimistic update for UI responsiveness
    const newState = { ...currentState, ...updates };
    setDevice(prev => prev ? { ...prev, state: newState } : null);

    try {
      const deviceRef = ref(database, `users/${auth.currentUser.uid}/devices/${id}`);
      // Update nested state object in Realtime Database
      await update(deviceRef, {
        state: newState
      });
    } catch (error) {
      console.error("Error updating device state:", error);
    }
  };

  const togglePower = () => {
    updateState({ power: !currentState.power });
  };

  const setMode = (mode: 1 | 2) => {
    if (!currentState.power) return;
    updateState({ mode });
  };

  const setIntensity = (intensity: 1 | 2 | 3) => {
    if (!currentState.power) return;
    updateState({ intensity });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
       {/* Background Ambience */}
       <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${currentState.power ? 'opacity-100' : 'opacity-20'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
       </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center pr-10">
            <h1 className="text-lg font-bold text-white font-display tracking-wide">
              {device?.deviceId || 'Unknown Device'}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
               <span className={`w-2 h-2 rounded-full ${currentState.power ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-600'}`} />
               {currentState.power ? 'Active' : 'Standby'}
            </div>
          </div>
        </div>

        {/* Main Controls */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Power Button */}
          <div className="flex justify-center mb-12 relative">
             {/* Ripple Effect Ring */}
             <AnimatePresence>
              {currentState.power && (
                <>
                  <motion.div 
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-violet-500/50 m-auto w-32 h-32 pointer-events-none"
                  />
                   <motion.div 
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 rounded-full border border-violet-500/30 m-auto w-32 h-32 pointer-events-none"
                  />
                </>
              )}
             </AnimatePresence>

            <motion.button
              onClick={togglePower}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: currentState.power 
                  ? "0 0 40px rgba(124, 58, 237, 0.4), inset 0 0 20px rgba(255,255,255,0.1)" 
                  : "0 0 0px rgba(0,0,0,0)"
              }}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 relative z-20 ${
                currentState.power 
                  ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-2 border-violet-400/50' 
                  : 'bg-slate-800 text-slate-500 border-2 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <Power className={`w-12 h-12 ${currentState.power ? 'drop-shadow-lg' : ''}`} />
            </motion.button>
          </div>

          <div className={`space-y-8 transition-opacity duration-300 ${currentState.power ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            {/* Mode Selection */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" /> Massage Mode
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950/50 rounded-xl border border-white/5">
                {[1, 2].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m as 1 | 2)}
                    className={`relative py-3 rounded-lg text-sm font-medium transition-all ${
                      currentState.mode === m 
                        ? 'text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {currentState.mode === m && (
                      <motion.div 
                        layoutId="mode-highlight"
                        className="absolute inset-0 bg-slate-800 rounded-lg border border-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">
                      {m === 1 ? 'Deep Wave' : 'Pulse Flow'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div>
               <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Intensity
                </span>
                <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                  Level {currentState.intensity}
                </span>
              </div>
              
              <div className="flex justify-between items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-white/5">
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level as 1 | 2 | 3)}
                    className={`flex-1 h-12 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                      currentState.intensity >= level 
                        ? 'bg-violet-600/20 border border-violet-500/50' 
                        : 'bg-slate-800/20 border border-white/5'
                    }`}
                  >
                    <div className={`w-full max-w-[40%] h-1 rounded-full ${
                      currentState.intensity >= level ? 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]' : 'bg-slate-700'
                    }`} />
                  </button>
                ))}
              </div>
              <div className="flex justify-between px-4 mt-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                <span>Soft</span>
                <span>Medium</span>
                <span>Deep</span>
              </div>
            </div>
            
            {/* Status Display */}
             <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800/30 rounded-xl p-3 border border-white/5 flex items-center gap-3">
                   <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Thermometer className="w-4 h-4 text-blue-400" />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-500">Temp</div>
                      <div className="text-sm font-bold text-white">Cool</div>
                   </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-3 border border-white/5 flex items-center gap-3">
                   <div className="p-2 bg-green-500/10 rounded-lg">
                      <Activity className="w-4 h-4 text-green-400" />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-500">Battery</div>
                      <div className="text-sm font-bold text-white">82%</div>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};
