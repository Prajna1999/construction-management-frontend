'use client';

import { useState } from 'react';
import { Material, Supplier, Purchase, Snapshot, TabId, ModalType } from '@/app/types';
import { Icons } from '@/app/components/Icons';
import { Modal } from '@/app/components/Modal';
import { MaterialForm } from '@/app/components/MaterialForm';
import { SupplierForm } from '@/app/components/SupplierForm';
import { PurchaseForm } from '@/app/components/PurchaseForm';
import { SnapshotForm } from '@/app/components/SnapshotForm';
import { Dashboard } from '@/app/components/Dashboard';
import { Materials } from '@/app/components/Materials';
import { Suppliers } from '@/app/components/Suppliers';
import { Purchases } from '@/app/components/Purchases';
import { StockCheck } from '@/app/components/StockCheck';
import { Header } from '@/app/components/Header';
import { BottomNav } from '@/app/components/BottomNav';

// Mock data
const initialMaterials: Material[] = [
  { id: 1, name: 'Cement', unit: 'bags', category: 'Binding', reorderLevel: 50 },
  { id: 2, name: 'Sand', unit: 'cubic ft', category: 'Aggregate', reorderLevel: 100 },
  { id: 3, name: 'Steel Rods (12mm)', unit: 'kg', category: 'Reinforcement', reorderLevel: 200 },
  { id: 4, name: 'Bricks', unit: 'pieces', category: 'Masonry', reorderLevel: 1000 },
];

const initialSuppliers: Supplier[] = [
  { id: 1, name: 'Ramesh Building Materials', phone: '9876543210', address: 'Bhadrak' },
  { id: 2, name: 'Odisha Steel Traders', phone: '9123456789', address: 'Cuttack' },
];

const initialPurchases: Purchase[] = [
  { id: 1, supplierId: 1, materialId: 1, quantity: 100, rate: 380, date: '2024-12-10', projectName: 'Residential Complex A', site: 'Plot No. 12, Bhadrak' },
  { id: 2, supplierId: 2, materialId: 3, quantity: 500, rate: 72, date: '2024-12-10', projectName: 'Commercial Tower', site: 'Link Road, Cuttack' },
  { id: 3, supplierId: 1, materialId: 2, quantity: 200, rate: 45, date: '2024-12-11', projectName: 'Residential Complex A', site: 'Plot No. 12, Bhadrak' },
];

const initialSnapshots: Snapshot[] = [
  { id: 1, materialId: 1, quantity: 45, date: '2024-12-11' },
  { id: 2, materialId: 2, quantity: 150, date: '2024-12-11' },
  { id: 3, materialId: 3, quantity: 180, date: '2024-12-11' },
  { id: 4, materialId: 4, quantity: 800, date: '2024-12-11' },
];

export default function InventoryApp() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [snapshots, setSnapshots] = useState<Snapshot[]>(initialSnapshots);
  const [showModal, setShowModal] = useState<ModalType>(null);
  const [editItem, setEditItem] = useState<Material | Supplier | { materialId: number; quantity: number } | null>(null);

  const handleEditMaterial = (material: Material) => {
    setEditItem(material);
    setShowModal('material');
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditItem(supplier);
    setShowModal('supplier');
  };

  const handleUpdateStock = (materialId: number, currentQuantity: number) => {
    setEditItem({ materialId, quantity: currentQuantity });
    setShowModal('snapshot');
  };

  const handleCloseModal = () => {
    setShowModal(null);
    setEditItem(null);
  };

  const getAddAction = (): (() => void) | undefined => {
    switch (activeTab) {
      case 'materials':
        return () => {
          setEditItem(null);
          setShowModal('material');
        };
      case 'suppliers':
        return () => {
          setEditItem(null);
          setShowModal('supplier');
        };
      case 'purchases':
        return () => setShowModal('purchase');
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>

      {/* Header */}
      <Header activeTab={activeTab} onAddClick={getAddAction()} />

      {/* Content */}
      <main className="px-4 py-4">
        {activeTab === 'dashboard' && (
          <Dashboard
            materials={materials}
            suppliers={suppliers}
            purchases={purchases}
            snapshots={snapshots}
          />
        )}
        {activeTab === 'materials' && (
          <Materials materials={materials} onEdit={handleEditMaterial} />
        )}
        {activeTab === 'suppliers' && (
          <Suppliers suppliers={suppliers} purchases={purchases} onEdit={handleEditSupplier} />
        )}
        {activeTab === 'purchases' && (
          <Purchases materials={materials} suppliers={suppliers} purchases={purchases} />
        )}
        {activeTab === 'stockcheck' && (
          <StockCheck materials={materials} snapshots={snapshots} onUpdateStock={handleUpdateStock} />
        )}
      </main>

      {/* FAB for quick purchase on dashboard */}
      {activeTab === 'dashboard' && (
        <button
          onClick={() => setShowModal('purchase')}
          className="fixed bottom-24 right-4 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
        >
          <Icons.Plus />
        </button>
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      {showModal === 'material' && (
        <Modal
          title={editItem && 'id' in editItem ? 'Edit Material' : 'Add Material'}
          onClose={handleCloseModal}
        >
          <MaterialForm
            editItem={editItem && 'unit' in editItem ? editItem as Material : null}
            materials={materials}
            setMaterials={setMaterials}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      {showModal === 'supplier' && (
        <Modal
          title={editItem && 'id' in editItem ? 'Edit Supplier' : 'Add Supplier'}
          onClose={handleCloseModal}
        >
          <SupplierForm
            editItem={editItem && 'phone' in editItem ? editItem as Supplier : null}
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      {showModal === 'purchase' && (
        <Modal title="Log Purchase" onClose={handleCloseModal}>
          <PurchaseForm
            materials={materials}
            suppliers={suppliers}
            purchases={purchases}
            setPurchases={setPurchases}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      {showModal === 'snapshot' && (
        <Modal title="Update Stock" onClose={handleCloseModal}>
          <SnapshotForm
            editItem={editItem && 'materialId' in editItem ? editItem as { materialId: number; quantity: number } : null}
            materials={materials}
            snapshots={snapshots}
            setSnapshots={setSnapshots}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}
