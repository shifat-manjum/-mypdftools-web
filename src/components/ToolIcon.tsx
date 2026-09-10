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

/* =========================================================================
   1. Authentic Microsoft Office Fluent Icons (Preserved Exactly)
   ========================================================================= */

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

/* =========================================================================
   2. Bespoke Meaningful Conversion & PDF Action Icons
   ========================================================================= */

// JPG to PDF: Photo card ➔ arrow ➔ Red PDF document
export const JpgToPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* JPG Photo Card on Left */}
    <rect x="2" y="7" width="12" height="18" rx="2" fill="#F59E0B" />
    <circle cx="5.5" cy="11.5" r="1.5" fill="#FEF3C7" />
    <path d="M4 22L7 17L9.5 20L11 18L13 21H4Z" fill="#FEF3C7" />
    {/* Conversion Arrow in Middle */}
    <path d="M15.5 16H18.5M18.5 16L17 14.2M18.5 16L17 17.8" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* PDF Doc on Right */}
    <rect x="20" y="5" width="10" height="22" rx="2" fill="#DC2626" />
    <path d="M26 5V9H30L26 5Z" fill="#FCA5A5" />
    <rect x="22" y="12" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
    <rect x="22" y="15" width="4.5" height="1.5" rx="0.75" fill="white" opacity="0.75" />
    <rect x="22" y="18" width="5.5" height="1.5" rx="0.75" fill="white" opacity="0.75" />
  </svg>
);

// PDF to JPG: Red PDF document ➔ arrow ➔ Photo card
export const PdfToJpgIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* PDF Doc on Left */}
    <rect x="2" y="5" width="10" height="22" rx="2" fill="#DC2626" />
    <path d="M8 5V9H12L8 5Z" fill="#FCA5A5" />
    <rect x="4" y="12" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
    <rect x="4" y="15" width="4.5" height="1.5" rx="0.75" fill="white" opacity="0.75" />
    {/* Conversion Arrow in Middle */}
    <path d="M13.5 16H16.5M16.5 16L15 14.2M16.5 16L15 17.8" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* JPG Photo Card on Right */}
    <rect x="18" y="7" width="12" height="18" rx="2" fill="#F59E0B" />
    <circle cx="21.5" cy="11.5" r="1.5" fill="#FEF3C7" />
    <path d="M20 22L23 17L25.5 20L27 18L29 21H20Z" fill="#FEF3C7" />
  </svg>
);

// Merge PDF: Two colored documents joining together with plus union
export const MergePdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="11" height="20" rx="2" fill="#3B82F6" />
    <rect x="5.5" y="11" width="6" height="1.5" rx="0.75" fill="white" opacity="0.8" />
    <rect x="5.5" y="14" width="4" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    
    <circle cx="16" cy="16" r="4.5" fill="#0F172A" />
    <path d="M16 13.5V18.5M13.5 16H18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

    <rect x="18" y="6" width="11" height="20" rx="2" fill="#EF4444" />
    <rect x="20.5" y="11" width="6" height="1.5" rx="0.75" fill="white" opacity="0.8" />
    <rect x="20.5" y="14" width="4" height="1.5" rx="0.75" fill="white" opacity="0.6" />
  </svg>
);

// Split PDF: Dotted cut line with two separating halves
export const SplitPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="10" height="20" rx="2" fill="#EF4444" />
    <path d="M8 16L5 16M5 16L7 14M5 16L7 18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

    <line x1="16" y1="4" x2="16" y2="28" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="2 2" />

    <rect x="19" y="6" width="10" height="20" rx="2" fill="#EF4444" />
    <path d="M24 16L27 16M27 16L25 14M27 16L25 18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Compress PDF: Center document with inward compressing arrows
export const CompressPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="6" width="18" height="20" rx="2.5" fill="#10B981" />
    <rect x="11" y="11" width="10" height="1.5" rx="0.75" fill="white" opacity="0.9" />
    <rect x="11" y="14.5" width="7" height="1.5" rx="0.75" fill="white" opacity="0.75" />
    <rect x="11" y="18" width="9" height="1.5" rx="0.75" fill="white" opacity="0.75" />
    <path d="M2 16H6M6 16L4 13.8M6 16L4 18.2" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 16H26M26 16L28 13.8M26 16L28 18.2" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Sign PDF: Document with signature stroke and fountain pen
export const SignPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="4" width="18" height="24" rx="2.5" fill="#F43F5E" />
    <rect x="9" y="8" width="10" height="1.5" rx="0.75" fill="white" opacity="0.85" />
    <rect x="9" y="11.5" width="7" height="1.5" rx="0.75" fill="white" opacity="0.65" />
    <path d="M8 21.5C10 19.5 11.5 22.5 13 20.5C14.5 19 15.5 21.5 18 20.5" stroke="#FEF2F2" strokeWidth="1.6" strokeLinecap="round" />
    <g transform="translate(14, 10)">
      <path d="M12 2L14 4L5 13L2 14L3 11L12 2Z" fill="#FBBF24" />
      <path d="M10.5 3.5L12.5 5.5" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="3.8" cy="12.2" r="0.8" fill="#78350F" />
    </g>
  </svg>
);

// Rotate PDF: Document with 90-degree circular arrow
export const RotatePdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="7" width="14" height="18" rx="2" fill="#EF4444" />
    <path d="M26 16C26 21.5 21.5 26 16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C19.5 6 22.5 7.8 24.3 10.5M24.3 10.5V6.5M24.3 10.5H20.3" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Protect PDF: Document with security padlock
export const ProtectPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="16" height="22" rx="2" fill="#3B82F6" />
    <rect x="7" y="9" width="10" height="1.5" rx="0.75" fill="white" opacity="0.8" />
    <rect x="7" y="12" width="7" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <g transform="translate(14, 13)">
      <rect x="2" y="6" width="11" height="9" rx="2" fill="#1D4ED8" />
      <path d="M4.5 6V4C4.5 2.3 5.8 1 7.5 1C9.2 1 10.5 2.3 10.5 4V6" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7.5" cy="10.5" r="1.2" fill="white" />
    </g>
  </svg>
);

// Unlock PDF: Document with open unlocked key/shackle
export const UnlockPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="16" height="22" rx="2" fill="#06B6D4" />
    <rect x="7" y="9" width="10" height="1.5" rx="0.75" fill="white" opacity="0.8" />
    <rect x="7" y="12" width="7" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <g transform="translate(14, 11)">
      <rect x="2" y="8" width="11" height="9" rx="2" fill="#0891B2" />
      <path d="M4.5 5V3C4.5 1.3 5.8 0 7.5 0C9.2 0 10.5 1.3 10.5 3V4" stroke="#67E8F9" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7.5" cy="12.5" r="1.2" fill="white" />
    </g>
  </svg>
);

// Watermark: Document with translucent diagonal stamp
export const WatermarkIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="20" height="24" rx="2.5" fill="#8B5CF6" />
    <rect x="10" y="8" width="12" height="1.5" rx="0.75" fill="white" opacity="0.5" />
    <rect x="10" y="11" width="8" height="1.5" rx="0.75" fill="white" opacity="0.5" />
    <g transform="rotate(-25 16 16)">
      <rect x="3.5" y="13" width="25" height="6.5" rx="1.5" fill="#DDD6FE" stroke="#4C1D95" strokeWidth="0.8" />
      <text x="16" y="17.8" fill="#4C1D95" fontSize="4.2" fontWeight="900" textAnchor="middle" letterSpacing="0.6">WATERMARK</text>
    </g>
  </svg>
);

// Organize PDF: Reorderable sheets with swap arrows
export const OrganizePdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="9" width="10" height="15" rx="1.5" fill="#EF4444" opacity="0.7" />
    <rect x="18" y="9" width="10" height="15" rx="1.5" fill="#EF4444" />
    <path d="M7 6H23M23 6L20 4M23 6L20 8" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 27H9M9 27L12 25M9 27L12 29" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// PDF to Markdown: Red PDF doc ➔ arrow ➔ Markdown file
export const PdfToMarkdownIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="10" height="20" rx="2" fill="#DC2626" />
    <rect x="4" y="10" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
    <path d="M14 16H17M17 16L15.5 14.2M17 16L15.5 17.8" stroke="#9333EA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="19" y="6" width="11" height="20" rx="2" fill="#9333EA" />
    <text x="24.5" y="17" fill="white" fontSize="7" fontWeight="900" textAnchor="middle">M↓</text>
  </svg>
);

// HTML to PDF: Web browser frame ➔ arrow ➔ PDF
export const HtmlToPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="12" height="18" rx="2" fill="#F59E0B" />
    <line x1="2" y1="11" x2="14" y2="11" stroke="#FEF3C7" strokeWidth="1" />
    <circle cx="4.5" cy="9" r="0.7" fill="white" />
    <circle cx="7" cy="9" r="0.7" fill="white" />
    <path d="M16 16H18.5M18.5 16L17 14.5M18.5 16L17 17.5" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="20" y="5" width="10" height="22" rx="2" fill="#DC2626" />
    <path d="M26 5V9H30L26 5Z" fill="#FCA5A5" />
    <rect x="22" y="12" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
  </svg>
);

// Edit PDF: Document with pen annotation
export const EditPdfIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="4" width="18" height="24" rx="2.5" fill="#9333EA" />
    <rect x="9" y="8" width="10" height="1.5" rx="0.75" fill="white" opacity="0.8" />
    <rect x="9" y="11" width="7" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="9" y="14" width="9" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <g transform="translate(13, 11)">
      <path d="M11.5 2.5L13.5 4.5L5 13L2 14L3 11L11.5 2.5Z" fill="#FBBF24" />
      <path d="M10 4L12 6" stroke="#78350F" strokeWidth="1" />
    </g>
  </svg>
);

// Page Numbers: Document with numbered footer badge
export const PageNumbersIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-7 h-7', style }) => (
  <svg viewBox="0 0 32 32" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="20" height="24" rx="2.5" fill="#9333EA" />
    <rect x="10" y="8" width="12" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="10" y="11" width="9" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="11" y="20" width="10" height="5" rx="1.5" fill="#F3E8FF" />
    <text x="16" y="24" fill="#6B21A8" fontSize="4.5" fontWeight="900" textAnchor="middle">1 2 3</text>
  </svg>
);

/* =========================================================================
   3. Fallback Map & Universal Dispatcher
   ========================================================================= */

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
  toolId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, toolId, className = 'w-6 h-6', style }) => {
  // 1. Authentic Microsoft Fluent Icons
  if (name === 'MsWord') return <MsWordIcon className={className} style={style} />;
  if (name === 'MsExcel') return <MsExcelIcon className={className} style={style} />;
  if (name === 'MsPowerPoint') return <MsPowerPointIcon className={className} style={style} />;

  // 2. Bespoke Meaningful Icons mapped by Tool ID
  const effectiveId = toolId || name.toLowerCase();

  switch (effectiveId) {
    case 'jpg-to-pdf':
      return <JpgToPdfIcon className={className} style={style} />;
    case 'pdf-to-jpg':
      return <PdfToJpgIcon className={className} style={style} />;
    case 'merge-pdf':
      return <MergePdfIcon className={className} style={style} />;
    case 'split-pdf':
      return <SplitPdfIcon className={className} style={style} />;
    case 'compress-pdf':
      return <CompressPdfIcon className={className} style={style} />;
    case 'sign-pdf':
      return <SignPdfIcon className={className} style={style} />;
    case 'rotate-pdf':
      return <RotatePdfIcon className={className} style={style} />;
    case 'protect-pdf':
      return <ProtectPdfIcon className={className} style={style} />;
    case 'unlock-pdf':
      return <UnlockPdfIcon className={className} style={style} />;
    case 'watermark':
      return <WatermarkIcon className={className} style={style} />;
    case 'organize-pdf':
      return <OrganizePdfIcon className={className} style={style} />;
    case 'pdf-to-markdown':
      return <PdfToMarkdownIcon className={className} style={style} />;
    case 'html-to-pdf':
      return <HtmlToPdfIcon className={className} style={style} />;
    case 'edit-pdf':
      return <EditPdfIcon className={className} style={style} />;
    case 'page-numbers':
      return <PageNumbersIcon className={className} style={style} />;
    default:
      break;
  }

  // 3. Fallback to generic Lucide icon
  const IconComponent = ICON_MAP[name] || FileText;
  return <IconComponent className={className} style={style} />;
};
