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
  const IconComponent = ICON_MAP[name] || FileText;
  return <IconComponent className={className} style={style} />;
};
