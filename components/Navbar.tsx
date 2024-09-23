import Image from 'next/image';
import Button from './Button';
import Cart from '../app/assets/icons/cart.svg';
import Search from '../app/assets/icons/search.svg';
import User from '../app/assets/icons/user.svg';
import Menu from '../app/assets/icons/menu.svg';

export default function Navbar() {
    return (
        <nav className="relative flex items-center justify-between bg-white text-black h-24">
            <div className="flex items-center space-x-8">
                <a href="#clothes" className="font-bold font-[family-name:var(--font-mabry)] hidden md:block">Clothes</a>
                <a href="#" className="font-[family-name:var(--font-mabry)] hidden md:block">About Us</a>
                <a href="#" className="font-[family-name:var(--font-mabry)] hidden md:block">Gallery</a>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={67}
                    height={57}
                />
            </div>
            <div className="flex items-center space-x-4">
                <Button icon={<Search />} bg='#68C0FF' heightClass="h-12" widthClass="w-12" className="hidden md:flex" />
                <Button icon={<Cart />} bg='#FFD568' className="hidden md:flex">0 Cart</Button>
                <Button icon={<User />} bg='#43FEAF' isRound={true} className="hidden md:flex" />
                <Button icon={<Menu />} bg='#68C0FF' heightClass="h-12" widthClass="w-12" className="flex md:hidden" />
            </div>
        </nav>
    );
}