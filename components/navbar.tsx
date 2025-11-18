import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <nav className="bg-background p-4 flex justify-between">
            <Link href="/">AI Trends</Link>
            <div>
                <Link href="/trends"><Button variant="ghost">Trends</Button></Link>
                <Link href="/pricing"><Button variant="ghost">Preise</Button></Link>
                <Link href="/auth/sign-in"><Button>Anmelden</Button></Link>
            </div>
        </nav>
    );
}