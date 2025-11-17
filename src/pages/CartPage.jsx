import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';


const formatCurrency = (number) => new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(number);

const CartPage = () => {
  const { cart, loading } = useCart(); 

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-20">Memuat keranjang...</div>;
    }

    if (!cart || cart.items.length === 0) {
      return <div className="text-center py-20">Keranjang kosong.</div>;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left : Item list*/}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Keranjang Belanja ({cart.total_items} item)
          </h2>
          {cart.items.map((item) => (
            <CartItem key={item.product_id} item={item} />
          ))}
        </div>

        {/* Right: Shopping Summary*/}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">
              Ringkasan Belanja
            </h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Pajak dan biaya pengiriman akan dihitung saat checkout.
            </p>

            <Link
              to="/checkout"
              className={`mt-6 w-full flex justify-center text-center bg-cyan-600 text-white font-medium py-3 rounded-lg shadow hover:bg-cyan-700 transition-colors ${
                subtotal === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              }`}
            >
              Lanjut ke Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 animate-fade-in">
      {renderContent()}
    </main>
  );
};

export default CartPage;