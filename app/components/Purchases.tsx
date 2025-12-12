import { Material, Supplier, Purchase } from '@/app/types';
import { Icons } from './Icons';
import { EmptyState } from './EmptyState';

interface PurchasesProps {
  materials: Material[];
  suppliers: Supplier[];
  purchases: Purchase[];
}

export function Purchases({ materials, suppliers, purchases }: PurchasesProps) {
  if (purchases.length === 0) {
    return (
      <EmptyState
        icon={Icons.ShoppingCart}
        title="No purchases recorded"
        description="Start logging your material purchases to track spending and maintain a complete transaction history."
      />
    );
  }

  // Group purchases by date
  const groupedPurchases = [...purchases]
    .reverse()
    .reduce((groups: { [date: string]: Purchase[] }, purchase) => {
      const date = purchase.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(purchase);
      return groups;
    }, {});

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedPurchases).map(([date, datePurchases]) => {
        const dayTotal = datePurchases.reduce((sum, p) => sum + (p.quantity * p.rate), 0);

        return (
          <div key={date} className="space-y-3">
            {/* Date Header */}
            <div className="sticky top-0 bg-gray-50 -mx-4 px-4 py-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-gray-900">{formatDate(date)}</div>
                <div className="text-sm font-medium text-gray-600">
                  {datePurchases.length} {datePurchases.length === 1 ? 'purchase' : 'purchases'} • ₹{dayTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Purchases for this date */}
            <div className="space-y-3">
              {datePurchases.map(p => {
                const material = materials.find(m => m.id === p.materialId);
                const supplier = suppliers.find(s => s.id === p.supplierId);
                return (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-900">{material?.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{supplier?.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{p.quantity} {material?.unit}</div>
                        <div className="text-sm text-gray-500">₹{p.rate}/{material?.unit}</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">
                          ₹{(p.quantity * p.rate).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    {(p.projectName || p.site) && (
                      <div className="pt-3 border-t border-gray-100">
                        {p.projectName && (
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">Project:</span> {p.projectName}
                          </div>
                        )}
                        {p.site && (
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Site:</span> {p.site}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
