import React from 'react';
import { SeniorProfile, MatchResult } from '../types';
import SeniorCard from './SeniorCard';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface MatchListProps {
  matches: MatchResult[];
  seniors: SeniorProfile[];
  onReset: () => void;
}

const MatchList: React.FC<MatchListProps> = ({ matches, seniors, onReset }) => {
  // Helper to find senior details by ID
  const getSeniorDetails = (id: string) => seniors.find(s => s.id === id);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold text-sm tracking-wide uppercase">AI Recommendations</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Your Top Senior Matches</h2>
          <p className="text-slate-500 mt-2">Based on your background and target field, these seniors can offer the best guidance.</p>
        </div>
        
        <button 
          onClick={onReset}
          className="self-start md:self-center flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Refine Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((match, index) => {
          const senior = getSeniorDetails(match.seniorId);
          if (!senior) return null;

          return (
            <SeniorCard 
              key={match.seniorId} 
              senior={senior} 
              matchScore={match.matchScore} 
              reason={match.reason}
              rank={index + 1}
            />
          );
        })}
      </div>
      
      {matches.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
           <p className="text-slate-500">No matches found. Try adjusting your profile details.</p>
        </div>
      )}
    </div>
  );
};

export default MatchList;