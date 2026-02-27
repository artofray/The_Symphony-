
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  navigate: (view: AppView) => void;
}

const SymphonyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Header: React.FC<HeaderProps> = ({ currentView, navigate }) => {
  const isDashboard = currentView === AppView.DASHBOARD;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate(AppView.DASHBOARD)}>
            <SymphonyIcon className="h-10 w-10 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              The Symphony <span className="font-light text-amber-500">AI</span>
            </h1>
          </div>
          <nav>
            {!isDashboard && (
              <button
                onClick={() => navigate(AppView.DASHBOARD)}
                className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Dashboard
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
