import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ExternalLink } from 'lucide-react';

interface MapFullscreenModalProps {
  svgContent: string;
}

export const MapFullscreenModal: React.FC<MapFullscreenModalProps> = ({ svgContent }) => {
  const { isMapModalOpen, setIsMapModalOpen } = useApp();

  if (!isMapModalOpen) return null;

  const handleOpenInNewTab = () => {
    if (!svgContent) return;
    const tab = window.open('about:blank', '_blank');
    if (!tab) return;
    tab.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Concept Map Full View</title>
        <style>
          body { 
            margin: 0; 
            padding: 40px; 
            background-color: #f8fafc; 
            display: flex; 
            justify-content: center; 
            min-height: 100vh;
            font-family: system-ui, sans-serif;
          }
          svg { 
            width: auto; 
            height: auto; 
            min-width: 80%; 
            max-width: 95%; 
            background: white; 
            padding: 30px; 
            border-radius: 16px; 
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `);
    tab.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in">
      <div className="w-full max-w-6xl h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-sm sm:text-base">Concept Map Fullscreen</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenInNewTab}
              className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-medium shadow-sm"
              title="Open full page"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
            </button>
            <button
              onClick={() => setIsMapModalOpen(false)}
              className="text-slate-400 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-slate-50/40">
          <div 
            className="w-full max-w-5xl flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:bg-white [&_svg]:p-6 [&_svg]:rounded-2xl [&_svg]:shadow-sm"
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        </div>
      </div>
    </div>
  );
};
