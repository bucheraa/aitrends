// (app)/page.tsx → leitet einfach auf die echte Marketing-Landing weiter
import { redirect } from "next/navigation";

export default function Home() {
    redirect("/trends");
    return null;
}