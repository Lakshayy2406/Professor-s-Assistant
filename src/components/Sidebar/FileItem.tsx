import React from 'react';
import { UploadedFile } from '../../types';
import { FileText, FileCode, Sparkles, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FileItemProps {
  file: UploadedFile;
}

export const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const { deleteFile, summarizeFile } = useApp();
  const isPdf = file.name.toLowerCase().endsWith('.pdf');

  return (
    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/70 flex items-center gap-3 group hover:border-slate-600 hover:bg-slate-800 transition-all">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isPdf ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
      }`}>
        {isPdf ? <FileText className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-200 truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-[10px] text-slate-400 font-medium">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => summarizeFile(file.name)}
          className="text-slate-400 hover:text-indigo-300 p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          title="Summarize document"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => deleteFile(file.name)}
          className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          title="Remove document"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
