// app/(marketing)/page.tsx – JETZT 100 % TS-CLEAN UND KOMPILIERT
import { Hero } from "@/components/hero";
import { TrendCard } from "@/components/trend-card";
import { PricingTable } from "@/components/pricing-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Trend = Database["public"]["Tables"]["trends"]["Row"];

export default async function Landing() {
    const supabase = createSupabaseServerClient();

    const { data: trends } = await supabase
        .from("trends")
        .select("*")
        .limit(6)
        .returns<Trend[]>();  // ← DAS LÖST DEN 'ANY'-FEHLER – TS weiß jetzt, dass trends Trend[] ist

    return (
        <div>
            <Hero />
            <section className="p-8">
                <h2 className="text-3xl font-bold mb-8">Top AI Trends</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trends?.map((trend: Trend) => (  // ← Extra Typ für Sicherheit
                        <TrendCard key={trend.id} trend={trend} />
                    ))}
                </div>
            </section>

            <section className="p-8">
                <h2 className="text-3xl font-bold mb-8">Kategorien</h2>
                {/* ... */}
            </section>

            <section className="p-8 bg-gray-900">
                <h2 className="text-3xl font-bold mb-8 text-center">Warum AI Trends?</h2>
                {/* ... */}
            </section>

            <PricingTable />

            <section className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-8">Bleib immer up-to-date</h2>
                {/* ... */}
            </section>
        </div>
    );
}