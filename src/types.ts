export type ToolCategory =
  | 'all'
  | 'workflows'
  | 'organize'
  | 'optimize'
  | 'convert'
  | 'edit'
  | 'security'
  | 'intelligence';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  badge?: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
  isImplemented?: boolean;
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl?: string;
  pageCount?: number;
}
