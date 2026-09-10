import React from 'react';
import {
  Layers,
  Scissors,
  Minimize2,
  FileText,
  Presentation,
  Sheet,
  FileCheck,
  Film,
  Table,
  PenTool,
  Image,
  FileImage,
  PenSquare,
  Stamp,
  RotateCw,
  Globe,
  Unlock,
  ShieldCheck,
  ArrowDownUp,
  Archive,
  Wrench,
  Hash,
  ScanLine,
  ScanText,
  GitCompare,
  EyeOff,
  Crop,
  CheckSquare,
  Sparkles,
  Languages,
  FileCode,
  LucideProps,
} from 'lucide-react';

/* Authentic Microsoft Office Fluent Icons */
export const MsWordIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = 'w-6 h-6',
  style,
}) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="3" width="18" height="26" rx="3" fill="#185ABD" />
    <path opacity="0.3" d="M17 3H22.5C23.88 3 25 4.12 25 5.5V11L17 3Z" fill="white" />
    <rect x="13" y="10" width="8" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="13" y="13.5" width="8" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="13" y="17" width="8" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="13" y="20.5" width="5.5" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="3" y="7" width="14" height="18" rx="2.5" fill="#0F3B82" opacity="0.25" />
    <rect x="3" y="6" width="14" height="18" rx="2.5" fill="#2B7CD3" />
    <path
      d="M5.5 10.5H7.2L8.6 16.3L9.9 10.5H11.2L12.5 16.3L13.9 10.5H15.5L13.6 18.5H12.1L10.6 13.2L9 18.5H7.5L5.5 10.5Z"
      fill="white"
    />
  </svg>
);

export const MsExcelIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = 'w-6 h-6',
  style,
}) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="3" width="18" height="26" rx="3" fill="#107C41" />
    <path opacity="0.3" d="M17 3H22.5C23.88 3 25 4.12 25 5.5V11L17 3Z" fill="white" />
    <rect x="13" y="10" width="3.8" height="2.8" rx="0.5" fill="white" opacity="0.65" />
    <rect x="18" y="10" width="3.8" height="2.8" rx="0.5" fill="white" opacity="0.65" />
    <rect x="13" y="14" width="3.8" height="2.8" rx="0.5" fill="white" opacity="0.65" />
    <rect x="18" y="14" width="3.8" height="2.8" rx="0.5" fill="white" opacity="0.65" />
    <rect x="13" y="18" width="3.8" height="2.8" rx="0.5" fill="white" opacity="0.65" />
    <rect x="18" y="18" width="3.8" height="2.8" rx="0.5" fill="white" opacity="0.65" />
    <rect x="3" y="7" width="14" height="18" rx="2.5" fill="#0A4D27" opacity="0.25" />
    <rect x="3" y="6" width="14" height="18" rx="2.5" fill="#185C37" />
    <path
      d="M6 10.5H7.9L9.7 13.8L11.5 10.5H13.4L10.8 14.5L13.5 18.5H11.6L9.7 15.2L7.7 18.5H5.8L8.6 14.5L6 10.5Z"
      fill="white"
    />
  </svg>
);

export const MsPowerPointIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = 'w-6 h-6',
  style,
}) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="3" width="18" height="26" rx="3" fill="#C43E1C" />
    <path opacity="0.3" d="M17 3H22.5C23.88 3 25 4.12 25 5.5V11L17 3Z" fill="white" />
    <circle cx="17.5" cy="16" r="4.5" stroke="white" strokeWidth="1.5" opacity="0.6" fill="none" />
    <path d="M17.5 11.5V16H22" stroke="white" strokeWidth="1.5" opacity="0.8" />
    <rect x="3" y="7" width="14" height="18" rx="2.5" fill="#7D240E" opacity="0.25" />
    <rect x="3" y="6" width="14" height="18" rx="2.5" fill="#D83B01" />
    <path
      d="M6.5 10.5H10.4C11.9 10.5 13 11.4 13 12.8C13 14.2 11.9 15.1 10.4 15.1H8.5V18.5H6.5V10.5ZM8.5 13.4H10.2C10.9 13.4 11.3 13.1 11.3 12.8C11.3 12.5 10.9 12.2 10.2 12.2H8.5V13.4Z"
      fill="white"
    />
  </svg>
);

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Layers,
  Scissors,
  Minimize2,
  FileText,
  Presentation,
  Sheet,
  FileCheck,
  Film,
  Table,
  PenTool,
  Image,
  FileImage,
  PenSquare,
  Stamp,
  RotateCw,
  Globe,
  Unlock,
  ShieldCheck,
  ArrowDownUp,
  Archive,
  Wrench,
  Hash,
  ScanLine,
  ScanText,
  GitCompare,
  EyeOff,
  Crop,
  CheckSquare,
  Sparkles,
  Languages,
  FileCode,
};

interface ToolIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className, style }) => {
  if (name === 'MsWord') return <MsWordIcon className={className} style={style} />;
  if (name === 'MsExcel') return <MsExcelIcon className={className} style={style} />;
  if (name === 'MsPowerPoint') return <MsPowerPointIcon className={className} style={style} />;

  const IconComponent = ICON_MAP[name] || FileText;
  return <IconComponent className={className} style={style} />;
};
