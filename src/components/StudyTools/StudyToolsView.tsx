import React from 'react';
import { FlashcardsCard } from './FlashcardsCard';
import { FocusTimerCard } from './FocusTimerCard';
import { ConceptMapCard } from './ConceptMapCard';
import { QuickNotesCard } from './QuickNotesCard';

export const StudyToolsView: React.FC = () => {
  return (
    <div className="flex-1 flex-col h-full overflow-y-auto p-4 sm:p-8 animate-fade-in bg-slate-50">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Study Tools</h2>
            <p className="text-slate-500 text-sm mt-0.5">Boost your focus, retention, and visual conceptual mapping.</p>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlashcardsCard />
          <FocusTimerCard />
          <ConceptMapCard />
          <QuickNotesCard />
        </div>
      </div>
    </div>
  );
};
