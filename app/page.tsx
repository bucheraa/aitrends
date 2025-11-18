import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
            {/* Header / Navigation */}
            <header className="w-full py-6 px-8 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
                <div className="text-2xl font-bold tracking-tighter">AI Trends</div>
                <nav className="hidden sm:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">News</Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Tools</Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 text-center py-20">
                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent pb-2">
                    Die Zukunft der KI.
                </h1>
                <p className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
                    Entdecke die neuesten Entwicklungen, Tools und Durchbrüche in der Welt der künstlichen Intelligenz.
                    Kuratierte Einblicke für Entwickler und Enthusiasten.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button className="h-12 px-8 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                        Trends entdecken
                    </button>
                    <button className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors font-medium">
                        Newsletter abonnieren
                    </button>
                </div>
            </main>

            {/* Footer placeholder */}
            <footer className="py-8 text-center text-zinc-500 text-sm border-t border-zinc-200 dark:border-zinc-800">
                © {new Date().getFullYear()} AI Trends. Alle Rechte vorbehalten.
            </footer>
        </div>
    );
}