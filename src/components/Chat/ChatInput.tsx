import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { 
  GraduationCap, 
  Lightbulb, 
  Mic, 
  MicOff, 
  Send,
  Loader2
} from 'lucide-react';
import { generateQuiz, generateSuggestedQuestions } from '../../services/gemini';

export const ChatInput: React.FC = () => {
  const { sendMessage, isChatLoading, contextData, showToast, currentMessages } = useApp();
  const [inputText, setInputText] = useState('');

  const { isListening, isSupported, toggleListening } = useSpeechRecognition({
    onResult: (transcript) => {
      setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
    },
    onError: () => {
      showToast("Voice typing failed or microphone permission denied.", 'error');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isChatLoading) return;
    const text = inputText.trim();
    setInputText('');
    await sendMessage(text);
  };

  const handleTriggerQuiz = async () => {
    if (!contextData) {
      showToast("Upload documents to your knowledge base first!", "error");
      return;
    }
    await sendMessage("Quiz me with 3 multiple-choice questions based on our study material.");
  };

  const handleTriggerSuggestions = async () => {
    if (!contextData) {
      showToast("Upload documents to your knowledge base first!", "error");
      return;
    }
    await sendMessage("Suggest 3 key study questions based on the uploaded material.");
  };

  return (
    <div className="bg-white p-4 border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        {/* Quick Action Chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={handleTriggerQuiz}
            disabled={isChatLoading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200 transition-colors whitespace-nowrap shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <GraduationCap className="w-3.5 h-3.5" /> Quiz Me
          </button>
          <button
            type="button"
            onClick={handleTriggerSuggestions}
            disabled={isChatLoading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-xs font-semibold border border-purple-200 transition-colors whitespace-nowrap shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <Lightbulb className="w-3.5 h-3.5" /> Suggest Questions
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask for notes, summaries, formulas, or academic explanations..."
            disabled={isChatLoading}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block py-3.5 pl-4 pr-24 shadow-sm outline-none transition-all placeholder:text-slate-400 disabled:bg-slate-100"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {isSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                }`}
                title={isListening ? "Listening... click to stop" : "Voice typing"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            <button
              type="submit"
              disabled={!inputText.trim() || isChatLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl p-2.5 transition-colors shadow-sm shadow-blue-600/30 cursor-pointer"
            >
              {isChatLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
