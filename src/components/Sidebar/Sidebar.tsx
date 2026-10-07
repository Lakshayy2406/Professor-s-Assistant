import React from 'react';
import { useApp } from '../../context/AppContext';
import { DropZone } from './DropZone';
import { FileItem } from './FileItem';
import { 
  Bot, 
  MessageSquare, 
  CalendarDays, 
  Shapes, 
  Trash2, 
  FolderOpen
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    files, 
    clearAllFiles, 
    isSidebarOpenMobile,
    setIsSidebarOpenMobile
  } = useApp();

  const handleTabChange = (tab: 'chat' | 'schedule' | 'tools') => {
    setCurrentTab(tab);
    setIsSidebarOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpenMobile && (
        <div 
          onClick={() => setIsSidebarOpenMobile(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs animate-fade-in"
        />
      )}

      <aside className={`w-80 bg-slate-900 text-slate-100 flex flex-col shadow-2xl z-40 transition-transform duration-300 ease-in-out fixed md:relative h-full ${
        isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white leading-tight">
                Professor's Assistant
              </h1>
              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide">
                Strict Academic Mode
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pt-4 pb-2 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTabChange('chat')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                currentTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <button
              onClick={() => handleTabChange('schedule')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                currentTab === 'schedule'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" /> Schedule
            </button>
          </div>
          <button
            onClick={() => handleTabChange('tools')}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              currentTab === 'tools'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
            }`}
          >
            <Shapes className="w-3.5 h-3.5" /> Study Tools
          </button>
        </div>

        {/* Upload DropZone */}
        <DropZone />

        {/* Document Knowledge Base */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> Knowledge Base
            </h3>
            <span className="text-[10px] font-bold bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 border border-slate-700">
              {files.length} {files.length === 1 ? 'File' : 'Files'}
            </span>
          </div>

          <div className="space-y-2">
            {files.length === 0 ? (
              <div className="text-center text-slate-500 py-10 text-xs italic bg-slate-800/20 rounded-xl border border-dashed border-slate-800">
                No files uploaded yet.
              </div>
            ) : (
              files.map(file => <FileItem key={file.name} file={file} />)
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800">
          <button
            onClick={clearAllFiles}
            className="w-full mb-3 py-2 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-800/60 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Files
          </button>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle shadow-sm shadow-emerald-400/50"></div>
              <span className="text-slate-400 text-[11px] font-medium">Local RAG Active</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Gemini 2.5</span>
          </div>
        </div>
      </aside>
    </>
  );
};
