import React from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle } from 'lucide-react';

export const ConfirmModal: React.FC = () => {
  const { confirmDialog, hideConfirm } = useApp();

  if (!confirmDialog.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform animate-scale-in border border-slate-200">
        <div className="mb-5 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 text-blue-600 mx-auto border border-blue-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Confirmation</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{confirmDialog.message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={hideConfirm}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDialog.onConfirm}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
