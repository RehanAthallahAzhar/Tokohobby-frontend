import React from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const QuantitySpinner = ({ 
  quantity, 
  setQuantity, 
  maxStock = 999,
  minStock = 0
}) => {
  
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(minStock, prev - 1)); 
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(maxStock, prev + 1)); 
  };

  return (
    <div className="flex items-center rounded-lg border border-gray-300">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= minStock} 
        className="p-3 text-gray-500 rounded-l-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <HiMinus size={16} />
      </button>
      
      <span className="w-12 text-center font-medium text-gray-800">
        {quantity}
      </span>
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= maxStock}
        className="p-3 text-gray-500 rounded-r-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <HiPlus size={16} />
      </button>
    </div>
  );
};

export default QuantitySpinner;