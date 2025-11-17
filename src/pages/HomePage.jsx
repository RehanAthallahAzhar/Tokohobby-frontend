import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';


const HomePage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
        <Header />

        <main>

            <HeroBanner />
            <CategoryList />
            <ProductList />
        </main>
        
        </div>
    );
};

export default HomePage;