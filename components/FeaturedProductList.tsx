"use client";

import { useRef, useState, useEffect } from 'react';
import LArrowLong from '../app/assets/icons/l-arrow-long.svg';
import RArrowLong from '../app/assets/icons/r-arrow-long.svg';
import FeaturedProductCarousel from "./FeaturedProductCarousel";
import { Product } from './types';

export default function FeaturedProductList() {
    const carouselRef = useRef<{ scrollNext: () => void; scrollPrev: () => void }>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://localhost/products');
                const data = await res.json();
                setProducts(data['hydra:member']);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleScrollNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollNext();
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.min(products.length, 8));
        }
    };

    const handleScrollPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollPrev();
            setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.min(products.length, 8)) % Math.min(products.length, 8));
        }
    };

    const limitedProducts = products.slice(0, 8);

    return (
        <div className="overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-[family-name:var(--font-mabry)] text-[24px] mb-0">Featured Products</h3>
                <div className="flex items-center gap-2 font-[family-name:var(--font-mabry)]">
                    <LArrowLong className="cursor-pointer" onClick={handleScrollPrev} />
                    {limitedProducts.length > 0 ? currentIndex + 1 : 0} / {limitedProducts.length}
                    <RArrowLong className="cursor-pointer" onClick={handleScrollNext} />
                </div>
            </div>
            {loading ? (
                <div className="flex gap-5">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="border border-black rounded-[5px] flex flex-col w-[324px] h-[324px] animate-pulse">
                            <div className="bg-gray-300 h-[324px] w-[324px]"></div>
                            <div className="p-8 flex flex-col justify-between gap-3 w-[324px] h-[324px]">
                                <div className="bg-gray-300 h-6 w-3/4"></div>
                                <div className="bg-gray-300 h-4 w-full"></div>
                                <div className="bg-gray-300 h-4 w-1/2"></div>
                                <div className="bg-gray-300 h-8 w-1/4 mt-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <FeaturedProductCarousel ref={carouselRef} products={limitedProducts} />
            )}
        </div>
    );
}