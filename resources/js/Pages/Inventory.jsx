import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const collectibles = [
    { name: 'Smiley', rarity: '★', owned: true, image: '😀' },
    { name: 'Laughing', rarity: '★', owned: true, image: '😆' },
    { name: '???', rarity: '★★', owned: false },
    { name: 'Cold Face', rarity: '★★★', owned: true, image: '🥶' },
    { name: 'Skull', rarity: '★★★', owned: true, image: '💀' },
];

export default function Inventory() {
    return (
        <MainLayout>
            <Head title="Inventory" />

            <div className="p-12">
                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Inventory
                </h1>

                <div className="grid grid-cols-5 gap-6 max-w-5xl mx-auto">
                    {collectibles.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#4FA6BD] rounded-lg p-6 text-center text-white"
                        >
                            <div className="text-5xl mb-2">
                                {item.owned ? item.image : '❓'}
                            </div>

                            <div className="font-semibold">
                                {item.owned ? item.name : '???'}
                            </div>

                            <div className="text-sm">
                                {item.rarity}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
