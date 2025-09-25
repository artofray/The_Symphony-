
import React from 'react';

interface ViewContainerProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ViewContainer: React.FC<ViewContainerProps> = ({ title, subtitle, icon, children }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

export default ViewContainer;
