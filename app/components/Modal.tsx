import React from 'react';
import { Icons } from './Icons';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-xl p-6 max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-900 rounded-md">
            <Icons.X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
