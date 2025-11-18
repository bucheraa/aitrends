import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";

export async function POST() {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single();
    if (!profile?.stripe_customer_id) {
        return NextResponse.json({ error: "No customer ID" }, { status: 400 });
    }

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${env.NEXT_PUBLIC_SITE_URL}/dashboard`,
        });
        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe portal error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}