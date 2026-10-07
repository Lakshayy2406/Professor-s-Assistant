import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import { HistoryModal } from './HistoryModal';
import { MessageSquare, History, Plus, Bot } from 'lucide-react';

export const ChatView: React.FC = () => {
  const { 
    currentMessages, 
    isChatLoading, 
    startNewChat, 
    setIsHistoryModalOpen 
  } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isChatLoading]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50/50">
      {/* Chat Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-10">
        <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600" /> Academic Conversation
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="text-xs bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-medium shadow-2xs"
          >
            <History className="w-3.5 h-3.5" /> History
          </button>
          <button
            onClick={startNewChat}
            className="text-xs bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-medium shadow-2xs group"
          >
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" /> New Chat
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        {currentMessages.map(msg => (
          <ChatMessageItem key={msg.id} message={msg} />
        ))}

        {isChatLoading && (
          <div className="flex gap-4 max-w-3xl mx-auto animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
              <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput />

      {/* History Modal */}
      <HistoryModal />
    </div>
  );
};
