import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

/*
 * Komponen Modal Konfirmasi Reusable
 * Props:
 * - isOpen, onClose, onConfirm: Fungsi
 * - title, message: Teks
 * - isLoading: boolean
 * - confirmText, cancelText: Teks Tombol
 */


const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  isLoading, 
  confirmText = "Konfirmasi", 
  cancelText = "Batal" 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <HiOutlineExclamationTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>

          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? <LoadingSpinner /> : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;