import Button from "@/components/Button";
import ArrowDownRight from '../app/assets/icons/arrow-down-right.svg';

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-[family-name:var(--font-mabry)] text-4xl lg:text-6xl mb-4">
                Clothes Make Your Skin Bright And Comfortable.
            </h1>
            <p className="mb-4 font-[family-name:var(--font-inter)]">
                Find good clothes here that will make you beautiful and make you wear them.
            </p>
            <Button bg="#FFD568" icon={<ArrowDownRight />} iconPosition="right">
                Clothes
            </Button>
        </header>
    );
}