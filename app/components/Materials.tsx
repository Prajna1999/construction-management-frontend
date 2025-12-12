import { Material } from '@/app/types';
import { Icons } from './Icons';
import { EmptyState } from './EmptyState';

interface MaterialsProps {
  materials: Material[];
  onEdit: (material: Material) => void;
}

export function Materials({ materials, onEdit }: MaterialsProps) {
  if (materials.length === 0) {
    return (
      <EmptyState
        icon={Icons.Package}
        title="No materials added"
        description="Add materials to start tracking your construction inventory. Include details like units, categories, and reorder levels."
      />
    );
  }

  return (
    <div className="space-y-3">
      {materials.map(m => (
        <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium text-gray-900">{m.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                {m.category} • {m.unit}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Reorder level: {m.reorderLevel} {m.unit}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(m)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Icons.Edit />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
