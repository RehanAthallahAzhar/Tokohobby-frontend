import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { HiOutlineUserCircle, HiOutlineMail, HiOutlineIdentification, HiOutlineShieldCheck, HiOutlinePencilAlt } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return (
        <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Anda belum login.</h1>
            <Link to="/login" className="text-brand-pink hover:underline">
            Kembali ke halaman Login
            </Link>
        </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
        <Header />

        <main className="container mx-auto max-w-7xl px-4 py-8 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-brand-dark mb-8">Profil Pengguna</h1>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Kolom Kiri: Avatar & Info Singkat */}
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <HiOutlineUserCircle size={100} className="text-gray-400" />
                <h2 className="text-2xl font-bold text-brand-dark">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
                </div>

                {/* Kolom Kanan: Detail Informasi */}
                <div className="space-y-4">
                <h3 className="text-xl font-semibold text-brand-dark border-b pb-3 mb-4">Informasi Akun</h3>

                {/* Username */}
                <div className="flex items-center space-x-3">
                    <HiOutlineIdentification size={24} className="text-brand-pink" />
                    <div>
                    <p className="text-xs text-gray-500">Username</p>
                    <p className="text-base font-medium text-brand-dark">{user.username}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                    <HiOutlineMail size={24} className="text-brand-pink" />
                    <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-base font-medium text-brand-dark">{user.email}</p>
                    </div>
                </div>

                {/* Role */}
                <div className="flex items-center space-x-3">
                    <HiOutlineShieldCheck size={24} className="text-brand-pink" />
                    <div>
                    <p className="text-xs text-gray-500">Peran</p>
                    <p className="text-base font-medium text-brand-dark capitalize">{user.role}</p>
                    </div>
                </div>

                {/* Edit Profile Button (Placeholder)  */}
                <div className="pt-6">
                    <button
                    // onClick={() => alert('Fitur edit profil belum diimplementasikan!')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                    <HiOutlinePencilAlt size={20} />
                    Edit Profil
                    </button>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
};

export default ProfilePage;