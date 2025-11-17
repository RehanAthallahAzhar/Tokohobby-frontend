import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { orderApi } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiOutlineArrowLeft } from 'react-icons/hi';


const formatCurrency = (number) => new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(number);

const CheckoutPage = () => {
  const { cart, loading: cartLoading, fetchCart } = useCart();
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);
  const [error, setError] = useState(null);

  const [shippingAddress, setShippingAddress] = useState('Jl. Merdeka No. 10, Jakarta Pusat');
  const [shippingMethod, setShippingMethod] = useState('JNE Express');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const subtotal = cart ? cart.items.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;
  
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsOrdering(true);
    setError(null);

    if (!cart || cart.items.length === 0) {
      setError("Keranjang Anda kosong.");
      setIsOrdering(false);
      return;
    }

    const itemsPayload = cart.items.map(item => ({
      id: item.product_id,
      quantity: item.quantity,
      description: item.description || ' '
    }));

    const orderPayload = {
      total_price: subtotal,
      shipping_address: shippingAddress,
      shipping_method: shippingMethod,
      payment_method: paymentMethod,
      shipping_tracking_code: "CGK123456",
      payment_gateway_id: "midtrans_001"
    };

    try {
      await orderApi.post('/', {
        order: orderPayload,
        items: itemsPayload
      });
      
      fetchCart({ showLoading: false });
      
      navigate('/orders');
      
    } catch (err) {
      console.error("Gagal membuat pesanan:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsOrdering(false);
    }
  };

  if (cartLoading) {
    return <div className="text-center py-20">Memuat keranjang...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Keranjang Anda Kosong</h1>
        <p className="mt-2 text-gray-600">Anda tidak bisa checkout dengan keranjang kosong.</p>
        <Link to="/" className="mt-4 inline-block text-cyan-600 hover:underline">Kembali ke Beranda</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 animate-fade-in">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 hover:text-cyan-800 mb-6 transition-colors"
      >
        <HiOutlineArrowLeft size={18} />
        Kembali ke Keranjang
      </Link>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Checkout
      </h1>

      {/* Main form */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* left: Shipping & Payment Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-3">
            Informasi Pengiriman & Pembayaran
          </h2>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              <strong>Gagal membuat pesanan:</strong> {error}
            </div>
          )}

          {/* Shipping Address */}
          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
              Alamat Pengiriman
            </label>
            <textarea
              id="shippingAddress"
              rows="3"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          {/* Shipping Methods */}
          <div>
            <label htmlFor="shippingMethod" className="block text-sm font-medium text-gray-700">
              Metode Pengiriman
            </label>
            <select
              id="shippingMethod"
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            >
              <option>JNE Express</option>
              <option>J&T</option>
              <option>SiCepat</option>
            </select>
          </div>

          {/* Payment Methods */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Metode Pembayaran
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            >
              <option>Credit Card</option>
              <option>Bank Transfer (BCA)</option>
              <option>GoPay</option>
            </select>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">
              Ringkasan Pesanan
            </h3>
            
            {/* List of Items */}
            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
              {cart.items.map(item => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product_name} <span className="text-gray-400">x{item.quantity}</span></span>
                  <span className="font-medium text-gray-800">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="text-base font-medium text-gray-600">Total</span>
              <span className="text-xl font-bold text-cyan-600">
                {formatCurrency(subtotal)}
              </span>
            </div>
            
            {/* Pay Button */}
            <button
              type="submit"
              className="mt-6 w-full flex justify-center bg-cyan-600 text-white font-medium py-3 rounded-lg shadow hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={subtotal === 0 || isOrdering}
            >
              {isOrdering ? <LoadingSpinner /> : 'Buat Pesanan Sekarang'}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CheckoutPage;