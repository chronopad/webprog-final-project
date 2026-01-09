export default function ItemCard({
    image,
    name,
    rarity,
}) {
    const imageIsUrl = typeof image === 'string' && /^(https?:\/\/|\/)/i.test(image);

    const looksLikeFilePath =
        typeof image === 'string' &&
        (image.includes('/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(image));

    const imageSrc =
        typeof image !== 'string'
            ? null
            : imageIsUrl
              ? image
              : looksLikeFilePath
                ? image.startsWith('storage/')
                    ? `/${image}`
                    : `/storage/${image.replace(/^\/+/, '')}`
                : null;

    return (
        <div className="flex flex-col gap-3 rounded-sm bg-[#4D9EB3] shadow-lg p-4 w-full max-w-sm">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg flex items-center justify-center">
                {image ? (
                    imageSrc ? (
                        <img src={imageSrc} alt={name || 'Item Image'} className="h-full w-full object-contain" />
                    ) : (
                        <span className="text-6xl">{image}</span>
                    )
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