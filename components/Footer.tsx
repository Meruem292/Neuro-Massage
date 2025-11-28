import React from 'react';
import { Brain, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-violet-500" />
              <span className="text-lg font-bold font-display text-white">Neuro Massage</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Revolutionizing sleep and recovery through advanced neuro-stimulation technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Features</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Technology</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Warranty</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-violet-400 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2024 Neuro Massage Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
