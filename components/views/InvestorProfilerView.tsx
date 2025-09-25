
import React, { useState } from 'react';
import { generateInvestorProfiles } from '../../services/geminiService';
import type { InvestorProfile } from '../../types';
import ViewContainer from '../common/ViewContainer';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';

const InvestorProfilerView: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [profiles, setProfiles] = useState<InvestorProfile[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProfiles(null);
    try {
      const result = await generateInvestorProfiles(projectDescription);
      setProfiles(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const ProfileCard: React.FC<{ profile: InvestorProfile }> = ({ profile }) => (
    <Card className="!shadow-lg">
      <div className="p-6">
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{profile.type}</span>
        <h4 className="text-2xl font-bold text-slate-900 mt-2">{profile.name}</h4>
        <div className="mt-4 space-y-3">
          <div>
            <h5 className="font-semibold text-slate-700">Mindset</h5>
            <p className="text-slate-600">{profile.mindset}</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700">Why They Invest</h5>
            <p className="text-slate-600">{profile.whyTheyInvest}</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700">How to Approach</h5>
            <p className="text-slate-600">{profile.howToApproach}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <ViewContainer
      title="AI Investor Profiler"
      subtitle="Find the 'family' and 'long-haul stakeholders' who believe in your vision."
      icon={<IconUsers />}
    >
      <Card>
        <div className="p-6">
          <label htmlFor="project-description" className="block text-sm font-medium text-slate-700">
            Describe your project idea
          </label>
          <textarea
            id="project-description"
            rows={6}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
            placeholder="e.g., A subscription box service for ethically sourced artisan goods that shares profits with the creators..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-4 text-right">
            <Button onClick={handleGenerate} isLoading={isLoading} disabled={!projectDescription.trim()}>
              Generate Investor Profiles
            </Button>
          </div>
        </div>
      </Card>

      {isLoading && <Card><Loader /></Card>}

      {profiles && (
         <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800">Ideal Investor Archetypes</h3>
            {profiles.map((profile, index) => <ProfileCard key={index} profile={profile} />)}
         </div>
      )}
    </ViewContainer>
  );
};

const IconUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.275-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.275.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


export default InvestorProfilerView;
