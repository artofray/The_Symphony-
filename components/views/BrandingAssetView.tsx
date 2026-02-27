import React, { useState } from 'react';
import { generateLogo } from '../../services/geminiService';
import ViewContainer from '../common/ViewContainer';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';

const BrandingAssetView: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setLogoImageUrl(null);
    try {
      const base64Image = await generateLogo(projectDescription);
      setLogoImageUrl(`data:image/png;base64,${base64Image}`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewContainer
      title="AI Branding Asset Generator"
      subtitle="Create a unique visual identity that captures the spirit of your mission."
      icon={<IconSparkles />}
    >
      <Card>
        <div className="p-6">
          <label htmlFor="project-description" className="block text-sm font-medium text-slate-700">
            Describe your project to inspire the logo
          </label>
          <textarea
            id="project-description"
            rows={6}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
            placeholder="e.g., A mobile app that connects volunteers with local environmental cleanup events. We want to convey a sense of community and nature..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-4 text-right">
            <Button onClick={handleGenerate} isLoading={isLoading} disabled={!projectDescription.trim()}>
              Generate Logo
            </Button>
          </div>
        </div>
      </Card>

      {(isLoading || logoImageUrl) && (
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Generated Logo</h3>
            {isLoading && <Loader />}
            {logoImageUrl && !isLoading && (
              <div className="flex justify-center items-center bg-slate-50 p-8 rounded-lg">
                <img
                  src={logoImageUrl}
                  alt="AI generated logo"
                  className="max-w-xs w-full h-auto rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
        </Card>
      )}
    </ViewContainer>
  );
};

const IconSparkles = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export default BrandingAssetView;