import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useApp } from '../../context/AppContext';
import { Timer, Plus, Minus, RotateCcw, Play, Pause } from 'lucide-react';

export const FocusTimerCard: React.FC = () => {
  const { showToast } = useApp();

  const {
    mode,
    isRunning,
    isEditing,
    manualInput,
    setManualInput,
    displayTime,
    toggleStart,
    reset,
    switchMode,
    adjustTime,
    handleStartEdit,
    handleSaveManualTime
  } = useTimer(() => {
    showToast("⏰ Focus session completed! Great job!", "success");
  });

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-[500px] flex flex-col justify-between">
      <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base mb-2">
        <Timer className="w-5 h-5 text-red-500" /> Focus Pomodoro Timer
      </h3>

      <div className="flex flex-col items-center justify-center py-4 flex-1">
        {/* Time display and +/- buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8">
          <button
            onClick={() => adjustTime(-60)}
            disabled={isRunning}
            className="text-slate-400 hover:text-slate-700 p-2.5 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors"
            title="Decrease 1 min"
          >
            <Minus className="w-5 h-5" />
          </button>

          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onBlur={handleSaveManualTime}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveManualTime();
              }}
              placeholder="25"
              className="text-4xl sm:text-5xl font-mono font-black text-slate-800 text-center w-[10ch] bg-transparent border-b-2 border-blue-500 outline-none tracking-wider"
            />
          ) : (
            <div
              onClick={handleStartEdit}
              title="Click to manually edit duration"
              className="text-4xl sm:text-5xl font-mono font-black text-slate-800 tracking-wider cursor-pointer select-none hover:text-blue-600 transition-colors"
            >
              {displayTime}
            </div>
          )}

          <button
            onClick={() => adjustTime(60)}
            disabled={isRunning}
            className="text-slate-400 hover:text-slate-700 p-2.5 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors"
            title="Increase 1 min"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Start / Pause / Reset buttons */}
        <div className="flex gap-3 w-full max-w-xs mb-6">
          <button
            onClick={toggleStart}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-white text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Start
              </>
            )}
          </button>

          <button
            onClick={reset}
            className="px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl transition-colors flex items-center justify-center"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Mode Selector */}
        <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => switchMode('focus')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'focus'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => switchMode('short')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'short'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('long')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'long'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Long Break (15m)
          </button>
        </div>
      </div>
    </div>
  );
};
