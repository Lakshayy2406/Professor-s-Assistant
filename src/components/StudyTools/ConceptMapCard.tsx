import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { generateMermaidCode } from '../../services/gemini';
import mermaid from 'mermaid';
import { 
  Network, 
  Sparkles, 
  Loader2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw 
} from 'lucide-react';
import { MapFullscreenModal } from '../Modals/MapFullscreenModal';

// Initialize Mermaid with clean styling
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#eff6ff',
    primaryTextColor: '#1e293b',
    primaryBorderColor: '#3b82f6',
    lineColor: '#64748b',
    secondaryColor: '#f8fafc',
    tertiaryColor: '#ffffff'
  },
  flowchart: {
    curve: 'linear',
    useMaxWidth: true
  }
});

export const ConceptMapCard: React.FC = () => {
  const { mermaidCode, setMermaidCode, contextData, showToast, setIsMapModalOpen } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [svgOutput, setSvgOutput] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mermaidCode) {
      setSvgOutput('');
      return;
    }

    const renderChart = async () => {
      try {
        const id = `mermaid-svg-${Date.now()}`;
        const { svg } = await mermaid.render(id, mermaidCode);
        setSvgOutput(svg);
      } catch (err) {
        console.error("Mermaid render error:", err);
        setSvgOutput(`<div class="text-xs text-red-500 font-semibold p-4 text-center">Failed to render diagram syntax.</div>`);
      }
    };

    renderChart();
  }, [mermaidCode]);

  const handleGenerate = async () => {
    if (!contextData) {
      showToast("Upload documents to your knowledge base first!", "error");
      return;
    }

    setIsGenerating(true);
    try {
      const code = await generateMermaidCode(contextData);
      setMermaidCode(code);
      setZoomLevel(1);
      showToast("Concept map generated!", "success");
    } catch (err: any) {
      showToast("Failed to generate map: " + err.message, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.max(0.2, Math.min(3, prev + delta)));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-[500px] relative group">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
            <Network className="w-5 h-5 text-purple-600" /> AI Concept Map
          </h3>
          <div className="flex items-center gap-2">
            {svgOutput && (
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-xl transition-colors font-semibold flex items-center gap-1 cursor-pointer"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
              </button>
            )}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3.5 py-1.5 rounded-xl transition-colors font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Map Diagram Viewport */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
          <div
            ref={containerRef}
            className="w-full h-full overflow-auto flex items-center justify-center p-4"
          >
            {svgOutput ? (
              <div
                style={{ transform: `scale(${zoomLevel})` }}
                className="transition-transform duration-150 ease-out origin-center cursor-zoom-in [&_svg]:max-w-none"
                onClick={() => setIsMapModalOpen(true)}
                title="Click to view full screen"
                dangerouslySetInnerHTML={{ __html: svgOutput }}
              />
            ) : (
              <div className="text-center text-slate-400 p-6 flex flex-col items-center">
                <Network className="w-10 h-10 mb-2 opacity-50 stroke-1 text-slate-400" />
                <p className="text-sm font-semibold text-slate-600">No Concept Map</p>
                <p className="text-xs text-slate-400 mt-1">Upload study materials and click "Generate".</p>
              </div>
            )}
          </div>

          {/* Floating Zoom Controls */}
          {svgOutput && (
            <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-slate-200 opacity-90 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(0.15);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetZoom();
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom(-0.15);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <MapFullscreenModal svgContent={svgOutput} />
    </>
  );
};
