export default function ItemCard({
    imageSrc,
    name,
    rarity,
}) {
    return (
        <div className="flex flex-col gap-3 rounded-sm bg-[#4D9EB3] shadow-lg p-4 w-full max-w-sm">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg flex items-center justify-center">
                {imageSrc ? (
                    <img src={imageSrc} alt={name || "Item image"} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-white text-sm font-fredoka">No Image ):</span>
                )}
            </div>
            <div className="text-md lg:text-lg font-poppins font-semibold text-white text-center">
                {name}
            </div>
            <div className="text-sm font-poppins text-white text-center">
                {rarity}
            </div>
        </div>
    );
}