import Button from "@/components/Button";
import ArrowDownRight from '../app/assets/icons/arrow-down-right.svg';
import ImagePill from "./ImagePill";

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center text-center p-4 max-w-3xl mx-auto mt-8 mb-8 gap-6">
            <h1 className="font-[family-name:var(--font-mabry)] text-2xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--primary-text)' }}>
                Clothes <ImagePill bgImage='/images/pill-image.jpg' /> Make Your Skin Bright And Comfortable.
            </h1>
            <p className="font-[family-name:var(--font-inter)] max-w-lg" style={{ color: 'var(--secondary-text)' }}>
                Find good clothes here that will make you beautiful and make your skin feel comfortable when you wear them.
            </p>
            <Button bg="#FFD568" icon={<ArrowDownRight />} iconPosition="right" scrollToId="clothes">
                Clothes
            </Button>
        </header>
    );
}