// app/layout.tsx – DAS IST DIE EINZIGE RICHTIGE VERSION
import type { Metadata } from "next";
import "./globals.css";               // ← DAS FEHLTE! Tailwind wird jetzt geladen
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
    title: "AI Trends – Die Zukunft der KI",
    description: "Automatisierte, datenbasierte Analyse aufstrebender KI-Trends",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className="dark">      {/* dark mode forced – sieht futuristisch aus */}
        <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        </body>
        </html>
    );
}