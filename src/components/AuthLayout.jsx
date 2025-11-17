import React from 'react';
import { Link } from 'react-router-dom';

import shoppingImage from '../assets/laptop-ecommerce-icon.svg';

const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center animate-fade-in">

        <div className="text-center md:text-left">
          <Link to="/" className="text-5xl font-extrabold text-blue-900">
            Hobby<span className="text-cyan-500">pedia</span>
          </Link>
          <h1 className="text-3xl lg:text-2xl font-bold text-blue-900 mt-4 leading-tight">
            Hobi jadi lebih seru, bareng Tokohobby!
          </h1>
          <p className="text-lg text-gray-600 mt-2 mb-6">
            Belanja kebutuhan hobimu, dari yang unik sampai langka.
          </p>
          
          <img 
            src={shoppingImage} 
            alt="Online Shopping" 
            className="w-full max-w-lg mx-auto md:mx-0 mb-6 object-contain rounded-lg"
          />
        </div>

        {/* Kolom Kanan: Form Kaca */}
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl bg-white/40 backdrop-blur-lg shadow-2xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-center text-blue-900 mb-6">
              {title}
            </h3>
            
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;