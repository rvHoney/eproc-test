import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import FeaturedProductItem from "./FeaturedProductItem";
import { Product } from './types';

interface ProductCarouselProps {
    products: Product[];
}

const FeaturedProductCarousel = forwardRef(({ products }: ProductCarouselProps, ref) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useImperativeHandle(ref, () => ({
        scrollNext: () => {
            if (carouselRef.current && itemRefs.current[currentIndex]) {
                const itemWidth = itemRefs.current[currentIndex]?.clientWidth || 0;
                const gap = parseFloat(getComputedStyle(carouselRef.current!).gap) || 0;
                const totalWidth = itemWidth + gap;
                const newIndex = (currentIndex + 1) % products.length;
                setCurrentIndex(newIndex);
                carouselRef.current.scrollBy({ left: totalWidth, behavior: 'smooth' });
            }
        },
        scrollPrev: () => {
            if (carouselRef.current && itemRefs.current[currentIndex]) {
                const itemWidth = itemRefs.current[currentIndex]?.clientWidth || 0;
                const gap = parseFloat(getComputedStyle(carouselRef.current!).gap) || 0;
                const totalWidth = itemWidth + gap;
                const newIndex = (currentIndex - 1 + products.length) % products.length;
                setCurrentIndex(newIndex);
                carouselRef.current.scrollBy({ left: -totalWidth, behavior: 'smooth' });
            }
        }
    }));

    useEffect(() => {
        if (carouselRef.current && itemRefs.current[currentIndex]) {
            const itemWidth = itemRefs.current[currentIndex]?.clientWidth || 0;
            const gap = parseFloat(getComputedStyle(carouselRef.current!).gap) || 0;
            const totalWidth = itemWidth + gap;
            carouselRef.current.scrollTo({ left: currentIndex * totalWidth, behavior: 'smooth' });
        }
    }, [currentIndex]);

    return (
        <div ref={carouselRef} className="flex gap-5 overflow-x-hidden">
            {products.map((product, index) => (
                <div key={index} ref={el => { itemRefs.current[index] = el; }}>
                    <FeaturedProductItem product={product} />
                </div>
            ))}
        </div>
    );
});

export default FeaturedProductCarousel;