import React from 'react';
import { X, Trash2 } from 'lucide-react';

const TransactionActionModal = ({ transaction, onClose, onEdit, onDelete }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:fade-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Transaction Options</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onEdit} className="w-full py-4 px-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2">
            Edit Transaction
          </button>
          <button onClick={() => { onDelete(transaction.id); onClose(); }} className="w-full py-4 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2">
            <Trash2 size={20} /> Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionActionModal;
