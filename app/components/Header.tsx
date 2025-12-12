import React from 'react';
import { TabId } from '@/app/types';
import { Icons } from './Icons';

interface HeaderProps {
  activeTab: TabId;
  onAddClick?: () => void;
}

const PAGE_TITLES: Record<TabId, string> = {
  dashboard: 'Dashboard',
  materials: 'Materials',
  suppliers: 'Suppliers',
  purchases: 'Purchases',
  stockcheck: 'Stock Check',
};

export function Header({ activeTab, onAddClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900">{PAGE_TITLES[activeTab]}</h1>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="p-2 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Icons.Plus />
          </button>
        )}
      </div>
    </header>
  );
}
