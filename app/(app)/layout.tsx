import "./../globals.css";
import { Navbar } from "@/components/navbar";

export const metadata = {
    title: "AI Trends",
    description: "Entdecke aufkommende KI-Trends",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de">
        <body>
        <Navbar />
        {children}
        </body>
        </html>
    );
}