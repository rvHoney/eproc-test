"use client";

interface ButtonProps {
    icon?: React.ReactNode;
    bg?: string;
    onClick?: () => void;
    isRound?: boolean;
    children?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    heightClass?: string;
    widthClass?: string;
    className?: string;
    scrollToId?: string;
}

export default function Button({
    icon = null,
    bg = 'blue',
    isRound = false,
    children = null,
    iconPosition = 'left',
    heightClass = 'h-12',
    widthClass = 'w-auto',
    className = '',
    scrollToId,
}: ButtonProps) {
    const paddingClass = children ? 'px-4 py-2' : 'p-3';
    const iconMarginClass = children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';
    const borderRadiusClass = isRound ? 'rounded-full' : 'rounded-[5px]';
    const justifyContentClass = children ? 'justify-start' : 'justify-center';
    const alignItemsClass = 'items-center';

    const handleClick = () => {
        if (scrollToId) {
            const element = document.getElementById(scrollToId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            style={{ backgroundColor: bg }}
            className={`flex ${justifyContentClass} ${alignItemsClass} ${paddingClass} ${borderRadiusClass} ${heightClass} ${widthClass} border border-black transition-transform transition-shadow duration-200 font-[family-name:var(--font-mabry)] hover:shadow-[4px_4px_0_black] hover:-translate-x-0.5 hover:-translate-y-0.5 ${className}`}
        >
            {icon && iconPosition === 'left' && <span className={`w-6 h-6 ${iconMarginClass}`}>{icon}</span>}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'right' && <span className={`w-6 h-6 ${iconMarginClass}`}>{icon}</span>}
        </button>
    );
}
