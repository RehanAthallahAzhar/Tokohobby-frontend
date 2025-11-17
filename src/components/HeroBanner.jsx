import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import DiscountCart from '../assets/discount-cart.png';

const slideData = [
    {
        id: 1,
        title: 'Yuk, belanja di Hobbypedia',
        subtitle: 'Cek barang dari beragam kategori hobi.',
        buttonText: 'Cek Sekarang',
        bgColor: 'bg-green-500',
        btnColor: 'hover:text-green-600',
        img: DiscountCart 
    },
    {
        id: 2,
        title: 'Promo Kilat 11.11',
        subtitle: 'Diskon besar-besaran untuk action figure langka.',
        buttonText: 'Lihat Promo',
        bgColor: 'bg-blue-600',
        btnColor: 'hover:text-blue-700',
        img: DiscountCart
    },
    {
        id: 3,
        title: 'Hobi Baru, Semangat Baru',
        subtitle: 'Temukan perlengkapan olahraga & outdoor.',
        buttonText: 'Mulai Berpetualang',
        bgColor: 'bg-orange-500',
        btnColor: 'hover:text-orange-600',
        img: DiscountCart
    },
];


const HeroBanner = () => {
    return (
        <section className="container mx-auto max-w-7xl px-4 mt-8 animate-fade-in">

        <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                loop={true}
                autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                className="rounded-3xl hero-slider shadow-lg"
        >

                {slideData.map((slide) => (
                <SwiperSlide 
                    key={slide.id} 
                    className={`!flex items-center justify-between p-8 md:p-12 ${slide.bgColor}`}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">

                    {/* left: Teks and button */}
                    <div className="w-full md:w-1/2 text-center md:text-left text-white">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                            {slide.title}
                        </h1>
                        <p className="text-lg text-green-100 mb-8">
                            {slide.subtitle}
                        </p>
                        <a
                            href="#"
                            className={`py-3 px-6 rounded-lg font-bold border-2 border-white bg-transparent text-white transition-all duration-300 ${slide.btnColor} hover:bg-white`}
                            >
                            {slide.buttonText}
                        </a>
                    </div>

                    <div className="w-full md:w-1/2 max-w-sm hidden md:block">
                                {/* Ganti ini dengan gambar/ilustrasi Anda */}
                    <img 
                        src={slide.img} 
                        alt={slide.title} 
                        className="w-full h-auto object-contain"
                    />
                    </div>
                    </div> 
                </SwiperSlide>
                ))}
        </Swiper>
        </section>
    );
};

export default HeroBanner;