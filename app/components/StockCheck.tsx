import React from 'react';
import { Material, Snapshot } from '@/app/types';
import { getCurrentStock } from './utils';

interface StockCheckProps {
  materials: Material[];
  snapshots: Snapshot[];
  onUpdateStock: (materialId: number, currentQuantity: number) => void;
}

export function StockCheck({ materials, snapshots, onUpdateStock }: StockCheckProps) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Update current stock levels. This helps track consumption and trigger reorder alerts.
        </p>
      </div>
      <div className="space-y-3">
        {materials.map(m => {
          const current = getCurrentStock(m.id, snapshots);
          return (
            <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{m.name}</div>
                  <div className="text-sm text-gray-500">Last: {current} {m.unit}</div>
                </div>
                <button
                  onClick={() => onUpdateStock(m.id, current)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
