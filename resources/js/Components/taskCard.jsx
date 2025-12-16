export default function TaskCard({
    title,
    coinYield,
    description,
    checked = false,
    onToggle,
    type = 'daily',
}) {
    const bgColor = type === 'weekly' ? 'bg-[#087592]' : 'bg-[#4D9EB3]';

    return (
        <div className={`flex items-stretch gap-4 rounded-sm p-2 shadow-lg text-white ${bgColor}`}>
            <label className="relative flex flex-shrink-0 items-center justify-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onToggle?.(e.target.checked)}
                    className={["peer h-8 w-8 appearance-none rounded-full cursor-pointer border-2 transition-all",
                    checked ? "bg-[#0FA958] border-[#FA958]" : "bg-white border-white"].join(" ")}
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xl font-bold text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    ✓
                </span>
            </label>

            <div className="flex flex-1 flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-poppins font-semibold leading-tight">{title}</h3>

                    <div className="flex items-center gap-1">
                        <img src="Assets/coin.png" alt="Coin" className="h-4 w-4"/>
                        <div className="text-white text-xs font-poppins font-bold">
                            {coinYield}
                        </div>
                    </div>

                    <p className="text-sm leading-relaxed text-white font-poppins">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}