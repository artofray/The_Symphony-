
import React, { useState } from 'react';
import { generateGrantProposal } from '../../services/geminiService';
import type { GrantProposal } from '../../types';
import ViewContainer from '../common/ViewContainer';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';

const GrantWriterView: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [grantProposal, setGrantProposal] = useState<GrantProposal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGrantProposal(null);
    try {
      const result = await generateGrantProposal(projectDescription);
      setGrantProposal(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewContainer
      title="AI Grant Writer"
      subtitle="Craft compelling, mission-driven proposals that resonate with funders."
      icon={<IconPencil />}
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
            placeholder="e.g., A community garden project that teaches sustainable farming to at-risk youth and provides fresh produce for local shelters..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-4 text-right">
            <Button onClick={handleGenerate} isLoading={isLoading} disabled={!projectDescription.trim()}>
              Generate Grant Proposal
            </Button>
          </div>
        </div>
      </Card>

      {(isLoading || grantProposal) && (
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Generated Proposal</h3>
            {isLoading && <Loader />}
            {grantProposal && (
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-md">{grantProposal}</pre>
              </div>
            )}
          </div>
        </Card>
      )}
    </ViewContainer>
  );
};

const IconPencil = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

export default GrantWriterView;
