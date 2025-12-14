export interface StudentProfile {
  name: string;
  undergradDegree: string;
  workExperienceYears: number;
  prevCompany: string;
  prevRole: string;
  targetField: string; // e.g., Finance, Consulting
  skills: string;
  hobbies: string;
}

export interface SeniorProfile {
  id: string;
  name: string;
  field: string;
  company: string;
  role: string;
  undergradDegree: string;
  preMbaExperienceYears: number;
  preMbaIndustry: string;
  clubsAndCommittees: string[];
  bio: string;
}

export interface MatchResult {
  seniorId: string;
  matchScore: number;
  reason: string;
}

export enum AppState {
  FORM = 'FORM',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}