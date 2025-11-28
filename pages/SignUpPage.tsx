import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-row-reverse">
      {/* Right Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        
        <div className="relative z-10 max-w-md text-center p-8">
           {/* Abstract Art */}
           <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-2xl opacity-40 animate-pulse" />
              <div className="absolute inset-4 bg-slate-950 rounded-full flex items-center justify-center border border-white/10">
                 <Brain className="w-32 h-32 text-violet-400" />
              </div>
              <div className="absolute -right-4 top-10 bg-slate-800 p-3 rounded-lg border border-white/10 shadow-lg animate-bounce">
                <span className="text-2xl">😴</span>
              </div>
              <div className="absolute -left-4 bottom-10 bg-slate-800 p-3 rounded-lg border border-white/10 shadow-lg animate-bounce delay-700">
                <span className="text-2xl">⚡</span>
              </div>
           </div>

          <h2 className="text-3xl font-bold font-display text-white mb-4">Join the Revolution</h2>
          <p className="text-slate-400">
            Create an account to track your sleep patterns, customize your massage intensity, and unlock premium neuro-soundscapes.
          </p>
        </div>
      </div>

      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <Brain className="w-6 h-6" />
          <span className="font-bold font-display">Neuro Massage</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display text-white mb-2">Create Account</h1>
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                 <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                 <Input 
                    type="text" 
                    placeholder="Full Name" 
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                 />
              </div>
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
            
            <p className="text-xs text-slate-500 text-center">
               By clicking create account, you agree to our <a href="#" className="text-violet-400">Terms</a> and <a href="#" className="text-violet-400">Privacy Policy</a>.
            </p>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 px-2 text-slate-500">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="w-full">
              GitHub
            </Button>
            <Button variant="secondary" className="w-full">
              Google
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
