import { Product } from './types';

interface FeaturedProductItemProps {
    product: Product;
}

export default function FeaturedProductItem({ product }: FeaturedProductItemProps) {
    if (!product) {
        console.error('Product is undefined');
        return null;
    }

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const truncatedName = truncateText(product.name, 50);

    return (
        <div className="border border-black rounded-[5px] flex flex-col md:flex-row w-fit h-fit transition-transform transition-shadow duration-200 hover:shadow-[4px_4px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 overflow-x-hidden overflow-y-hidden">
            <div
                className="bg-cover bg-center h-[324px] w-[324px] border-b md:border-b-0 md:border-r border-black"
                style={{ backgroundImage: `url(${product.image})` }}
            ></div>
            <div className="p-8 flex flex-col justify-between gap-3 w-[324px] h-[324px] md:h-auto overflow-y-auto">
                <div className="flex flex-col gap-3">
                    <h3 className="font-[family-name:var(--font-mabry)] text-[24px] line-clamp-2">
                        {truncatedName}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[16px] line-clamp-3">
                        {product.description}
                    </p>
                    <a href="#" className="underline">Tops (18)</a>
                </div>
                <div className="self-start mt-auto bg-[#68C0FF] border border-black px-2.5 py-2">
                    ${product.price}
                </div>
            </div>
        </div>
    );
}