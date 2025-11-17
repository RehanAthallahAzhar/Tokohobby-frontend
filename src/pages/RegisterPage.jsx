import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import AuthLayout from '../components/AuthLayout';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'admin', 
        adminToken: '', 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
        const res = await auth.register(
            formData.name,
            formData.username,
            formData.email,
            formData.password,
            formData.role,
            formData.adminToken
        );
    setSuccess(res.message); 
    setFormData({
        name: '', username: '', email: '', password: '', role: 'admin', adminToken: '',
    });
    setTimeout(() => {
        navigate('/login');
    }, 2000);

    } catch (err) {
        const message = err.response?.data?.message || 'Registration failed. Please try again.';
        setError(message);
    } finally {
        setIsLoading(false);
    }
    };


    return (
    <AuthLayout title="Create Your Account">
        <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Style Pesan Error/Sukses disesuaikan untuk background terang */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
                    <span className="block sm:inline">{success}. Redirecting to login...</span>
                </div>
            )}

            <input 
              name="name" type="text" placeholder="Full Name" 
              value={formData.name} onChange={handleChange} required 
              className="mt-1 block w-full rounded-md border-gray-400/50 bg-white/50 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm text-gray-900 placeholder:text-gray-600"
            />
            <input 
              name="username" type="text" placeholder="Username" 
              value={formData.username} onChange={handleChange} required 
              className="mt-1 block w-full rounded-md border-gray-400/50 bg-white/50 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm text-gray-900 placeholder:text-gray-600"
            />
            <input 
              name="email" type="email" placeholder="Email" 
              value={formData.email} onChange={handleChange} required 
              className="mt-1 block w-full rounded-md border-gray-400/50 bg-white/50 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm text-gray-900 placeholder:text-gray-600"
            />
            <input 
              name="password" type="password" placeholder="Password" 
              value={formData.password} onChange={handleChange} required 
              className="mt-1 block w-full rounded-md border-gray-400/50 bg-white/50 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm text-gray-900 placeholder:text-gray-600"
            />

            {/* <input 
              name="role" type="password" placeholder="Password" 
              value={formData.password} onChange={handleChange} required 
              className="mt-1 block w-full rounded-md border-gray-400/50 bg-white/50 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm text-gray-900 placeholder:text-gray-600"
            /> */}
            
            <div>
              <button
                type="submit"
                disabled={isLoading || success} 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner /> : 'Create Account'}
              </button>
            </div>
        </form>

        {/* --- LINK (REVISI STYLE "CYAN") --- */}
        <p className="mt-8 text-center text-sm text-gray-800">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-800 hover:text-cyan-600 transition-colors duration-150">
                Sign In
            </Link>
        </p>
    </AuthLayout>
    );
};

export default RegisterPage;