import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-violet-600/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        
        <div className="relative z-10 max-w-md text-center p-8">
          <div className="mb-8 flex justify-center">
             <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                <Brain className="w-12 h-12 text-white" />
             </div>
          </div>
          <h2 className="text-3xl font-bold font-display text-white mb-4">Welcome Back</h2>
          <p className="text-slate-400">
            Continue your journey to better sleep and recovery. Your personal neuro-profile is ready.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4">
             <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">8h 12m</div>
                <div className="text-xs text-slate-400">Avg. Deep Sleep</div>
             </div>
             <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">94%</div>
                <div className="text-xs text-slate-400">Recovery Score</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <Brain className="w-6 h-6" />
          <span className="font-bold font-display">Neuro Massage</span>
        </Link>
        
        <Link to="/" className="absolute top-8 right-8 text-sm text-slate-400 hover:text-white transition-colors">
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display text-white mb-2">Sign In</h1>
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                 <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                 <Input 
                    type="email" 
                    placeholder="Email address" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                 />
              </div>
              <div className="relative">
                 <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                 <Input 
                    type="password" 
                    placeholder="Password" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                 />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-slate-400 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-slate-700 bg-slate-900 text-violet-500 focus:ring-violet-500 focus:ring-offset-0" />
                Remember me
              </label>
              <a href="#" className="text-violet-400 hover:text-violet-300">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign In <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="w-full">
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-63.9 0-14.1 5.5-25.6 14.6-35.5-1-3.5-6-16.8 1.4-35.1 0 0 10.5-3.4 34.6 13 10-2.8 20.8-4.2 31.6-4.2 10.8 0 21.6 1.4 31.6 4.2 24.1-16.4 34.6-13 34.6-13 7.5 18.2 2.5 31.8 1.5 35.1 9 9.9 14.6 21.4 14.6 35.5 0 49.8-56.5 57.5-112.3 63.9 9.1 7.9 17.2 22.9 17.2 46.4 0 33.5-.3 60.5-.3 68.7 0 6.5 4.9 14.8 17.3 12.1C426.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
              GitHub
            </Button>
            <Button variant="secondary" className="w-full">
               <span className="mr-2">G</span> Google
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
