// app/layout.tsx – DAS IST DIE EINZIGE RICHTIGE VERSION
import type { Metadata } from "next";
import "./globals.css";               // ← DAS FEHLTE! Tailwind wird jetzt geladen
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
    title: "AI Trends - Aktuelle News zur Künstlichen Intelligenz",
    description: "Die neuesten Nachrichten, Tools und Analysen aus der Welt der KI.",
    openGraph: {
        title: "AI Trends",
        description: "Bleib up-to-date mit AI Trends.",
        // images: ['/og-image.jpg'], // Ein Bild für Social Media Previews erstellen!
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" suppressHydrationWarning>
        <body className="">
        {children}
        </body>
        </html>
    );
}
