import { LucideIcon } from 'lucide-react';

export enum BlockType {
  TABLE = 'TABLE',
  LIST = 'LIST',
  KEY_VALUE = 'KEY_VALUE',
  FLOW = 'FLOW',
  BADGE = 'BADGE'
}

export interface ContentItem {
  label: string;
  value?: string;
  subItems?: string[];
  highlight?: boolean;
}

export interface CheatsheetBlock {
  title: string;
  type: BlockType;
  content: ContentItem[] | string[];
  badge?: string; // e.g., "Eventual Consistency"
  badgeColor?: 'yellow' | 'red' | 'blue' | 'green' | 'orange' | 'purple';
}

export type ZoneType = 'Edge' | 'Compute' | 'Data' | 'Async' | 'Observability';

export interface FlowStep {
  id: string;
  title: string;
  subtitle?: string;
  details?: string[];
  tags?: string[];
  icon?: LucideIcon;
  zone?: ZoneType;
  connector?: 'solid' | 'dashed';
  alert?: string; // For edge cases like "Circuit Breaker"
}

export interface ColumnData {
  id: string;
  title: string;
  colorTheme: 'blue' | 'green' | 'orange' | 'purple';
  blocks?: CheatsheetBlock[];
  flowSteps?: FlowStep[]; // Specific for Column 2
}