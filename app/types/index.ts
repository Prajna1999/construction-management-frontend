export interface Material {
  id: number;
  name: string;
  unit: string;
  category: string;
  reorderLevel: number;
}

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface Purchase {
  id: number;
  supplierId: number;
  materialId: number;
  quantity: number;
  rate: number;
  date: string;
}

export interface Snapshot {
  id: number;
  materialId: number;
  quantity: number;
  date: string;
}

export type TabId = 'dashboard' | 'materials' | 'suppliers' | 'purchases' | 'stockcheck';

export type ModalType = 'material' | 'supplier' | 'purchase' | 'snapshot' | null;
