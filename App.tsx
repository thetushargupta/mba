import React, { useState } from 'react';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import MatchList from './components/MatchList';
import { SENIORS_DATA } from './constants';
import { AppState, MatchResult, StudentProfile } from './types';
import { findBestMatches } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.FORM);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (profile: StudentProfile) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const results = await findBestMatches(profile, SENIORS_DATA);
      setMatches(results);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate matches. Please check your API Key and try again.");
      setAppState(AppState.FORM);
    }
  };

  const handleReset = () => {
    setAppState(AppState.FORM);
    setMatches([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 flex flex-col font-sans">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <Header />
      
      <main className="relative z-10 flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Error Notification */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm flex items-center gap-3 animate-fade-in">
            <div className="bg-red-100 p-1.5 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {appState === AppState.FORM || appState === AppState.LOADING ? (
          <div className="flex flex-col lg:flex-row gap-16 items-start">
             {/* Left Column: Context/Pitch */}
            <div className="lg:w-5/12 space-y-8 lg:sticky lg:top-32 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New Batch 2024-25
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Connect with the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Right Senior</span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Stop shooting in the dark. Our AI analyzes your background and career goals to match you with seniors who have walked the exact path you want to take.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Enter Your Profile</h3>
                    <p className="text-slate-500 leading-snug">Share your background, previous work ex, and target domain.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">AI Matching</h3>
                    <p className="text-slate-500 leading-snug">Our engine finds seniors with high profile overlap and relevant experience.</p>
                  </div>
                </div>
                 <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">3</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Fast-Track Success</h3>
                    <p className="text-slate-500 leading-snug">Get precise placement advice, interview tips, and CV reviews.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-7/12 w-full">
              <StudentForm onSubmit={handleFormSubmit} isLoading={appState === AppState.LOADING} />
            </div>
          </div>
        ) : (
          <MatchList matches={matches} seniors={SENIORS_DATA} onReset={handleReset} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} MBA Connect. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;