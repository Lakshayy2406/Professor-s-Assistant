import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Menu } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const { setIsSidebarOpenMobile } = useApp();

  return (
    <div className="md:hidden h-14 bg-white border-b border-slate-200 flex items-center px-4 justify-between flex-shrink-0 z-20">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSidebarOpenMobile(true)}
          className="text-slate-600 hover:text-slate-900 p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
          <Bot className="w-5 h-5 text-blue-600" /> Professor's Assistant
        </span>
      </div>
    </div>
  );
};
