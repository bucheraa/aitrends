
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { AffiliateTools } from "@/components/affiliate-tools";
import { SponsoredBadge } from "@/components/sponsored-badge";
import type { Metadata } from "next";
import type { Database } from "@/lib/supabase/types";

type Trend = Database["public"]["Tables"]["trends"]["Row"];
type TrendAffiliate = Database["public"]["Tables"]["trend_affiliates"]["Row"];

export const revalidate = 3600;

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();

    const { data: trend } = await supabase
        .from("trends")
        .select("*")
        .eq("slug", slug)
        .single<Trend>();

    if (!trend) return { title: "Trend nicht gefunden" };

    return {
        title: `${trend.title} – AI Trends 2025`,
        description: trend.short_summary,
        openGraph: {
            title: trend.title,
            description: trend.short_summary,
            images: ["/og-image-trend.png"],
            type: "article",
        },
        twitter: { card: "summary_large_image" },
    };
}

export default async function TrendPage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();

    const { data: trend } = await supabase
        .from("trends")
        .select("*")
        .eq("slug", slug)
        .single<Trend>();

    if (!trend) return <div>Trend nicht gefunden</div>;

    const { data: affiliates } = await supabase
        .from("trend_affiliates")
        .select("*")
        .eq("trend_id", trend.id)
        .returns<TrendAffiliate[]>();

    const readingTime = Math.ceil(
        (trend.content || trend.description || "").split(" ").length / 200
    );

    return (
        <article className="max-w-4xl mx-auto px-6 py-12">
            <SponsoredBadge trend={trend} />
            <h1 className="text-5xl font-bold mb-6">{trend.title}</h1>
            <div className="text-gray-400 mb-12">Lesezeit: ~{readingTime} Minuten</div>

            <div className="prose prose-invert max-w-none text-lg leading-8">
                <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                    {trend.content || trend.description || "Kein Inhalt vorhanden."}
                </ReactMarkdown>
            </div>

            {affiliates && affiliates.length > 0 && (
                <AffiliateTools affiliates={affiliates} />
            )}
        </article>
    );
}
