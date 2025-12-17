import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Page content */}
            <main className="flex-1 bg-white">
                {children}
            </main>

            <Footer />
        </div>
    );
}
