import { MetadataRoute } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types"; // Import your Supabase types

type TrendSitemapData = {
    slug: string;
    updated_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createSupabaseServerClient();
    const { data: trends } = await supabase
        .from("trends")
        .select("slug, updated_at")
        .returns<TrendSitemapData[]>(); // Explicitly type the returned data

    const staticPages = [
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/`, lastModified: new Date() },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/trends`, lastModified: new Date() },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`, lastModified: new Date() },
    ];

    const trendPages = trends?.map((trend: TrendSitemapData) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/trends/${trend.slug}`,
        lastModified: trend.updated_at || new Date(),
    })) || [];

    return [...staticPages, ...trendPages];
}