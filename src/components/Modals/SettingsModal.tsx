import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Key, X, Check, ExternalLink } from 'lucide-react';
import { getApiKey, setApiKey } from '../../services/gemini';

export const SettingsModal: React.FC = () => {
  const { isSettingsModalOpen, setIsSettingsModalOpen, showToast } = useApp();
  const [keyInput, setKeyInput] = useState<string>(getApiKey());

  if (!isSettingsModalOpen) return null;

  const handleSave = () => {
    setApiKey(keyInput);
    showToast("Gemini API Key configuration saved!", "success");
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform animate-scale-in border border-slate-200">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
            <Key className="w-5 h-5 text-blue-600" /> API Settings
          </h3>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
              <span>A default development key is already loaded.</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                Get Key <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-700">🔒 Privacy & Local Processing</p>
            <p>Documents are parsed client-side in your browser via PDF.js. Only text queries and relevant context are sent to Google Gemini.</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20"
          >
            <Check className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};
