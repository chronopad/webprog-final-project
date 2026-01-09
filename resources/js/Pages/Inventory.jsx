import { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ItemCard from '@/Components/itemCard';

export default function Inventory() {
    const [collectibles, setCollectibles] = useState([]);
    const [ownedCount, setOwnedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadInventory = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/inventory/data', {
                headers: { Accept: 'application/json' },
                credentials: 'same-origin',
            });

            if(!res.ok) throw new Error('Failed to fetch inventory');
            const data = await res.json();

            setCollectibles(data.collectibles || []);
            setOwnedCount(data.ownedCount ?? 0);
            setTotalCount(data.totalCount ?? 0);
        } catch(e) {
            setError('Unable to load inventory. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadInventory(); }, [loadInventory]);

    return (
        <MainLayout>
            <Head title="Inventory" />

            {/* background */}
            <div className="min-h-screen bg-[#087592]">
                <div className="flex justify-center">
                    {/* foreground */}
                    <div className="w-[80%] max-w-[1600px] min-h-screen flex justify-center p-16 bg-[#F9FEFF] backdrop-blur-sm border border-white/20 shadow-2xl">
                        {/* inventory panel */}
                        <div className="w-full self-center p-8 pt-4 bg-[#C0DEE5] rounded-sm">
                            <h1 className="text-2xl font-poppins font-semibold text-gray-800 text-center pb-4">Inventory</h1>

                            <div className="text-center font-poppins text-gray-700 pb-4">
                                Owned: {ownedCount}/{totalCount}
                            </div>

                            {error && (
                                <div className="text-red-700 font-poppins font-semibold text-center pb-4">
                                    {error}
                                </div>
                            )}

                            {loading ? (
                                <div className="font-poppins text-gray-700 text-center py-10">
                                    Loading...
                                </div>
                            ) : (
                                // grid layout
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {collectibles.map((item) => (
                                        <ItemCard key={item.id} {...item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
