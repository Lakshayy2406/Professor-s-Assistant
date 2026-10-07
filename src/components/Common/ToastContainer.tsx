import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map(toast => {
        const isError = toast.type === 'error';
        const isSuccess = toast.type === 'success';

        let bgClass = 'bg-slate-900 text-white border-slate-700';
        let IconComponent = Info;
        let iconColor = 'text-blue-400';

        if (isError) {
          bgClass = 'bg-red-950 text-red-100 border-red-800';
          IconComponent = AlertCircle;
          iconColor = 'text-red-400';
        } else if (isSuccess) {
          bgClass = 'bg-emerald-950 text-emerald-100 border-emerald-800';
          IconComponent = CheckCircle2;
          iconColor = 'text-emerald-400';
        }

        return (
          <div
            key={toast.id}
            className={`${bgClass} border px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-slide-in pointer-events-auto backdrop-blur-md`}
          >
            <IconComponent className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
