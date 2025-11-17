import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Header from './Header';

const Nav = () => {
    const { token, user, logout } = useAuthStore();

    return (
        <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '1rem', 
        background: '#f0f0f0', 
        borderBottom: '1px solid #ccc' 
        }}>
        <div>
            <Link to="/" style={{ marginRight: '1rem' }}>Hobbypedia</Link>
            <Link to="/products" style={{ marginRight: '1rem' }}>Products</Link>
            {token && <Link to="/cart" style={{ marginRight: '1rem' }}>My Cart</Link>}
        </div>
        <div>
            {token ? (
                <>
                    <Link to="/profile" style={{ marginRight: '1rem' }}>
                        Hello, {user?.username} ({user?.role})
                    </Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </div>
        </nav>
    );
};


const RootLayout = () => {
    return (
    <>
            <div style={{ padding: '1.5rem' }}>
                <Outlet /> 
            </div>
    </>
    );
};

export default RootLayout;