import React from 'react';
import { ToolCategory } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Search } from 'lucide-react';

interface CategoryFiltersProps {
  currentLang: Language;
  activeCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  currentLang = 'it',
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  const categories: { id: ToolCategory; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'workflows', label: t.categories.workflows },
    { id: 'organize', label: t.categories.organize },
    { id: 'optimize', label: t.categories.optimize },
    { id: 'convert', label: t.categories.convert },
    { id: 'edit', label: t.categories.edit },
    { id: 'security', label: t.categories.security },
    { id: 'intelligence', label: t.categories.intelligence },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" id="all-tools-section">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-900/10'
                    : 'bg-white/90 backdrop-blur-md text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-400 shadow-xs"
          />
        </div>
      </div>
    </div>
  );
};
