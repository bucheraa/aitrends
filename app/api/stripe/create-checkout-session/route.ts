import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

// NEU: Typ für eine Zeile in "profiles"
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export async function POST(req: NextRequest) {
    const { priceId } = await req.json();
    const supabase = createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let customerId: string;

    // WICHTIG: explizites Generic an from<ProfileRow>
    const { data: profile } = await supabase
        .from<ProfileRow>("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

    if (profile?.stripe_customer_id) {
        customerId = profile.stripe_customer_id;
    } else {
        const customer = await stripe.customers.create({ email: user.email });
        customerId = customer.id;

        // WICHTIG: auch hier from<ProfileRow> + normales update-Objekt
        await supabase
            .from<ProfileRow>("profiles")
            .update({
                stripe_customer_id: customerId,
            })
            .eq("id", user.id);
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/pricing`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
