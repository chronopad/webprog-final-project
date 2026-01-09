import { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrency } from "@/Components/CurrencyContext";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import TaskCard from "@/Components/taskCard";
import Button from "../Components/button";
import LootboxOverlay from "../Components/LootboxOverlay";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    // const [currency, setCurrency] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { setCurrency: setGlobalCurrency } = useCurrency();

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/tasks/data', {
                headers: { Accept: 'application/json' },
                credentials: 'same-origin',
            });

            if(!res.ok) throw new Error('Failed to fetch tasks');
            const data = await res.json();
            setTasks(data.tasks || []);
            // setCurrency(data.currency ?? 0);
            setGlobalCurrency(data.currency ?? 0);
        } catch (error) {
            setError('Unable to load tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [setGlobalCurrency]);

    useEffect(() => { loadTasks(); }, [loadTasks]);

    const handleToggle = useCallback(async (id, nextChecked) => {
        setError('');
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, checked: nextChecked } : task)));

        if(!nextChecked) return;

        try {
            const res = await fetch(`/tasks/${id}/complete`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
            });

            const data = await res.json();
            if(!res.ok || data.ok === false) throw new Error(data.error || 'Update failed');

            setGlobalCurrency(data.currency ?? 0);
            setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, checked: data.checked ?? true} : task)));
        } catch(error) {
            setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, checked: !nextChecked } : task)));
            setError('Unable to update task. Please try again.');
        }
    }, [csrfToken]);

    const dailyTasks = useMemo(() => tasks.filter((task) => task.type === 'daily'), [tasks]);
    const weeklyTasks = useMemo(() => tasks.filter((task) => task.type === 'weekly'), [tasks]);
    
// ==========================================================================

    const [unlocking, setUnlocking] = useState(false);
    const [lastUnlocked, setlastUnlocked] = useState(null);

    const [lootboxOpen, setLootboxOpen] = useState(false);
    const [lootboxPhase, setLootboxPhase] = useState("idle"); // idle | opening | revealed
    const [revealedCollectible, setRevealedCollectible] = useState(null);

    const unlockCost = 200;

    const closeLootboxOverlay = useCallback(() => {
        setLootboxOpen(false);
        setLootboxPhase("idle");
        setRevealedCollectible(null);
    }, []);

    const handleUnlock = useCallback(async () => {
        if (unlocking) return;

        setError('');
        setlastUnlocked(null);
        setUnlocking(true);

        setLootboxOpen(true);
        setLootboxPhase("opening");
        setRevealedCollectible(null);

        const startMs = Date.now();
        const minShakeMs = 900;

        try {
            const res = await fetch('/inventory/unlock', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || data.ok === false) {
                if(data.error === 'NOT_ENOUGH_CURRENCY')throw new Error('Not enough coins');
                if(data.error === 'ALL_COLLECTIBLES_OWNED') throw new Error('All collectibles already owned');
                throw new Error('Unable to open box. Please try again.');
            }

            const elapsed = Date.now() - startMs;
            if (elapsed < minShakeMs) {
                await new Promise((resolve) => setTimeout(resolve, minShakeMs - elapsed));
            }

            setGlobalCurrency(data.currency ?? 0);
            setlastUnlocked(data.collectible ?? null);

            setRevealedCollectible(data.collectible ?? null);
            setLootboxPhase("revealed");
        } catch(e) {
            setError(e?.message || 'Unable to open box. Please try again.');
            closeLootboxOverlay();
        } finally {
            setUnlocking(false);
        }
    }, [closeLootboxOverlay, csrfToken, unlocking]);

    return (
        <MainLayout>
            <Head title="Tasks" />

            <LootboxOverlay
                open={lootboxOpen}
                phase={lootboxPhase}
                collectible={revealedCollectible}
                onRequestClose={closeLootboxOverlay}
            />
            
            {/* background */}
            <div className="min-h-screen bg-[#087592]">
                <div className="flex justify-center">
                    {/* foreground */}
                    <div className="w-[90%] max-w-[1600px] min-h-screen flex justify-center p-16 bg-[#F9FEFF] backdrop-blur-sm border border-white/20 shadow-2xl">
                        <div className="w-full grid gap-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start pt-10">
                            {/* daily tasks */}
                            <div className=" p-3 bg-[#C0DEE5] rounded-sm">
                                <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-4">Daily</h1>
                                <div className="flex flex-col gap-3">
                                    {dailyTasks.map((task) => (
                                        <TaskCard key={task.id} {...task} onToggle={(checked) => handleToggle(task.id, checked)}/>
                                    ))}
                                </div>
                            </div>
                            {/* weekly tasks */}
                            <div className="p-3 bg-[#C0DEE5] rounded-sm">
                                <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-4">Weekly</h1>
                                <div className="flex flex-col gap-3">
                                    {weeklyTasks.map((task) => (
                                        <TaskCard key={task.id} {...task} onToggle={(checked) => handleToggle(task.id, checked)}/>
                                    ))}
                                </div>
                            </div>
                            {/* lootbox panel */}
                            <div className="p-3 bg-[#C0DEE5] rounded-sm">
                                <h1 className="text-3xl font-poppins font-semibold text-gray-800 mb-4 pt-0">Buy a Box</h1>
                                <div className="w-[80%] items-center justify-center flex flex-col mx-auto">
                                    <img src="Assets/present-box.png" alt="Lootbox" className="h-50 w-50 mt-20" />

                                    <div className="flex gap-1 pt-2">
                                        <img src="Assets/coin.png" alt="Coins" className="h-7 w-7"/>
                                        <div className="text-white text-xl font-poppins font-bold">
                                            {unlockCost}
                                        </div>
                                    </div>  

                                    <Button variant="secondary" className="font-semibold text-xl my-16" onClick={handleUnlock} disabled={unlocking}>{unlocking ? 'Opening...' : 'Buy and open'}</Button>

                                    {error && <div className="text-orange-400 font-poppins font-semibold -mt-10">{error}</div>}

                                    {lastUnlocked && (
                                        <div className="text-gray-800 font-poppins font-semibold -mt-10">
                                            Unlocked: {lastUnlocked.name} ({lastUnlocked.rarity})
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}