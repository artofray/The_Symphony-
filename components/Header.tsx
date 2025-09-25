
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  navigate: (view: AppView) => void;
}

const GoldenHordeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z" stroke="currentColor" strokeWidth="5"/>
        <path d="M50 25V75" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M25 50H75" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M32.2218 32.2218L67.7782 67.7782" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M32.2218 67.7782L67.7782 32.2218" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ currentView, navigate }) => {
  const isDashboard = currentView === AppView.DASHBOARD;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate(AppView.DASHBOARD)}>
            <GoldenHordeIcon className="h-10 w-10 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              The Golden Horde <span className="font-light text-amber-500">AI</span>
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
