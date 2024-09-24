import { useState, useEffect, useRef } from 'react';
import ProductItem from "./ProductItem";
import { Product } from "./types";

interface ProductListProps {
    checkedCategories: string[];
}

const productCache: { [key: string]: Product[] } = {};

export default function ProductList({ checkedCategories }: ProductListProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchProducts = async (page: number) => {
            setLoading(true);
            try {
                let allProducts: Product[] = [];
                let nextPageExists = false;

                if (checkedCategories.length > 0) {

                    const categoryProductPromises = checkedCategories.map(async (catId) => {
                        if (productCache[`${catId}-page-${page}`]) {
                            return productCache[`${catId}-page-${page}`];
                        } else {
                            const res = await fetch(`https://localhost/categories/${catId}?page=${page}`);
                            if (!res.ok) throw new Error('Failed to fetch');
                            const data = await res.json();
                            productCache[`${catId}-page-${page}`] = data['products'];
                            nextPageExists = data['hydra:view'] && data['hydra:view']['hydra:next'];
                            return data['products'];
                        }
                    });

                    const categoryProducts = await Promise.all(categoryProductPromises);
                    const productUrls = categoryProducts.flat();

                    const productDataPromises = productUrls.map(async (url) => {
                        if (productCache[url]) {
                            return productCache[url];
                        } else {
                            const res = await fetch(`https://localhost${url}`);
                            if (!res.ok) throw new Error('Failed to fetch');
                            const data = await res.json();
                            productCache[url] = data;
                            return data;
                        }
                    });

                    allProducts = await Promise.all(productDataPromises);
                } else {
                    if (productCache[`all-page-${page}`]) {
                        allProducts = productCache[`all-page-${page}`];
                    } else {
                        const res = await fetch(`https://localhost/products?page=${page}`);
                        if (!res.ok) throw new Error('Failed to fetch');
                        const data = await res.json();
                        allProducts = data['hydra:member'];
                        productCache[`all-page-${page}`] = allProducts;
                        nextPageExists = data['hydra:view'] && data['hydra:view']['hydra:next'];
                    }
                }

                setProducts(prevProducts => {
                    const newProducts = allProducts.filter(product => !prevProducts.some(p => p.id === product.id));
                    return [...prevProducts, ...newProducts];
                });
                setHasNextPage(nextPageExists);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setHasNextPage(false);
            } finally {
                setLoading(false);
            }
        };

        if (hasNextPage) {
            fetchProducts(page);
        }
    }, [checkedCategories, page]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        const lastProductElement = document.querySelector('.product-list > div:last-child');
        if (lastProductElement) {
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    setPage(prevPage => prevPage + 1);
                }
            });

            observer.current.observe(lastProductElement);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [products, hasNextPage]);


    return (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {products.filter(product => product !== undefined).map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
            {loading && (
                <div className="flex gap-5">
                    {[...Array(4)].map((_, index) => (
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
            )}
        </div>
    );
}