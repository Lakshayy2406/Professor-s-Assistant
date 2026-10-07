import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ChatView } from './components/Chat/ChatView';
import { ScheduleView } from './components/Schedule/ScheduleView';
import { StudyToolsView } from './components/StudyTools/StudyToolsView';
import { MobileHeader } from './components/Common/MobileHeader';
import { ToastContainer } from './components/Common/ToastContainer';
import { ConfirmModal } from './components/Modals/ConfirmModal';
import { SettingsModal } from './components/Modals/SettingsModal';

export const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-800">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Confirmation modal */}
      <ConfirmModal />

      {/* Settings modal */}
      <SettingsModal />

      {/* Sidebar */}
      <Sidebar />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col h-full w-full relative overflow-hidden bg-slate-50">
        <MobileHeader />

        {currentTab === 'chat' && <ChatView />}
        {currentTab === 'schedule' && <ScheduleView />}
        {currentTab === 'tools' && <StudyToolsView />}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
