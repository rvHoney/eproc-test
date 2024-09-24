import { Product } from "./types";

interface ProductItemProps {
    product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const truncatedName = truncateText(product.name, 50);

    return (
        <div className="border border-black rounded-[5px] flex flex-col w-full h-fit transition-transform transition-shadow duration-200 hover:shadow-[4px_4px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 overflow-x-hidden overflow-y-hidden">
            <div
                className="bg-cover bg-center w-full pb-[100%] border-b border-black"
                style={{ backgroundImage: `url(${product.image})` }}
            ></div>
            <div className="p-8 flex flex-col justify-between gap-3 w-full overflow-y-auto">
                <div className="flex flex-col gap-3">
                    <h3 className="font-[family-name:var(--font-mabry)] text-[24px] line-clamp-2">
                        {truncatedName}
                    </h3>
                </div>
                <div className="self-start mt-auto bg-[#68C0FF] border border-black px-2.5 py-2">
                    ${product.price}
                </div>
            </div>
        </div>
    );
}