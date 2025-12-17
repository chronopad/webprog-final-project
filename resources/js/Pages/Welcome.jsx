import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Home" />

            <div className="flex items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-bold text-black">
                    HELLO WORLD
                </h1>
            </div>
        </>
    );
}

Welcome.layout = page => <MainLayout>{page}</MainLayout>;
