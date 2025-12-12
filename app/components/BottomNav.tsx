import { TabId } from '@/app/types';
import { Icons } from './Icons';

interface Tab {
  id: TabId;
  label: string;
  icon: () => React.JSX.Element;
}

const TABS: Tab[] = [
  { id: 'dashboard', label: 'Home', icon: Icons.Home },
  { id: 'materials', label: 'Materials', icon: Icons.Package },
  { id: 'suppliers', label: 'Suppliers', icon: Icons.Users },
  { id: 'purchases', label: 'Purchases', icon: Icons.ShoppingCart },
  { id: 'stockcheck', label: 'Stock', icon: Icons.Clipboard },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-md transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              <Icon />
              <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
