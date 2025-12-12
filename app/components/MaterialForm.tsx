import React, { useState } from 'react';
import { Material } from '@/app/types';

interface MaterialFormProps {
  editItem: Material | null;
  materials: Material[];
  setMaterials: (materials: Material[]) => void;
  onClose: () => void;
}

export function MaterialForm({ editItem, materials, setMaterials, onClose }: MaterialFormProps) {
  const [form, setForm] = useState(editItem || { name: '', unit: 'bags', category: '', reorderLevel: 50 });

  const handleSubmit = () => {
    if (editItem?.id) {
      setMaterials(materials.map(m => m.id === editItem.id ? { ...form, id: editItem.id } : m));
    } else {
      setMaterials([...materials, { ...form, id: Date.now() }]);
    }
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="e.g., Cement"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
        <input
          type="text"
          value={form.unit}
          onChange={e => setForm({ ...form, unit: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="e.g., bags, kg, pieces"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input
          type="text"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="e.g., Binding, Aggregate"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
        <input
          type="number"
          value={form.reorderLevel}
          onChange={e => setForm({ ...form, reorderLevel: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
      >
        {editItem?.id ? 'Update Material' : 'Add Material'}
      </button>
    </div>
  );
}
