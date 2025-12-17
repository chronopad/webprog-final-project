import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="w-full bg-[#087592] text-white px-10 py-4 flex justify-between items-center">
            {/* Logo / Title */}
            <Link href="/" className="font-fredoka text-2xl font-bold">
                WaterQuest
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6 font-poppins text-sm">
                <Link href="/inventory" className="hover:underline">
                    Inventory
                </Link>

                <button className="bg-yellow-400 text-black px-4 py-1 rounded font-semibold">
                    Lootbox
                </button>

                <button className="underline text-sm">
                    Logout
                </button>
            </nav>
        </header>
    );
}
