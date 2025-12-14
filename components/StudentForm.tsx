import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { ArrowRight, Briefcase, User, Target, Sparkles } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StudentProfile>({
    name: '',
    undergradDegree: '',
    workExperienceYears: 0,
    prevCompany: '',
    prevRole: '',
    targetField: 'Consulting',
    skills: '',
    hobbies: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'workExperienceYears' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1.5 ml-1";

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
      {/* Top Gradient Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="px-6 py-8 md:px-10 md:py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Build Your Profile</h2>
          <p className="text-slate-500 mt-1">Provide your details to find the best mentorship match.</p>
        </div>
      
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Background */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                <User className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-slate-900">Personal Background</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className={labelClasses}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div className="group">
                <label className={labelClasses}>Undergrad Degree</label>
                <input
                  type="text"
                  name="undergradDegree"
                  required
                  value={formData.undergradDegree}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
               <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                <Briefcase className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-slate-900">Experience</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               <div className="md:col-span-3">
                <label className={labelClasses}>Work Ex (Yrs)</label>
                <input
                  type="number"
                  name="workExperienceYears"
                  min="0"
                  step="0.1"
                  required
                  value={formData.workExperienceYears}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div className="md:col-span-4">
                <label className={labelClasses}>Previous Company</label>
                <input
                  type="text"
                  name="prevCompany"
                  value={formData.prevCompany}
                  onChange={handleChange}
                  placeholder="e.g. Infosys"
                  className={inputClasses}
                />
              </div>
              <div className="md:col-span-5">
                <label className={labelClasses}>Previous Role</label>
                <input
                  type="text"
                  name="prevRole"
                  value={formData.prevRole}
                  onChange={handleChange}
                  placeholder="e.g. Systems Engineer"
                  className={inputClasses}
                />
              </div>
            </div>
          </section>

          {/* Goals & Skills */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
               <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
                <Target className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-slate-900">Goals & Skills</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className={labelClasses}>Target Field</label>
                <div className="relative">
                  <select
                    name="targetField"
                    value={formData.targetField}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none bg-no-repeat bg-right pr-10 cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="Consulting">Consulting (Strategy, Ops, Tech)</option>
                    <option value="Finance">Finance (IB, PE, Markets, Corp Fin)</option>
                    <option value="Marketing">Marketing (FMCG, Tech, Digital)</option>
                    <option value="Operations">Operations & Supply Chain</option>
                    <option value="General Management">General Management</option>
                    <option value="HR">Human Resources</option>
                    <option value="Product Management">Product Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Key Skills & Past Experiences</label>
                <textarea
                  name="skills"
                  rows={3}
                  required
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Describe your achievements, technical skills, and leadership roles..."
                  className={inputClasses + " resize-none"}
                />
              </div>
               <div>
                <label className={labelClasses}>Hobbies / Interests (Optional)</label>
                <input
                  type="text"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  placeholder="e.g. Guitar, Football, Debating"
                  className={inputClasses}
                />
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <Sparkles className="animate-spin h-5 w-5 text-indigo-200" />
                  <span className="text-white">Analyzing Profile...</span>
                </>
              ) : (
                <>
                  <span>Find My Senior Mentor</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">AI-powered matching based on 30+ senior profiles</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;