import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { AffiliateTools } from "@/components/affiliate-tools";
import { SponsoredBadge } from "@/components/sponsored-badge";
import type { Database } from "@/lib/supabase/types";

export const revalidate = 3600;

export async function generateStaticParams() {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("trends").select("slug").returns<{ slug: string }[]>();

    return data?.map((t: { slug: string }) => ({ slug: t.slug })) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = createSupabaseServerClient();
    const { data: trend } = await supabase.from("trends").select("*").eq("slug", slug).single();

    if (!trend) return { title: "Trend nicht gefunden" };

    return {
        title: `${trend.title} – AI Trends`,
        description: trend.short_summary,
        openGraph: {
            title: trend.title,
            description: trend.short_summary,
            images: ["/og-image.png"],
            type: "article",
        },
        twitter: { card: "summary_large_image" },
    };
}

export default async function TrendDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = createSupabaseServerClient();
    const { data: trend } = await supabase.from("trends").select("*").eq("slug", slug).single();

    if (!trend) return <div>Trend nicht gefunden</div>;

    const { data: affiliates } = await supabase
        .from("trend_affiliates")
        .select("*")
        .eq("trend_id", trend.id)
        .order("priority", { ascending: false });

    const wordCount = (trend.content || trend.description || "").split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <SponsoredBadge trend={trend} />
            <h1 className="text-4xl font-bold mb-4">{trend.title}</h1>
            <p className="text-gray-500 mb-4">Kurzzusammenfassung: {trend.short_summary}</p>
            <div className="mb-8 text-gray-400">Lesezeit: ~{readingTime} Minuten | Score: {trend.trend_score_current}</div>

            <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                    {trend.content || trend.description || "Kein detaillierter Inhalt vorhanden."}
                </ReactMarkdown>
            </div>

            <section className="mt-12">
                <h2>Metriken</h2>
            </section>

            {affiliates && affiliates.length > 0 && (
                <AffiliateTools affiliates={affiliates} />
            )}

            <div className="mt-12 flex gap-4">
                <button className="bg-primary p-2 rounded">Zu Favoriten</button>
                <button className="bg-accent p-2 rounded">Pro-Insights freischalten</button>
            </div>
        </div>
    );
}