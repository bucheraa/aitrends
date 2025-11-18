import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TrendCard } from "@/components/trend-card";
import { PricingTable } from "@/components/pricing-table";
import type { Database } from "@/lib/supabase/types";

type Trend = Database["public"]["Tables"]["trends"]["Row"];

export default async function HomePage() {
    const supabase = await createSupabaseServerClient(); // FIXED

    const { data: trends } = await supabase
        .from("trends")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<Trend[]>();

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <section className="mb-16">
                <h1 className="text-4xl font-bold mb-4">
                    Die neuesten AI Trends
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trends?.map((trend) => (
                        <TrendCard key={trend.id} trend={trend} />
                    ))}
                </div>
            </section>

            <PricingTable />
        </main>
    );
}
