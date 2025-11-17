import React from 'react';
import { HiX } from 'react-icons/hi'; 

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
        onClick={onClose}
        >
        {/* Content Modal */}
        <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header Modal */}
            <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
                {title}
            </h3>
            <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                aria-label="Tutup modal"
            >
                <HiX size={20} />
            </button>
            </div>
            
            {/* Body Modal*/}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {children}
            </div>
        </div>
        </div>
    );
};

export default Modal;