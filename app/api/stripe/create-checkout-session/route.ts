import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";

type ProfileStripeCustomer = {
    stripe_customer_id: string | null;
};

export async function POST(req: NextRequest) {
    const { priceId } = await req.json();
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create Stripe customer
    let customerId: string;

    // Profil auslesen (nur stripe_customer_id)
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single<ProfileStripeCustomer>();

    if (profileError) {
        console.error("Supabase profile error:", profileError);
        return NextResponse.json({ error: "Profile lookup failed" }, { status: 500 });
    }

    if (profile?.stripe_customer_id) {
        customerId = profile.stripe_customer_id;
    } else {
        const customer = await stripe.customers.create({
            email: user.email ?? undefined,
        });

        customerId = customer.id;

        // Typ-„Workaround“: hier Supabase als any, um das never-Problem zu umgehen
        await (supabase as any)
            .from("profiles")
            .update({ stripe_customer_id: customerId })
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
