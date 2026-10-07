import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateFlashcardsData } from '../../services/gemini';
import { Layers, ChevronLeft, ChevronRight, Sparkles, Loader2, RefreshCw } from 'lucide-react';

export const FlashcardsCard: React.FC = () => {
  const { flashcards, setFlashcards, contextData, showToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!contextData) {
      showToast("Upload documents to your knowledge base first!", "error");
      return;
    }

    setIsGenerating(true);
    try {
      const cards = await generateFlashcardsData(contextData);
      setFlashcards(cards);
      setCurrentIndex(0);
      setIsFlipped(false);
      showToast(`${cards.length} flashcards generated!`, "success");
    } catch (err: any) {
      showToast("Failed to generate flashcards: " + err.message, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
          <Layers className="w-5 h-5 text-blue-600" /> AI Flashcards
        </h3>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3.5 py-1.5 rounded-xl transition-colors font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" /> Generate from Files
            </>
          )}
        </button>
      </div>

      {/* Card Content / Flip Area */}
      <div className="flex-1 relative perspective-1000 w-full h-full flex items-center justify-center bg-slate-50/70 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden select-none p-4">
        {flashcards.length === 0 ? (
          <div className="text-center text-slate-400 p-6 flex flex-col items-center">
            <Layers className="w-10 h-10 mb-2 opacity-50 stroke-1 text-slate-400" />
            <p className="text-sm font-semibold text-slate-600">No Flashcards yet</p>
            <p className="text-xs text-slate-400 mt-1">Upload study documents and click "Generate from Files".</p>
          </div>
        ) : (
          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="relative w-full h-full cursor-pointer perspective-1000 group"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-all ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front (Question) */}
              <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center p-8 text-center backface-hidden">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                  Question
                </span>
                <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed overflow-y-auto max-h-[70%]">
                  {currentCard.front}
                </p>
                <span className="text-[11px] text-slate-400 font-medium absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Click card to flip
                </span>
              </div>

              {/* Back (Answer) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-blue-700 to-blue-600 rounded-2xl shadow-md flex flex-col items-center justify-center p-8 text-center backface-hidden rotate-y-180 text-white">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-3">
                  Answer
                </span>
                <p className="text-base sm:text-lg font-medium leading-relaxed overflow-y-auto max-h-[70%] text-white">
                  {currentCard.back}
                </p>
                <span className="text-[11px] text-blue-200 font-medium absolute bottom-4 left-0 right-0">
                  Click card to flip back
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {flashcards.length > 0 && (
        <div className="mt-4 flex justify-center gap-6 items-center">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            title="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-slate-600 font-mono">
            {currentIndex + 1} / {flashcards.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            title="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
