import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

import ActionFigureImage from '../assets/action-figure.png';
import RunImage from '../assets/logo-run.png'
import GameImage from '../assets/logo-game.png' 
import FashionImage from '../assets/logo-fashion.png'

import { categories } from '../data/categories';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Modal from './Modal';

const CategoryCard = ({ category }) => {
    let iconElement;
    if (category.type === 'image') {
        iconElement = <img 
                        src={category.value} 
                        alt={category.name} 
                        className="w-9 h-9 object-contain mb-3" 
                        />;
    } else if (category.type === 'icon') {
        const IconComponent = category.value;
        iconElement = <IconComponent 
                        size={36} 
                        className="text-cyan-600 mb-3" 
                        />;
    }

    return (
        <Link
        to={`/category/${category.slug}`}
        className="flex w-full h-full flex-col items-center justify-center text-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
        {iconElement} 
        <span className="text-sm font-medium text-gray-700">{category.name}</span>
        </Link>
    );
};

const CategoryList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="container relative z-10 mx-auto max-w-7xl px-4 mt-12 animate-fade-in [animation-delay:200ms]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Kategori Pilihan</h2>
                <button 
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                    Show All
                </button>
            </div>
            
            <Swiper
                modules={[Navigation]}
                navigation={true}
                spaceBetween={16}
                breakpoints={{
                    320: { slidesPerView: 2.5, spaceBetween: 10 },
                    640: { slidesPerView: 4, spaceBetween: 16 },
                    1024: { slidesPerView: 7, spaceBetween: 16 },
                }}
                className="category-slider"
                >
                {categories.map((category) => (
                <SwiperSlide key={category.slug}>
                        <CategoryCard category={category} />
                </SwiperSlide>
                ))}
            </Swiper>

            <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            title="Semua Kategori"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.map((category) => (
                    <CategoryCard key={category.slug} category={category} />
                    ))}
                </div>
            </Modal>

        </section>
    );
};

export default CategoryList;