"use client";
import { useState } from 'react';
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";

export default function ProductByCategory() {
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

    const handleCategoryChange = (category: string, isChecked: boolean) => {
        setCheckedCategories(prev =>
            isChecked ? [...prev, category] : prev.filter(c => c !== category)
        );
    };

    return (
        <div className="overflow-hidden mb-16" id="clothes">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-[family-name:var(--font-mabry)] text-[24px] mb-6">Categories</h3>
            </div>
            <div className="flex gap-8 flex-col md:flex-row">
                <CategoryList onCategoryChange={handleCategoryChange} />
                <ProductList checkedCategories={checkedCategories} />
            </div>
        </div>
    );
}