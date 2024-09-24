import { useState, useEffect } from 'react';
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
    onCategoryChange: (categoryId: string, isChecked: boolean) => void;
}

interface Category {
    id: string;
    name: string;
}

export default function CategoryList({ onCategoryChange }: CategoryListProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://localhost/categories');
                const data = await res.json();
                setCategories(data['hydra:member']);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="border border-black p-4 rounded-[5px] w-full md:w-[300px] h-[fit-content] overflow-y-auto gap-6   md:gap-1 h-fit flex flex-row md:flex-col">
            {loading ? (
                <div className="flex flex-col gap-2">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="h-6 bg-gray-300 rounded animate-pulse"></div>
                    ))}
                </div>
            ) : (
                categories.map(category => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        onCategoryChange={onCategoryChange}
                    />
                ))
            )}
        </div>
    );
}