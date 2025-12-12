import React from 'react';
import { Supplier, Purchase } from '@/app/types';
import { Icons } from './Icons';

interface SuppliersProps {
  suppliers: Supplier[];
  purchases: Purchase[];
  onEdit: (supplier: Supplier) => void;
}

export function Suppliers({ suppliers, purchases, onEdit }: SuppliersProps) {
  return (
    <div className="space-y-3">
      {suppliers.map(s => {
        const supplierPurchases = purchases.filter(p => p.supplierId === s.id);
        const totalSpent = supplierPurchases.reduce((sum, p) => sum + (p.quantity * p.rate), 0);
        return (
          <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">{s.name}</div>
                <div className="text-sm text-gray-500 mt-1">{s.phone}</div>
                {s.address && <div className="text-sm text-gray-500">{s.address}</div>}
                <div className="text-sm text-gray-600 mt-2">
                  {supplierPurchases.length} purchases • ₹{totalSpent.toLocaleString()} total
                </div>
              </div>
              <button
                onClick={() => onEdit(s)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Icons.Edit />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
