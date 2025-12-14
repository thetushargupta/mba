import React from 'react';
import { SeniorProfile } from '../types';
import { Building2, GraduationCap, Briefcase, Users, Linkedin, CheckCircle2 } from 'lucide-react';

interface SeniorCardProps {
  senior: SeniorProfile;
  matchScore: number;
  reason: string;
  rank: number;
}

const SeniorCard: React.FC<SeniorCardProps> = ({ senior, matchScore, reason, rank }) => {
  // Determine color based on score
  let scoreColor = 'text-green-700 bg-green-50 border-green-200 ring-green-100';
  if (matchScore < 80) scoreColor = 'text-yellow-700 bg-yellow-50 border-yellow-200 ring-yellow-100';
  if (matchScore < 60) scoreColor = 'text-slate-700 bg-slate-50 border-slate-200 ring-slate-100';

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 overflow-hidden h-full relative hover:-translate-y-1">
      {/* Top Banner / Match Score */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ring-4 flex items-center gap-1.5 shadow-sm ${scoreColor}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
          {matchScore}% Match
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex items-start gap-4 mb-5">
           {/* Rank Badge */}
           <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-lg shadow-lg shadow-slate-900/20">
             #{rank}
           </div>
           
           <div className="pt-0.5 pr-20">
             <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{senior.name}</h3>
             <div className="flex flex-wrap items-center text-slate-500 text-xs mt-1.5 gap-2">
               <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                  <Building2 className="h-3 w-3" />
                  {senior.company}
               </span>
               <span>{senior.role}</span>
             </div>
           </div>
        </div>

        {/* AI Reason */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-5 relative">
           <div className="absolute -left-1 top-4 h-6 w-1 bg-blue-500 rounded-r-full"></div>
           <p className="text-sm text-slate-700 leading-relaxed pl-2">
             <span className="font-semibold text-blue-700 block text-xs uppercase tracking-wide mb-1">Why it's a match</span>
             "{reason}"
           </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <GraduationCap className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Education</p>
              <p className="text-slate-800 text-sm font-medium leading-snug">{senior.undergradDegree}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
             <Briefcase className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
             <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Pre-MBA</p>
              <p className="text-slate-800 text-sm font-medium leading-snug">{senior.preMbaExperienceYears} Years • {senior.preMbaIndustry}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 px-2 py-1">
             <Users className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
             <div className="flex flex-wrap gap-1.5 pt-0.5">
                {senior.clubsAndCommittees.slice(0, 3).map((club, idx) => (
                  <span key={idx} className="bg-white text-slate-600 px-2 py-0.5 rounded-md text-[11px] font-medium border border-slate-200 shadow-sm">
                    {club}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
        <button className="flex-1 py-2.5 px-4 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:text-blue-700 hover:border-blue-300 transition-all">
          View Profile
        </button>
         <button className="flex-1 py-2.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg shadow-blue-600/20">
          <Linkedin className="h-4 w-4" />
          Connect
        </button>
      </div>
    </div>
  );
};

export default SeniorCard;