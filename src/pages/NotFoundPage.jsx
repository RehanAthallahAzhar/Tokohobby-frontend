import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const NotFoundPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
        <Header />
        
        <main className="container mx-auto max-w-7xl px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center animate-fade-in">
            <h1 className="text-8xl md:text-9xl font-extrabold text-brand-pink tracking-tighter">
            4<span className="text-brand-green opacity-80 mx-1">0</span>4
            </h1>
            
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-brand-dark">
            Oops! Halaman Hilang.
            </h2>
            
            <p className="mt-4 max-w-md text-base text-gray-600 leading-relaxed">
            Sepertinya halaman yang Anda cari sedang bermain petak umpet... 
            dan kami tidak bisa menemukannya!
            </p>
            
            <p className="mt-2 text-sm text-gray-500">
            Mungkin salah ketik URL?
            </p>

            <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 bg-brand-green text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-200"
            >
            <HiOutlineArrowLeft size={20} />
            Bawa Saya Kembali ke Beranda
            </Link>
        </main>
        </div>
    );
};

export default NotFoundPage;