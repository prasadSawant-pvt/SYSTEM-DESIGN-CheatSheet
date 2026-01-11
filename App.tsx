import React, { useState } from 'react';
import { 
  COLUMN_1_DATA, 
  COLUMN_2_DATA, 
  COLUMN_3_DATA, 
  COLUMN_4_DATA,
  COLUMN_5_DATA
} from './constants.tsx';
import CheatsheetCard from './components/CheatsheetCard.tsx';
import FlowDiagram from './components/FlowDiagram.tsx';
import HLDCheatsheetOverlay from './components/HLDCheatsheetOverlay.tsx';
import { ColumnData, ZoneType } from './types.ts';
import { Terminal, Activity } from 'lucide-react';

const ColumnWrapper: React.FC<{ data: ColumnData; className?: string }> = ({ data, className }) => {
  const getHeaderColor = () => {
      switch(data.colorTheme) {
          case 'blue': return 'text-blue-700 border-blue-200 bg-blue-50/50';
          case 'green': return 'text-green-700 border-green-200 bg-green-50/50';
          case 'orange': return 'text-orange-700 border-orange-200 bg-orange-50/50';
          case 'purple': return 'text-purple-700 border-purple-200 bg-purple-50/50';
          default: return 'text-slate-700';
      }
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Dense Column Header */}
      <div className={`px-2 py-1.5 border-b border-t rounded-t mb-2 flex items-center justify-between ${getHeaderColor()}`}>
        <h2 className="font-bold text-sm">{data.title}</h2>
        <div className={`w-2 h-2 rounded-full ${data.colorTheme === 'blue' ? 'bg-blue-400' : data.colorTheme === 'orange' ? 'bg-orange-400' : 'bg-purple-400'}`}></div>
      </div>

      {/* Column Content */}
      <div className="flex-1">
        {data.blocks?.map((block, idx) => (
          <CheatsheetCard key={idx} block={block} theme={data.colorTheme} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneType | null>(null);

  const handleZoneClick = (zone: ZoneType) => {
    setSelectedZone(zone);
  };

  const handleCloseOverlay = () => {
    setSelectedZone(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* Compact Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-50 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded text-white">
                <Terminal size={18} />
            </div>
            <div>
                <h1 className="text-lg font-extrabold text-slate-900 leading-none tracking-tight">
                    SYSTEM DESIGN <span className="text-blue-600">CHEATSHEET</span>
                </h1>
            </div>
        </div>
        <div className="hidden md:block text-xs font-medium text-slate-400 uppercase tracking-widest">
            Production Grade Reference
        </div>
      </header>

      <main className="w-full px-2 py-2 space-y-2">
        
        {/* Top: Compact Flow Diagram */}
        <section className="bg-white rounded border border-slate-300 overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity className="text-blue-600" size={16} />
                    <h2 className="font-bold text-sm text-slate-700">Request Flow Hierarchy</h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Click any layer for detailed HLD cheatsheet</span>
                </div>
            </div>
            <div className="p-2 bg-slate-100/50">
                 {COLUMN_2_DATA.flowSteps && <FlowDiagram steps={COLUMN_2_DATA.flowSteps} onZoneClick={handleZoneClick} />}
            </div>
        </section>

        {/* Bottom: 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-start">
            <ColumnWrapper data={COLUMN_1_DATA} />
            <ColumnWrapper data={COLUMN_5_DATA} />
            <ColumnWrapper data={COLUMN_3_DATA} />
            <ColumnWrapper data={COLUMN_4_DATA} />
        </div>

      </main>
      
      {/* HLD Overlay */}
      <HLDCheatsheetOverlay 
        isOpen={!!selectedZone}
        onClose={handleCloseOverlay}
        zone={selectedZone}
      />
      
      {/* Minimal Footer */}
      <footer className="text-center text-slate-400 text-[10px] py-4">
        <p>System Design Reference • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;