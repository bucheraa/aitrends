import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
    slug: z.string(),
    title: z.string(),
    short_summary: z.string(),
    content: z.string().optional(), // <-- langer Artikel
    is_sponsored: z.boolean().optional(),
    sponsored_by: z.string().optional(),
    sponsor_logo_url: z.string().url().optional(),
    sponsor_url: z.string().url().optional(),
    sponsor_label: z.string().optional(),
    affiliates: z.array(z.object({
        tool_name: z.string(),
        tool_url: z.string().url(),
        tool_logo_url: z.string().url().optional(),
        description: z.string().optional(),
        priority: z.number().int().optional()
    })).optional()
});

export async function POST(req: NextRequest) {
    if (req.headers.get("X-Webhook-Token") !== process.env.N8N_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const { affiliates, ...trendData } = parsed.data;
    const supabase = createSupabaseAdminClient();

    const { data: existing } = await supabase
        .from("trends")
        .select("id")
        .eq("slug", trendData.slug)
        .single();

    let trendId: string;

    if (existing) {
        await supabase.from("trends").update(trendData).eq("id", existing.id);
        trendId = existing.id;
    } else {
        const { data: newTrend } = await supabase
            .from("trends")
            .insert(trendData)
            .select()
            .single();
        trendId = newTrend.id;
    }

    if (affiliates && affiliates.length > 0) {
        await supabase.from("trend_affiliates").delete().eq("trend_id", trendId);
        await supabase.from("trend_affiliates").insert(
            affiliates.map(a => ({ trend_id: trendId, ...a }))
        );
    }

    // Optional sofort revalidieren
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({ slug: trendData.slug }),
    });

    return NextResponse.json({ success: true });
}