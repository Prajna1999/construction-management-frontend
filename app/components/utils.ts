import { Material, Purchase, Snapshot } from '@/app/types';

// Utility to get current stock from snapshots
export const getCurrentStock = (materialId: number, snapshots: Snapshot[]): number => {
  const latest = snapshots
    .filter(s => s.materialId === materialId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  return latest?.quantity ?? 0;
};

// Get total received for a material
export const getTotalReceived = (materialId: number, purchases: Purchase[]): number => {
  return purchases
    .filter(p => p.materialId === materialId)
    .reduce((sum, p) => sum + p.quantity, 0);
};
