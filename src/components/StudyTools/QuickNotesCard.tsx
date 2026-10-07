import React from 'react';
import { useApp } from '../../context/AppContext';
import { StickyNote, Check } from 'lucide-react';

export const QuickNotesCard: React.FC = () => {
  const { quickNotes, setQuickNotes } = useApp();

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
          <StickyNote className="w-5 h-5 text-amber-500" /> Quick Notes & Scratchpad
        </h3>
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-emerald-500" /> Auto-saved
        </span>
      </div>

      <textarea
        value={quickNotes}
        onChange={(e) => setQuickNotes(e.target.value)}
        placeholder="Jot down quick thoughts, formulas, or reminders here..."
        className="flex-1 w-full bg-amber-50/50 border border-amber-200/60 resize-none p-4 rounded-2xl text-sm text-slate-800 focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none placeholder:text-amber-400/60 leading-relaxed font-sans shadow-inner"
      />
    </div>
  );
};
