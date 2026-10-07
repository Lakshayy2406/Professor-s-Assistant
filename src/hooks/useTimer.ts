import { useState, useEffect, useRef } from 'react';
import { TimerMode } from '../types';
import { playTimerCompletionSound } from '../services/audio';

const MODE_DEFAULTS: Record<TimerMode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

export function useTimer(onComplete?: () => void) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(MODE_DEFAULTS.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [manualInput, setManualInput] = useState<string>('25');

  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playTimerCompletionSound();
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onComplete]);

  const toggleStart = () => {
    if (timeLeft <= 0) {
      setTimeLeft(MODE_DEFAULTS[mode]);
    }
    setIsRunning(prev => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(MODE_DEFAULTS[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODE_DEFAULTS[newMode]);
  };

  const adjustTime = (seconds: number) => {
    if (isRunning) return;
    setTimeLeft(prev => Math.max(60, prev + seconds));
  };

  const handleStartEdit = () => {
    if (isRunning) return;
    setManualInput(String(Math.floor(timeLeft / 60)));
    setIsEditing(true);
  };

  const handleSaveManualTime = () => {
    setIsEditing(false);
    const trimmed = manualInput.trim();
    const parts = trimmed.split(':').map(p => parseInt(p, 10) || 0);

    let totalSeconds = 0;
    if (parts.length === 3) {
      // HH:MM:SS
      totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // MM:SS
      totalSeconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      // Minutes
      totalSeconds = parts[0] * 60;
    }

    if (totalSeconds <= 0) {
      totalSeconds = MODE_DEFAULTS[mode];
    }

    setTimeLeft(totalSeconds);
  };

  const formatDisplayTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return {
    mode,
    timeLeft,
    isRunning,
    isEditing,
    manualInput,
    setManualInput,
    displayTime: formatDisplayTime(timeLeft),
    toggleStart,
    reset,
    switchMode,
    adjustTime,
    handleStartEdit,
    handleSaveManualTime
  };
}
