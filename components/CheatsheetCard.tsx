import React from 'react';
import { CheatsheetBlock, ContentItem } from '../types.ts';
import { AlertTriangle } from 'lucide-react';

interface Props {
  block: CheatsheetBlock;
  theme: string;
}

const CheatsheetCard: React.FC<Props> = ({ block, theme }) => {
  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 text-red-700 border-red-100';
      case 'yellow': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'green': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'blue': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getThemeBorder = () => {
    switch(theme) {
        case 'blue': return 'border-l-blue-500';
        case 'green': return 'border-l-green-500';
        case 'orange': return 'border-l-orange-500';
        case 'purple': return 'border-l-purple-500';
        default: return 'border-l-slate-400';
    }
  }

  return (
    <div className={`bg-white rounded border border-slate-200 shadow-sm p-3 mb-2 border-l-[3px] ${getThemeBorder()} hover:shadow transition-shadow break-inside-avoid`}>
      <div className="flex justify-between items-center mb-1.5 gap-2">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-tight truncate">{block.title}</h3>
        {block.badge && (
          <span className={`text-[9px] font-bold px-1.5 py-px rounded border flex items-center gap-1 shrink-0 ${getBadgeColor(block.badgeColor || 'gray')}`}>
            {block.badgeColor === 'red' && <AlertTriangle size={8} />}
            {block.badge}
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        {block.content.map((item, idx) => {
            const cItem = item as ContentItem;
            return (
              <div key={idx} className="flex justify-between items-baseline text-[11px] leading-4 border-b border-slate-50 last:border-0 py-0.5">
                <span className="font-medium text-slate-600 mr-2 truncate">{cItem.label}</span>
                <span className="text-slate-900 text-right font-mono bg-slate-50 px-1 rounded text-[10px] shrink-0">
                  {cItem.value}
                </span>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default CheatsheetCard;