import React, { useEffect } from 'react';
import { ToolItem } from '../types';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';

import { JpgToPdfTool } from '../tools/JpgToPdfTool';
import { PdfToJpgTool } from '../tools/PdfToJpgTool';
import { MergePdfTool } from '../tools/MergePdfTool';
import { SplitPdfTool } from '../tools/SplitPdfTool';
import { RotatePdfTool } from '../tools/RotatePdfTool';
import { OrganizePdfTool } from '../tools/OrganizePdfTool';
import { WatermarkPdfTool } from '../tools/WatermarkPdfTool';
import { PageNumbersTool } from '../tools/PageNumbersTool';
import { ProtectPdfTool } from '../tools/ProtectPdfTool';
import { SignPdfTool } from '../tools/SignPdfTool';
import { PdfToMarkdownTool } from '../tools/PdfToMarkdownTool';
import { GenericPdfTool } from '../tools/GenericPdfTool';

interface ToolModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tool) return null;

  const IconComponent = (Icons as any)[tool.iconName] || Icons.FileText;

  const renderToolBody = () => {
    switch (tool.id) {
      case 'jpg-to-pdf':
        return <JpgToPdfTool />;
      case 'pdf-to-jpg':
        return <PdfToJpgTool />;
      case 'merge-pdf':
        return <MergePdfTool />;
      case 'split-pdf':
        return <SplitPdfTool />;
      case 'rotate-pdf':
        return <RotatePdfTool />;
      case 'organize-pdf':
        return <OrganizePdfTool />;
      case 'watermark':
        return <WatermarkPdfTool />;
      case 'page-numbers':
        return <PageNumbersTool />;
      case 'protect-pdf':
        return <ProtectPdfTool mode="protect" />;
      case 'unlock-pdf':
        return <ProtectPdfTool mode="unlock" />;
      case 'sign-pdf':
        return <SignPdfTool />;
      case 'pdf-to-markdown':
        return <PdfToMarkdownTool />;
      default:
        return <GenericPdfTool tool={tool} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.iconBg}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">{tool.title}</h3>
                {tool.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{tool.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">{renderToolBody()}</div>
      </div>
    </div>
  );
};

