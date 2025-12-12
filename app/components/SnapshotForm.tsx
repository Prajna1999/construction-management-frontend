import React, { useState } from 'react';
import { Material, Snapshot } from '@/app/types';

interface SnapshotFormProps {
  editItem: { materialId: number; quantity: number } | null;
  materials: Material[];
  snapshots: Snapshot[];
  setSnapshots: (snapshots: Snapshot[]) => void;
  onClose: () => void;
}

export function SnapshotForm({ editItem, materials, snapshots, setSnapshots, onClose }: SnapshotFormProps) {
  const material = materials.find(m => m.id === editItem?.materialId);
  const [quantity, setQuantity] = useState(editItem?.quantity || 0);

  const handleSubmit = () => {
    if (!editItem) return;

    setSnapshots([...snapshots, {
      id: Date.now(),
      materialId: editItem.materialId,
      quantity: parseFloat(quantity.toString()),
      date: new Date().toISOString().split('T')[0],
    }]);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="text-lg font-medium text-gray-900">{material?.name}</div>
        <div className="text-sm text-gray-500">Current stock on hand</div>
      </div>
      <div>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-3 text-2xl text-center border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
        />
        <div className="text-center text-sm text-gray-500 mt-1">{material?.unit}</div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
      >
        Save Stock Count
      </button>
    </div>
  );
}
