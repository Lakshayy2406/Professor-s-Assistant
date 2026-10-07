import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  TabType, 
  ChatMessage, 
  ChatSession, 
  ScheduleEvent, 
  Flashcard, 
  UploadedFile, 
  ToastItem, 
  ToastType 
} from '../types';
import { handleAcademicChat, generateFileSummary } from '../services/gemini';
import { parseFileContent } from '../services/pdf';

interface ConfirmDialogState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

interface AppContextType {
  // Navigation
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  isSidebarOpenMobile: boolean;
  setIsSidebarOpenMobile: (open: boolean) => void;

  // File Management
  files: UploadedFile[];
  isProcessingFile: boolean;
  contextData: string;
  uploadFiles: (fileList: FileList | File[]) => Promise<void>;
  deleteFile: (fileName: string) => void;
  clearAllFiles: () => void;
  summarizeFile: (fileName: string) => Promise<void>;

  // Chat Management
  currentMessages: ChatMessage[];
  chatHistory: ChatSession[];
  currentSessionId: number;
  isChatLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  startNewChat: () => void;
  loadChatSession: (id: number) => void;
  deleteChatSession: (id: number) => void;
  clearAllChatHistory: () => void;

  // Schedule Management
  events: ScheduleEvent[];
  addEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  deleteEvent: (id: number) => void;

  // Study Tools
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  mermaidCode: string;
  setMermaidCode: (code: string) => void;
  quickNotes: string;
  setQuickNotes: (notes: string) => void;

  // Modals & Dialogs
  confirmDialog: ConfirmDialogState;
  showConfirm: (message: string, onConfirm: () => void) => void;
  hideConfirm: () => void;
  isHistoryModalOpen: boolean;
  setIsHistoryModalOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  text: `Hello. I am your **Strict Study Assistant**.\n\nI am designed to provide study materials, notes, and educational explanations **ONLY**. I do not engage in casual conversation, greetings, or off-topic discussions.\n\n*Please upload your course documents to begin studying.*`,
  timestamp: Date.now()
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentTab, setCurrentTab] = useState<TabType>('chat');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);

  // Files & Context
  const [files, setFiles] = useState<UploadedFile[]>(() => {
    const saved = localStorage.getItem('app_files');
    return saved ? JSON.parse(saved) : [];
  });
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);

  // Derive contextData
  const contextData = files.map(f => `\n\n--- FILE: ${f.name} ---\n${f.text}`).join('');

  useEffect(() => {
    // We only save file metadata + text up to storage quota
    try {
      localStorage.setItem('app_files', JSON.stringify(files));
    } catch (e) {
      console.warn("Storage quota exceeded for files", e);
    }
  }, [files]);

  // Chat
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState<number>(Date.now());
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } catch (e) {
      console.warn("Storage quota exceeded for chat history", e);
    }
  }, [chatHistory]);

  // Schedule Events
  const [events, setEvents] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Study Tools
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [mermaidCode, setMermaidCode] = useState<string>('');
  const [quickNotes, setQuickNotes] = useState<string>(() => {
    return localStorage.getItem('quick_notes') || '';
  });

  useEffect(() => {
    localStorage.setItem('quick_notes', quickNotes);
  }, [quickNotes]);

  // Modals & Toasts
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      message,
      onConfirm: () => {
        onConfirm();
        hideConfirm();
      }
    });
  };

  const hideConfirm = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

  // Upload handler
  const uploadFiles = async (fileList: FileList | File[]) => {
    setIsProcessingFile(true);
    let count = 0;
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (files.some(f => f.name === file.name)) {
        continue;
      }

      try {
        const text = await parseFileContent(file);
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type || 'document',
          text
        });
        count++;
      } catch (err: any) {
        console.error(err);
        showToast(`Failed to parse ${file.name}: ${err.message || 'Unknown error'}`, 'error');
      }
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      showToast(`${count} file(s) added to knowledge base.`, 'success');
    } else if (count === 0 && fileList.length > 0) {
      showToast("Files already present or invalid.", 'info');
    }
    setIsProcessingFile(false);
  };

  const deleteFile = (fileName: string) => {
    showConfirm(`Remove "${fileName}" from knowledge base?`, () => {
      setFiles(prev => prev.filter(f => f.name !== fileName));
      showToast(`Removed "${fileName}".`, 'success');
    });
  };

  const clearAllFiles = () => {
    if (files.length === 0) {
      showToast("No files to clear.", 'info');
      return;
    }
    showConfirm("Remove ALL files from knowledge base?", () => {
      setFiles([]);
      setFlashcards([]);
      setMermaidCode('');
      showToast("All files cleared.", 'success');
    });
  };

  const saveCurrentSession = (messages: ChatMessage[]) => {
    const userMsgs = messages.filter(m => m.role === 'user');
    if (userMsgs.length === 0) return;

    const firstUserText = userMsgs[0]?.text || "Study Session";
    const sessionData: ChatSession = {
      id: currentSessionId,
      title: firstUserText.length > 40 ? firstUserText.substring(0, 40) + '...' : firstUserText,
      date: new Date().toISOString(),
      messages
    };

    setChatHistory(prev => {
      const idx = prev.findIndex(s => s.id === currentSessionId);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = sessionData;
        return updated;
      }
      return [sessionData, ...prev];
    });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      text: text.trim(),
      timestamp: Date.now()
    };

    const updatedMessages = [...currentMessages, userMsg];
    setCurrentMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      const responseText = await handleAcademicChat(text, contextData);
      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: responseText,
        timestamp: Date.now()
      };
      const finalMessages = [...updatedMessages, botMsg];
      setCurrentMessages(finalMessages);
      saveCurrentSession(finalMessages);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: `**Error:** ${err.message || 'Could not connect to Gemini API. Please verify your API key.'}`,
        timestamp: Date.now()
      };
      const finalMessages = [...updatedMessages, errorMsg];
      setCurrentMessages(finalMessages);
      saveCurrentSession(finalMessages);
    } finally {
      setIsChatLoading(false);
    }
  };

  const summarizeFile = async (fileName: string) => {
    const file = files.find(f => f.name === fileName);
    if (!file) return;

    setCurrentTab('chat');
    setIsChatLoading(true);

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      text: `Summarize ${fileName}`,
      timestamp: Date.now()
    };
    const updatedMessages = [...currentMessages, userMsg];
    setCurrentMessages(updatedMessages);

    try {
      const summary = await generateFileSummary(fileName, file.text);
      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: `### 📄 Summary: **${fileName}**\n\n${summary}`,
        timestamp: Date.now()
      };
      const finalMessages = [...updatedMessages, botMsg];
      setCurrentMessages(finalMessages);
      saveCurrentSession(finalMessages);
    } catch (err: any) {
      showToast("Failed to summarize file: " + err.message, 'error');
    } finally {
      setIsChatLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentSessionId(Date.now());
    setCurrentMessages([INITIAL_WELCOME_MESSAGE]);
    showToast("Started a new conversation.", 'info');
  };

  const loadChatSession = (id: number) => {
    const session = chatHistory.find(s => s.id === id);
    if (!session) return;

    setCurrentSessionId(session.id);
    setCurrentMessages(session.messages);
    setIsHistoryModalOpen(false);
    showToast("Restored chat session.", 'success');
  };

  const deleteChatSession = (id: number) => {
    showConfirm("Delete this conversation from history?", () => {
      setChatHistory(prev => prev.filter(s => s.id !== id));
      if (currentSessionId === id) {
        startNewChat();
      }
      showToast("Conversation deleted.", 'info');
    });
  };

  const clearAllChatHistory = () => {
    if (chatHistory.length === 0) return;
    showConfirm("Delete ALL saved conversations?", () => {
      setChatHistory([]);
      startNewChat();
      setIsHistoryModalOpen(false);
      showToast("Chat history cleared.", 'success');
    });
  };

  const addEvent = (eventData: Omit<ScheduleEvent, 'id'>) => {
    const newEvent: ScheduleEvent = {
      ...eventData,
      id: Date.now()
    };
    setEvents(prev => [...prev, newEvent]);
    showToast("Event scheduled successfully!", 'success');
  };

  const deleteEvent = (id: number) => {
    showConfirm("Delete this event?", () => {
      setEvents(prev => prev.filter(e => e.id !== id));
      showToast("Event removed.", 'info');
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        isSidebarOpenMobile,
        setIsSidebarOpenMobile,
        files,
        isProcessingFile,
        contextData,
        uploadFiles,
        deleteFile,
        clearAllFiles,
        summarizeFile,
        currentMessages,
        chatHistory,
        currentSessionId,
        isChatLoading,
        sendMessage,
        startNewChat,
        loadChatSession,
        deleteChatSession,
        clearAllChatHistory,
        events,
        addEvent,
        deleteEvent,
        flashcards,
        setFlashcards,
        mermaidCode,
        setMermaidCode,
        quickNotes,
        setQuickNotes,
        confirmDialog,
        showConfirm,
        hideConfirm,
        isHistoryModalOpen,
        setIsHistoryModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isMapModalOpen,
        setIsMapModalOpen,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
