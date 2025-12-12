import React from 'react';
import { Material, Supplier, Purchase } from '@/app/types';

interface PurchasesProps {
  materials: Material[];
  suppliers: Supplier[];
  purchases: Purchase[];
}

export function Purchases({ materials, suppliers, purchases }: PurchasesProps) {
  return (
    <div className="space-y-3">
      {[...purchases].reverse().map(p => {
        const material = materials.find(m => m.id === p.materialId);
        const supplier = suppliers.find(s => s.id === p.supplierId);
        return (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">{material?.name}</div>
                <div className="text-sm text-gray-500 mt-1">{supplier?.name}</div>
                <div className="text-sm text-gray-500">{p.date}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{p.quantity} {material?.unit}</div>
                <div className="text-sm text-gray-500">₹{p.rate}/{material?.unit}</div>
                <div className="text-sm font-medium text-gray-900 mt-1">
                  ₹{(p.quantity * p.rate).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
