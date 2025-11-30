import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Waves, Battery, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const LandingPage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-300 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                New: AI Sleep Tracking Integration
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold font-display leading-tight tracking-tight">
                Smart massage with{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 blur-3xl opacity-30 animate-pulse"></span>
                  <motion.span 
                    className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-purple-300 bg-[200%_auto] inline-block"
                    animate={{ 
                      backgroundPosition: ["0%", "200%"],
                      scale: [1, 1.05, 1],
                      y: [0, -12, 0]
                    }}
                    transition={{ 
                      backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    Neuro Massage
                  </motion.span>
                </span>.
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl text-slate-400 max-w-lg leading-relaxed">
                Experience the world’s first smart pillow that gently squeezes away tension, melts your muscle stress, and wraps you in pure relaxation.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* Decorative circles */}
                <div className="absolute inset-0 border border-violet-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                
                {/* Main Product Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center animate-float">
                  <div className="relative w-64 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] shadow-2xl shadow-violet-900/50 border border-white/10 flex items-center justify-center backdrop-blur-xl group overflow-hidden">
                     <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <Brain className="w-20 h-20 text-white/80" />
                     <div className="absolute bottom-4 left-0 right-0 text-center text-slate-400 text-sm">Neuro Pillow Mockup</div>
                  </div>
                  
                  {/* Floating cards */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 top-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Battery className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Battery Life</div>
                        <div className="text-sm font-bold text-white">14 Nights</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-8 bottom-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Waves className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Wave Frequency</div>
                        <div className="text-sm font-bold text-white">Delta 2.4Hz</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Science-Backed Relaxation</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our technology adapts to your brainwaves to provide customized relaxation patterns.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Neuro-Haptics", desc: "Micro-vibrations stimulating the vagus nerve.", icon: Brain, color: "text-purple-400" },
              { title: "Smart Thermoregulation", desc: "Adapts temperature for optimal deep sleep cycles.", icon: Zap, color: "text-amber-400" },
              { title: "Ergonomic Memory", desc: "Aerospace-grade foam that remembers your posture.", icon: ShieldCheck, color: "text-emerald-400" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-violet-500/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-600/10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">Ready to transform your sleep?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of well-rested customers. Try Neuro Massage risk-free for 30 nights.
          </p>
          <Link to="/signup">
            <Button size="lg" className="h-14 px-8 text-lg shadow-[0_0_30px_rgba(124,58,237,0.4)]">
              Get Started Now
            </Button>
          </Link>
          <p className="mt-4 text-xs text-slate-500">No credit card required for demo sign up.</p>
        </div>
      </section>
    </div>
  );
};