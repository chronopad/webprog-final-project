import { Link, router, usePage } from '@inertiajs/react';
import Button from '@/Components/button';
import { useCurrency } from '@/Components/CurrencyContext';

export default function Header() {    
    const { url, props } = usePage();
    const user = props.auth.user;

    const { currency } = useCurrency();
    const coins = user ? currency : 0;

    const isActive = (path) => url === path;

    const NavLink = ({ href, children }) => (
        <Link
            href={href}
            className={`h-full flex items-end font-poppins text-xl font-bold transition-all ${
                isActive(href)
                    ? 'border-b-6 border-[#087592]'
                    : 'border-b-6 border-transparent hover:border-white hover:border-opacity-50'
            }`}
        >
            <span className='pb-2'>{children}</span>
        </Link>
    )

    return (
        <header className="w-full bg-[#22B6DB] text-white px-10 flex justify-between items-stretch">
            <div className='flex items-center gap-24 py-1'>
                <Link href="/" className="font-fredoka text-[40px] font-bold">
                    WaterQuest
                </Link>

                {user && (
                    <nav className="h-full flex items-center gap-6">
                        <NavLink href="/tasks">Tasks</NavLink>
                        <NavLink href="/inventory">Inventory</NavLink>
                    </nav>
                )}
            </div>

            {user && (
                <div className="flex items-center gap-8">
                    <div className="self-center font-poppins text-lg font-bold">
                        <img src="/Assets/coin.png" alt="Coins" className="inline-block w-6 h-6 mr-2" />
                        {coins}
                    </div>
                    <Button variant="secondary" size="not-full" className="font-medium px-4 self-center" onClick={() => router.post('/logout')}>Log Out</Button>
                </div>
            )}
        </header>
    );
}
