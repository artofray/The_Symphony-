import React, { useState } from 'react';
import { generateCampaignStrategy, refineCampaignStrategy } from '../../services/geminiService';
import type { CampaignStrategy } from '../../types';
import ViewContainer from '../common/ViewContainer';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';

const CampaignStrategistView: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [strategy, setStrategy] = useState<CampaignStrategy | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setStrategy(null);
    setFeedback('');
    try {
      const result = await generateCampaignStrategy(projectDescription);
      setStrategy(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!feedback.trim() || !strategy) {
      setError('Please enter feedback to refine the strategy.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await refineCampaignStrategy(projectDescription, strategy, feedback);
      setStrategy(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during refinement.');
    } finally {
      setIsLoading(false);
      setFeedback('');
    }
  };
  
  const StrategyDisplay: React.FC<{ strategy: CampaignStrategy }> = ({ strategy }) => (
    <div className="space-y-8">
        <Card>
            <div className="p-6">
                <h4 className="text-xl font-bold text-amber-600">Branding</h4>
                <div className="mt-4 space-y-2 border-l-4 border-amber-200 pl-4">
                    <p><strong className="font-semibold text-slate-700">Name:</strong> {strategy.branding.name}</p>
                    <p><strong className="font-semibold text-slate-700">Tagline:</strong> "{strategy.branding.tagline}"</p>
                    <p><strong className="font-semibold text-slate-700">Core Message:</strong> {strategy.branding.coreMessage}</p>
                </div>
            </div>
        </Card>

        <Card>
            <div className="p-6">
                <h4 className="text-xl font-bold text-amber-600">Target Audience: The "Tribe"</h4>
                 <div className="mt-4 space-y-2 border-l-4 border-amber-200 pl-4">
                    <p><strong className="font-semibold text-slate-700">Demographics:</strong> {strategy.targetAudience.demographics}</p>
                    <p><strong className="font-semibold text-slate-700">Psychographics:</strong> {strategy.targetAudience.psychographics}</p>
                </div>
            </div>
        </Card>

        <Card>
            <div className="p-6">
                <h4 className="text-xl font-bold text-amber-600">Kickstarter Strategy</h4>
                 <div className="mt-4 space-y-4 border-l-4 border-amber-200 pl-4">
                    <p><strong className="font-semibold text-slate-700">Campaign Title:</strong> "{strategy.kickstarterStrategy.title}"</p>
                    <p><strong className="font-semibold text-slate-700">Funding Goal Rationale:</strong> {strategy.kickstarterStrategy.fundingGoalRationale}</p>
                    <div>
                        <strong className="font-semibold text-slate-700">Reward Tiers:</strong>
                        <ul className="list-disc list-inside mt-1 text-slate-600 space-y-1">
                            {strategy.kickstarterStrategy.rewardTiers.map((tier, i) => <li key={i}>{tier}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </Card>

        <Card>
            <div className="p-6">
                <h4 className="text-xl font-bold text-amber-600">Targeted Ad Concepts</h4>
                <div className="mt-4 space-y-4">
                    {strategy.targetedAdConcepts.map((ad, i) => (
                        <div key={i} className="border border-slate-200 rounded-lg p-4">
                            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{ad.platform}</span>
                            <p className="mt-2"><strong className="font-semibold text-slate-700">Headline:</strong> "{ad.headline}"</p>
                            <p className="mt-1"><strong className="font-semibold text-slate-700">Body:</strong> {ad.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    </div>
  );

  return (
    <ViewContainer
      title="AI Campaign Strategist"
      subtitle="Build a movement from the ground up with authentic branding and messaging."
      icon={<IconMegaphone />}
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
            placeholder="e.g., An online platform connecting skilled volunteers with non-profits for short-term, high-impact projects..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-4 text-right">
            <Button onClick={handleGenerate} isLoading={isLoading} disabled={!projectDescription.trim()}>
              Generate Campaign Strategy
            </Button>
          </div>
        </div>
      </Card>

      {isLoading && <Card><Loader /></Card>}

      {strategy && !isLoading && (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Generated Campaign Strategy</h3>
                <StrategyDisplay strategy={strategy} />
            </div>
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-700">Refine the Strategy</h3>
                    <label htmlFor="feedback" className="mt-1 block text-sm text-slate-600">
                    Provide feedback to tune the branding, audience, or campaign details.
                    </label>
                    <textarea
                        id="feedback"
                        rows={4}
                        className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                        placeholder="e.g., 'The brand name feels a bit too corporate, can we try something more community-focused?' or 'Let's add a reward tier for early-bird backers.'"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="mt-4 text-right">
                        <Button onClick={handleRefine} isLoading={isLoading} disabled={!feedback.trim()}>
                            Refine Strategy
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
      )}
    </ViewContainer>
  );
};

const IconMegaphone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-4.684C19.486 1.054 18.006.5 16.5.5c-1.83 0-3.543.646-4.812 1.743L7 6m11 7a3 3 0 100-6" />
    </svg>
);


export default CampaignStrategistView;