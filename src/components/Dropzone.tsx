import React, { useState, useRef } from 'react';
import { UploadCloud, Plus, Trash2, GripVertical, FileText, Image as ImageIcon } from 'lucide-react';
import { UploadedFile } from '../types';

interface DropzoneProps {
  accept: string;
  multiple?: boolean;
  buttonLabel?: string;
  helperText?: string;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  showPreviewList?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  accept,
  multiple = true,
  buttonLabel = 'Select files',
  helperText = 'or drop files here',
  files,
  onFilesChange,
  showPreviewList = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileListArray = Array.from(newFiles);
    const mapped: UploadedFile[] = fileListArray.map((f) => {
      const isImg = f.type.startsWith('image/');
      return {
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        name: f.name,
        size: f.size,
        previewUrl: isImg ? URL.createObjectURL(f) : undefined,
      };
    });

    if (multiple) {
      onFilesChange([...files, ...mapped]);
    } else {
      onFilesChange(mapped.slice(0, 1));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          processFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {files.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#e5322d] bg-red-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-[#e5322d] bg-gray-50/70 hover:bg-red-50/20'
          }`}
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-[#e5322d] mb-4 shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>

          <button
            type="button"
            className="px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white text-base font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all transform active:scale-95 inline-flex items-center gap-2"
          >
            <span>{buttonLabel}</span>
          </button>

          <p className="mt-3 text-sm text-gray-500 font-medium">{helperText}</p>
        </div>
      ) : (
        <div>
          {/* File grid preview */}
          {showPreviewList && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {files.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <button
                    type="button"
                    onClick={(e) => handleRemove(item.id, e)}
                    className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-red-500 hover:text-white text-gray-400 rounded-full shadow-sm transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center mb-2 border border-gray-100">
                    {item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-10 h-10 text-red-500" />
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    File #{idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-gray-800 truncate w-full" title={item.name}>
                    {item.name}
                  </p>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    {formatSize(item.size)}
                  </span>
                </div>
              ))}

              {/* Add more files button */}
              {multiple && (
                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-[#e5322d] hover:bg-red-50/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[140px]"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-2">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">Add more</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

