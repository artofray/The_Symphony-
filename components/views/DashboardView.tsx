import React from 'react';
import { AppView } from '../../types';
import Card from '../common/Card';

interface DashboardViewProps {
  navigate: (view: AppView) => void;
}

const ToolCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
  <Card onClick={onClick} className="h-full">
    <div className="p-6 flex flex-col items-start text-left h-full">
      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-500 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-500 mt-2 flex-grow">{description}</p>
      <div className="mt-4 text-amber-600 font-semibold hover:text-amber-700">
        Launch Tool &rarr;
      </div>
    </div>
  </Card>
);

const DashboardView: React.FC<DashboardViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome, Visionary</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
          Your orchestra of agents is ready to build, fund, and grow your mission. Select a tool to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ToolCard
          title="Organic Intelligence (O.I.)"
          description="Explore the vision and roadmap for the QED on Agartha Ecosystem, a decentralized, self-organizing intelligence."
          icon={<IconBrain />}
          onClick={() => navigate(AppView.ORGANIC_INTELLIGENCE)}
        />
        <ToolCard
          title="AI Grant Writer"
          description="Generate compelling, mission-focused grant proposals to secure funding from foundations and organizations that share your values."
          icon={<IconPencil />}
          onClick={() => navigate(AppView.GRANT_WRITER)}
        />
        <ToolCard
          title="AI Investor Profiler"
          description="Identify and understand the mindset of 'long-haul' investors—VCs, angels, and backers who want to join your family, not just make a quick profit."
          icon={<IconUsers />}
          onClick={() => navigate(AppView.INVESTOR_PROFILER)}
        />
        <ToolCard
          title="AI Campaign Strategist"
          description="Develop a complete crowdfunding strategy, from branding and messaging to ad concepts that build a tribe of true believers around your project."
          icon={<IconMegaphone />}
          onClick={() => navigate(AppView.CAMPAIGN_STRATEGIST)}
        />
         <ToolCard
          title="AI Branding Asset Generator"
          description="Create a unique and inspiring logo for your project. The AI will generate visual assets that reflect your mission and values."
          icon={<IconSparkles />}
          onClick={() => navigate(AppView.BRANDING_ASSET_GENERATOR)}
        />
      </div>
    </div>
  );
};


const IconPencil = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const IconUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.275-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.275.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const IconMegaphone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-4.684C19.486 1.054 18.006.5 16.5.5c-1.83 0-3.543.646-4.812 1.743L7 6m11 7a3 3 0 100-6" />
    </svg>
);

const IconSparkles = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconBrain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default DashboardView;