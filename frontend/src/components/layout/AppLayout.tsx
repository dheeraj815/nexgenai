import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { cancelAllSpeech } from '../../utils/voiceUtils';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  // Cancel any ongoing speech when route changes (e.g. clicking links or back/forward)
  useEffect(() => {
    cancelAllSpeech();
  }, [location.pathname, location.search]);

  // Handle browser back/forward button (popstate) and window events
  useEffect(() => {
    const handleNavigationOrUnload = () => {
      cancelAllSpeech();
    };

    window.addEventListener('popstate', handleNavigationOrUnload);
    window.addEventListener('pagehide', handleNavigationOrUnload);
    window.addEventListener('beforeunload', handleNavigationOrUnload);

    return () => {
      cancelAllSpeech();
      window.removeEventListener('popstate', handleNavigationOrUnload);
      window.removeEventListener('pagehide', handleNavigationOrUnload);
      window.removeEventListener('beforeunload', handleNavigationOrUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-60 p-6 max-w-7xl w-full min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};