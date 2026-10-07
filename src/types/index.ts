export type TabType = 'chat' | 'schedule' | 'tools';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: number;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export type EventType = 'Lecture' | 'Assignment' | 'Exam';

export interface ScheduleEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  type: EventType;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  text: string;
}

export type TimerMode = 'focus' | 'short' | 'long';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}
