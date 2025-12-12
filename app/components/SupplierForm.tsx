import React, { useState } from 'react';
import { Supplier } from '@/app/types';

interface SupplierFormProps {
  editItem: Supplier | null;
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;
  onClose: () => void;
}

export function SupplierForm({ editItem, suppliers, setSuppliers, onClose }: SupplierFormProps) {
  const [form, setForm] = useState(editItem || { name: '', phone: '', address: '' });

  const handleSubmit = () => {
    if (editItem?.id) {
      setSuppliers(suppliers.map(s => s.id === editItem.id ? { ...form, id: editItem.id } : s));
    } else {
      setSuppliers([...suppliers, { ...form, id: Date.now() }]);
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
          placeholder="Supplier name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="9876543210"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address (optional)</label>
        <input
          type="text"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="City or full address"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
      >
        {editItem?.id ? 'Update Supplier' : 'Add Supplier'}
      </button>
    </div>
  );
}
