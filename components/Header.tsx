import React from 'react';
import { GraduationCap, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">MBA Connect</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Mentorship Portal</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span>Connect Now</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;