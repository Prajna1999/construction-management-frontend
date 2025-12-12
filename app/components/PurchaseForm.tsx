import React, { useState } from 'react';
import { Material, Supplier, Purchase } from '@/app/types';

interface PurchaseFormProps {
  materials: Material[];
  suppliers: Supplier[];
  purchases: Purchase[];
  setPurchases: (purchases: Purchase[]) => void;
  onClose: () => void;
}

export function PurchaseForm({ materials, suppliers, purchases, setPurchases, onClose }: PurchaseFormProps) {
  const [form, setForm] = useState({
    supplierId: '',
    materialId: '',
    quantity: '',
    rate: '',
    date: new Date().toISOString().split('T')[0],
    projectName: '',
    site: ''
  });

  const handleSubmit = () => {
    setPurchases([...purchases, {
      ...form,
      id: Date.now(),
      supplierId: parseInt(form.supplierId),
      materialId: parseInt(form.materialId),
      quantity: parseFloat(form.quantity),
      rate: parseFloat(form.rate),
    }]);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
        <select
          value={form.supplierId}
          onChange={e => setForm({ ...form, supplierId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none bg-white"
        >
          <option value="">Select supplier</option>
          {suppliers.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
        <select
          value={form.materialId}
          onChange={e => setForm({ ...form, materialId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none bg-white"
        >
          <option value="">Select material</option>
          {materials.map(m => (
            <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
            placeholder="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹)</label>
          <input
            type="number"
            value={form.rate}
            onChange={e => setForm({ ...form, rate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
            placeholder="380"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <input
          type="text"
          value={form.projectName}
          onChange={e => setForm({ ...form, projectName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="Main Building Construction"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
        <input
          type="text"
          value={form.site}
          onChange={e => setForm({ ...form, site: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-900 focus:outline-none"
          placeholder="Plot No. 45, Sector 12"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!form.supplierId || !form.materialId || !form.quantity}
        className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Log Purchase
      </button>
    </div>
  );
}
