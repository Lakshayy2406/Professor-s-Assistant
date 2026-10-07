import React from 'react';
import { useApp } from '../../context/AppContext';
import { History, X, Trash2, Clock } from 'lucide-react';

export const HistoryModal: React.FC = () => {
  const { 
    isHistoryModalOpen, 
    setIsHistoryModalOpen, 
    chatHistory, 
    loadChatSession, 
    deleteChatSession,
    clearAllChatHistory
  } = useApp();

  if (!isHistoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col overflow-hidden border border-slate-200 animate-scale-in">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
            <History className="w-5 h-5 text-blue-600" /> Chat History
          </h3>
          <button
            onClick={() => setIsHistoryModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2 py-16">
              <Clock className="w-8 h-8 text-slate-300" />
              <span className="text-sm font-medium">No past conversations saved yet.</span>
            </div>
          ) : (
            chatHistory.map(session => {
              const formattedDate = new Date(session.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              });

              return (
                <div
                  key={session.id}
                  onClick={() => loadChatSession(session.id)}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all group bg-white shadow-2xs"
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {formattedDate}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChatSession(session.id);
                      }}
                      className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-red-50"
                      title="Delete session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 truncate leading-snug">
                    {session.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {session.messages.length} messages
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {chatHistory.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button
              onClick={clearAllChatHistory}
              className="w-full py-2.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 font-semibold flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
