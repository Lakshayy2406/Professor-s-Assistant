import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UploadCloud, Loader2 } from 'lucide-react';

export const DropZone: React.FC = () => {
  const { uploadFiles, isProcessingFile } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer group relative bg-slate-800/40 select-none ${
          isDragOver
            ? 'border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/10 scale-[0.99]'
            : 'border-slate-700 hover:border-blue-500/80 hover:bg-slate-800/80'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".pdf,.txt,.md,.json,.csv"
          className="hidden"
          onChange={handleFileChange}
        />

        {isProcessingFile && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm rounded-2xl z-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="text-xs font-semibold text-blue-300">Extracting text...</span>
          </div>
        )}

        <div className="w-12 h-12 bg-slate-850 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-slate-700/60">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-200">Click or drag files here</p>
        <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
          PDF, TXT, MD, CSV, JSON
        </p>
      </div>
    </div>
  );
};
