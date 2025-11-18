import Link from "next/link";
import { Card } from "./ui/card"; // Stelle sicher, dass Card existiert (siehe unten)
import { SponsoredBadge } from "./sponsored-badge";
import { Database } from "@/lib/supabase/types"; // Typen importieren

type Trend = Database["public"]["Tables"]["trends"]["Row"];

export function TrendCard({ trend }: { trend: Trend }) {
    return (
        <Card className="p-4 bg-black/50 backdrop-blur-md border border-gray-700 hover:shadow-glow transition">
            <Link href={`/trends/${trend.slug}`}>
                <SponsoredBadge trend={trend} />
                <h3 className="text-xl font-bold mb-2">{trend.title}</h3>
                <p className="text-gray-400 mb-4">{trend.short_summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {trend.tags.map((tag) => (
                        <span key={tag} className="text-sm bg-accent/20 px-2 py-1 rounded">{tag}</span>
                    ))}
                </div>
                <span className="badge bg-primary text-white px-3 py-1 rounded-full">Score: {trend.trend_score_current}</span>
            </Link>
        </Card>
    );
}