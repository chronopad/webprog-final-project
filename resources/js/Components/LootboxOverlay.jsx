import { useEffect, useMemo, useState } from "react";

export default function LootboxOverlay({
    open,
    phase,
    collectible,
    onRequestClose,
}) {
    const [canClose, setCanClose] = useState(false);

    useEffect(() => {
        if (!open) {
            setCanClose(false);
            return;
        }

        if (phase === "revealed") {
            setCanClose(true);
        } else {
            setCanClose(false);
        }
    }, [open, phase]);

    const title = useMemo(() => {
        if (phase === "revealed") return "You got:";
        return "Opening...";
    }, [phase]);

    if (!open) return null;

    const handleBackdropClick = () => {
        if (!canClose) return;
        onRequestClose?.();
    };

    const showingReveal = phase === "revealed" && collectible;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div
                className="flex flex-col items-center justify-center gap-4"
            >
                <div className="text-white font-poppins font-semibold text-xl">
                    {title}
                </div>

                {!showingReveal ? (
                    <img
                        src="Assets/present-box.png"
                        alt="Lootbox"
                        className="h-52 w-52 lootbox-shake"
                        draggable={false}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={collectible.image}
                            alt={collectible.name}
                            className="h-52 w-52 lootbox-pop"
                            draggable={false}
                        />

                        <div className="text-white font-poppins font-semibold text-lg text-center">
                            {collectible.name} ({collectible.rarity})
                        </div>
                        
                        <span className="text-gray-400 font-poppins text-sm text-center">Click anywhere to close</span>
                    </div>
                )}
            </div>
        </div>
    );
}
