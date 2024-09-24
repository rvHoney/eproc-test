import { useState } from 'react';

interface CategoryItemProps {
    category: { id: string; name: string };
    isChecked?: boolean;
    onCategoryChange: (categoryId: string, isChecked: boolean) => void;
}

export default function CategoryItem({ category, isChecked = false, onCategoryChange }: CategoryItemProps) {
    const [checked, setChecked] = useState(isChecked);

    const handleCheckboxChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onCategoryChange(category.id, newChecked);
    };

    return (
        <div className="flex justify-between items-center">
            <span>{category.name}</span>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className="custom-checkbox ml-2"
            />
        </div>
    );
}