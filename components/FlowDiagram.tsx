import React from 'react';
import { FlowStep, ZoneType } from '../types.ts';
import { ChevronRight, Activity, ArrowRight } from 'lucide-react';

interface Props {
  steps: FlowStep[];
  onZoneClick?: (zone: ZoneType) => void;
}

const zoneConfig: Record<ZoneType, { color: string; bg: string; border: string; text: string }> = {
  Edge: { color: 'blue', bg: 'bg-blue-50/50', border: 'border-blue-200', text: 'text-blue-700' },
  Compute: { color: 'green', bg: 'bg-green-50/50', border: 'border-green-200', text: 'text-green-700' },
  Data: { color: 'orange', bg: 'bg-orange-50/50', border: 'border-orange-200', text: 'text-orange-700' },
  Async: { color: 'purple', bg: 'bg-purple-50/50', border: 'border-purple-200', text: 'text-purple-700' },
  Observability: { color: 'slate', bg: 'bg-slate-100/50', border: 'border-slate-300', text: 'text-slate-600' },
};

const FlowDiagram: React.FC<Props> = ({ steps, onZoneClick }) => {
  // Group steps by Zone
  const zones: ZoneType[] = ['Edge', 'Compute', 'Data', 'Async', 'Observability'];
  
  const getZoneSteps = (zone: ZoneType) => steps.filter(s => s.zone === zone);

  return (
    <div className="w-full">
      {/* Added pt-4 to provide space for the absolute positioned labels (-top-3) so they aren't clipped */}
      <div className="w-full overflow-x-auto pb-2 no-scrollbar pt-4">
        <div className="flex gap-4 min-w-[1000px] lg:min-w-full px-1">
          
          {zones.map((zone, zIdx) => {
             const zoneSteps = getZoneSteps(zone);
             if (zoneSteps.length === 0) return null;
             
             const styles = zoneConfig[zone];
             const isLastZone = zIdx === zones.length - 1;

             return (
               <React.Fragment key={zone}>
                  {/* Zone Container */}
                  <div className={`flex-1 rounded-lg border ${styles.border} ${styles.bg} p-2 flex flex-col relative`}>
                      {/* Zone Label */}
                      <div className={`absolute -top-3 left-3 px-3 py-1 bg-white border-2 ${styles.border} rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.text} shadow-sm z-10 cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 flex items-center gap-1 group`}
                          onClick={() => onZoneClick?.(zone)}>
                          <span>{zone} Layer</span>
                          <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Click for detailed HLD cheatsheet
                          </span>
                      </div>

                      <div className="flex items-stretch gap-2 mt-2 h-full">
                          {zoneSteps.map((step, sIdx) => {
                              const isLastInZone = sIdx === zoneSteps.length - 1;
                              
                              return (
                                  <div key={step.id} className="flex-1 flex items-center min-w-[130px]">
                                      {/* Component Card */}
                                      <div className="w-full h-full bg-white border border-slate-200 rounded shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden group">
                                          
                                          {/* Optional Alert Badge (for failure patterns) */}
                                          {step.alert && (
                                              <div className="bg-red-50 text-red-600 text-[9px] font-bold px-1.5 py-0.5 text-center border-b border-red-100 truncate" title={step.alert}>
                                                  ⚠️ {step.alert}
                                              </div>
                                          )}

                                          <div className="p-2 flex flex-col h-full">
                                              <div className="flex items-center gap-2 mb-1.5">
                                                  {step.icon && <step.icon size={14} className={styles.text} />}
                                                  <div className="min-w-0">
                                                      <h4 className="font-bold text-slate-800 text-xs truncate leading-tight">{step.title}</h4>
                                                      {step.subtitle && <p className="text-[9px] text-slate-400 truncate">{step.subtitle}</p>}
                                                  </div>
                                              </div>
                                              
                                              {/* Details/Tags */}
                                              <div className="mt-auto space-y-1">
                                                  {step.tags && (
                                                      <div className="flex flex-wrap gap-1">
                                                          {step.tags.slice(0, 2).map(tag => (
                                                              <span key={tag} className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded border border-slate-200 truncate max-w-full">
                                                                  {tag}
                                                              </span>
                                                          ))}
                                                      </div>
                                                  )}
                                                  {/* Use details for extra keywords */}
                                                  {step.details && (
                                                      <div className="flex flex-wrap gap-1">
                                                          {step.details.slice(0, 2).map(detail => (
                                                              <span key={detail} className="text-[8px] text-slate-400 truncate block">
                                                                  • {detail}
                                                              </span>
                                                          ))}
                                                      </div>
                                                  )}
                                              </div>
                                          </div>
                                      </div>

                                      {/* Connector within Zone */}
                                      {!isLastInZone && (
                                           <div className="px-1 text-slate-300">
                                              {step.connector === 'dashed' ? (
                                                  <ArrowRight size={14} strokeDasharray="4 4" />
                                              ) : (
                                                  <ArrowRight size={14} />
                                              )}
                                           </div>
                                      )}
                                  </div>
                              );
                          })}
                      </div>
                  </div>

                  {/* Arrow to Next Zone */}
                  {!isLastZone && (
                      <div className="flex items-center justify-center text-slate-300">
                          <ArrowRight size={20} strokeWidth={2.5} />
                      </div>
                  )}
               </React.Fragment>
             );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="px-2 mt-2 flex items-center gap-4 text-[10px] text-slate-500 justify-end">
          <div className="flex items-center gap-1">
             <ArrowRight size={14} />
             <span>Synchronous (Blocking)</span>
          </div>
          <div className="flex items-center gap-1">
             <ArrowRight size={14} strokeDasharray="4 4" />
             <span>Asynchronous / Fire-and-Forget</span>
          </div>
      </div>
    </div>
  );
};

export default FlowDiagram;