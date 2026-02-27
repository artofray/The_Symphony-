import React, { useState } from 'react';
import { AppView } from './types';
import Header from './components/Header';
import DashboardView from './components/views/DashboardView';
import GrantWriterView from './components/views/GrantWriterView';
import InvestorProfilerView from './components/views/InvestorProfilerView';
import CampaignStrategistView from './components/views/CampaignStrategistView';
import BrandingAssetView from './components/views/BrandingAssetView';
import OrganicIntelligenceView from './components/views/OrganicIntelligenceView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.GRANT_WRITER:
        return <GrantWriterView />;
      case AppView.INVESTOR_PROFILER:
        return <InvestorProfilerView />;
      case AppView.CAMPAIGN_STRATEGIST:
        return <CampaignStrategistView />;
      case AppView.BRANDING_ASSET_GENERATOR:
        return <BrandingAssetView />;
      case AppView.ORGANIC_INTELLIGENCE:
        return <OrganicIntelligenceView />;
      case AppView.DASHBOARD:
      default:
        return <DashboardView navigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header currentView={currentView} navigate={setCurrentView} />
      <main className="p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;