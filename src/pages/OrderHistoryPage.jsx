import React, { useState, useEffect, useCallback } from 'react';
import { orderApi } from '../services/api';
import { Link } from 'react-router-dom';
import { HiOutlineArchiveBox, HiOutlineArrowLeft } from 'react-icons/hi2';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

import ConfirmModal from '../components/ConfirmModal'; 

const formatCurrency = (number) => new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(number);

const OrderCard = ({ orderData, onOpenCancelModal }) => {
  const { order, items } = orderData;

  const handleCancelClick = () => {
    onOpenCancelModal(order); 
  };

  let statusColor = 'bg-gray-200 text-gray-800';
  if (order.status === 'PENDING_PAYMENT') {
    statusColor = 'bg-yellow-100 text-yellow-800';
  } else if (order.status === 'CANCELED') {
    statusColor = 'bg-red-100 text-red-800';
  } else if (order.status === 'PAID' || order.status === 'SHIPPED') {
    statusColor = 'bg-green-100 text-green-800';
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Card */}
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Tanggal Pesanan</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(order.created_at).toLocaleDateString('id-ID', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor}`}>
          {order.status.replace(/_/g, " ")}
        </span>
      </div>

      {/* Body Cart */}
      <div className="p-4 space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex gap-4">
            <img 
              src={`https://placehold.co/80x80/E0F2E9/333333?text=${item.product_name.split(' ')[0]}`}
              alt={item.product_name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{item.product_name}</p>
              <p className="text-xs text-gray-500">Penjual: {item.seller_name}</p>
              <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.product_price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Card */}
      <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-600">Total Belanja: </span>
          <span className="font-bold text-lg text-cyan-600">{formatCurrency(order.total_price)}</span>
        </div>
        
        {order.status === 'PENDING_PAYMENT' && (
          <button
            onClick={handleCancelClick}
            className="text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Batalkan Pesanan
          </button>
        )}
      </div>
    </div>
  );
};


const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderApi.get('/');
      setOrders(response.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil pesanan:", err);
      setError(err.response?.data?.message || 'Gagal memuat riwayat pesanan.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOpenConfirmModal = (order) => {
    setOrderToCancel(order);
    setIsConfirmModalOpen(true);
  };
  
  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    setIsCanceling(true);
    
    try {
      await orderApi.post(`/${orderToCancel.id}/cancel`);
      
      fetchOrders(); 
      setIsConfirmModalOpen(false);
      setOrderToCancel(null);

    } catch (err) {
      console.error("Gagal membatalkan pesanan:", err);
      alert("Gagal membatalkan pesanan: " + (err.response?.data?.message || err.message));
    } finally {
      setIsCanceling(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-[50vh] items-center justify-center">
          <svg className="animate-spin h-10 w-10 text-cyan-600" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 bg-red-100 text-red-700 rounded-lg">
          <p><strong>Oops! Terjadi kesalahan:</strong> {error}</p>
        </div>
      );
    }

    if (!loading && orders.length === 0) {
      return (
        <EmptyState
          icon={HiOutlineArchiveBox}
          title="Belum Ada Pesanan"
          message="Anda belum melakukan transaksi apapun. Ayo mulai belanja!"
          linkTo="/"
          linkText="Mulai Belanja"
        />
      );
    }

    return (
      <div className="space-y-6">
        {orders.map((orderData) => (
          <OrderCard 
            key={orderData.order.id} 
            orderData={orderData}
            onOpenCancelModal={handleOpenConfirmModal}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Riwayat Pesanan Saya
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 hover:text-cyan-800 transition-colors"
        >
          <HiOutlineArrowLeft size={18} />
          Kembali Belanja
        </Link>
      </div>
      
      {renderContent()}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleCancelOrder}
        isLoading={isCanceling}
        title="Batalkan Pesanan?"
        message={`Anda yakin ingin membatalkan pesanan? Aksi ini tidak dapat diurungkan.`}
        confirmText="Ya, Batalkan"
        cancelText="Tidak"
      />
    </main>
  );
};

export default OrderHistoryPage;