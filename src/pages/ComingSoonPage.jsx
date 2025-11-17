import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBeaker, HiOutlineArrowLeft } from 'react-icons/hi2';

const ComingSoonPage = () => {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 animate-fade-in">
      
      <div 
        className="flex flex-col items-center justify-center text-center bg-white p-12 md:p-16 rounded-2xl shadow-lg"
        style={{ minHeight: '60vh' }} 
      >
        <HiOutlineBeaker size={80} className="text-cyan-500" />
        
        <h1 className="mt-6 text-4xl font-extrabold text-blue-900">
          Segera Hadir!
        </h1>
        
        <p className="mt-4 max-w-md text-lg text-gray-600">
          Halaman ini sedang kami "racik" dengan berbagai fitur menarik untuk hobi Anda. Nantikan ya!
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 bg-cyan-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-700 transition-colors duration-200"
        >
          <HiOutlineArrowLeft size={20} />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
};

export default ComingSoonPage;