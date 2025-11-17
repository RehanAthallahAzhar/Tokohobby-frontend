import React from 'react';
import { Link } from 'react-router-dom';

const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

const calculateDiscountedPrice = (price, discount) => {
  return price - (price * discount) / 100;
};

const ProductCard = ({ product }) => {
    const finalPrice = calculateDiscountedPrice(product.price, product.discount);

    return (
        <div className="bg-white relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <Link to={`/product/${product.id}`} className="block">
            {/* Gambar Produk */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
            <img
                src={`https://placehold.co/400x400/E0F2E9/333333?text=${product.name.split(' ')[0]}`}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            </div>

            {/* Product Info */}
            <div className="p-4">
            <h3 className="text-sm font-semibold text-brand-dark truncate" title={product.name}>
                {product.name}
            </h3>
            <p className="text-xs text-gray-500 capitalize mb-2">{product.type}</p>
            
            <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-brand-pink">
                {formatCurrency(finalPrice)}
                </span>
                {product.discount > 0 && (
                <span className="text-xs text-gray-400 line-through">
                    {formatCurrency(product.price)}
                </span>
                )}
            </div>
            
            {product.discount > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.discount}%
                </div>
            )}
            </div>
        </Link>
        </div>
    );
};

export default ProductCard;