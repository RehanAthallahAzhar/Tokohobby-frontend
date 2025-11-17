import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error('useCart harus digunakan di dalam CartProvider');
    }
    return context;
};
