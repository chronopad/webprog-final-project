import ItemCard from "@/Components/itemCard";

export default function Inventory() {
    const items = [
        { id: 1, name: 'Iron Sword', rarity: 'Common' },
        { id: 2, name: 'Oak Bow', rarity: 'Common' },
        { id: 3, name: 'Traveler Cloak', rarity: 'Uncommon' },
        { id: 4, name: 'Steel Shield', rarity: 'Uncommon' },
        { id: 5, name: 'Crystal Wand', rarity: 'Rare' },
        { id: 6, name: 'Phoenix Feather', rarity: 'Epic' },
        { id: 7, name: 'Dragon Scale Armor', rarity: 'Legendary' },
        { id: 8, name: 'Shadow Dagger', rarity: 'Rare' },
        { id: 9, name: 'Sunburst Helm', rarity: 'Epic' },
        { id: 10, name: 'Mystic Ring', rarity: 'Legendary' },
    ];
    
    return (
        <>
            {/* background */}
            <div className="min-h-screen bg-[#087592]">
                <div className="flex justify-center">
                    {/* foreground */}
                    <div className="w-[80%] max-w-[1600px] min-h-screen flex justify-center p-16 bg-[#F9FEFF] backdrop-blur-sm border border-white/20 shadow-2xl">
                        {/* inventory panel */}
                        <div className="w-full self-center p-8 bg-[#C0DEE5] rounded-sm">
                            <h1 className="text-2xl font-poppins font-semibold text-gray-800 text-center mb-4">Inventory</h1>
                            {/* grid layout */}
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {items.map((item) => (
                                    <ItemCard key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}