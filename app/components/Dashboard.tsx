import React from 'react';
import { Material, Supplier, Purchase, Snapshot } from '@/app/types';
import { Icons } from './Icons';
import { getCurrentStock } from './utils';

interface DashboardProps {
  materials: Material[];
  suppliers: Supplier[];
  purchases: Purchase[];
  snapshots: Snapshot[];
}

export function Dashboard({ materials, suppliers, purchases, snapshots }: DashboardProps) {
  // Get materials below reorder level
  const lowStockMaterials = materials.filter(m => {
    const currentStock = getCurrentStock(m.id, snapshots);
    return currentStock < m.reorderLevel;
  });

  return (
    <div className="space-y-4">
      {lowStockMaterials.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-700 font-medium mb-3">
            <Icons.AlertTriangle />
            <span>Low Stock Alert</span>
          </div>
          <div className="space-y-2">
            {lowStockMaterials.map(m => {
              const current = getCurrentStock(m.id, snapshots);
              return (
                <div key={m.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{m.name}</span>
                  <span className="text-amber-700 font-medium">
                    {current} / {m.reorderLevel} {m.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Stock Overview</h3>
        <div className="space-y-3">
          {materials.map(m => {
            const current = getCurrentStock(m.id, snapshots);
            const isLow = current < m.reorderLevel;
            return (
              <div key={m.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-sm font-medium text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.category}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${isLow ? 'text-amber-600' : 'text-gray-900'}`}>
                    {current} {m.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    Reorder at {m.reorderLevel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Recent Purchases</h3>
        <div className="space-y-2">
          {purchases.slice(-3).reverse().map(p => {
            const material = materials.find(m => m.id === p.materialId);
            const supplier = suppliers.find(s => s.id === p.supplierId);
            return (
              <div key={p.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-sm font-medium text-gray-900">{material?.name}</div>
                  <div className="text-xs text-gray-500">{supplier?.name} • {p.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{p.quantity} {material?.unit}</div>
                  <div className="text-xs text-gray-500">₹{p.rate}/{material?.unit}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
