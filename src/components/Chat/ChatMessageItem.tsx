import React, { useState } from 'react';
import { ChatMessage } from '../../types';
import { marked } from 'marked';
import { Bot, User, Copy, Check } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const renderedHtml = marked.parse(message.text) as string;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 sm:gap-4 max-w-3xl mx-auto animate-fade-in group ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-sm mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`relative max-w-[85%] sm:max-w-[80%] rounded-2xl shadow-sm text-sm overflow-hidden p-4 ${
        isUser 
          ? 'bg-slate-900 text-white rounded-tr-none' 
          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
      }`}>
        <div 
          className={`prose-academic ${isUser ? 'text-slate-100' : 'text-slate-800'}`}
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />

        {!isUser && (
          <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end items-center gap-2">
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50 flex items-center gap-1 text-[11px] font-medium"
              title="Copy answer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-200 shadow-sm mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
