import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";

type ProfileStripeCustomer = {
    stripe_customer_id: string | null;
};

export async function POST() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single<ProfileStripeCustomer>();

    if (profileError) {
        console.error("Supabase profile error:", profileError);
        return NextResponse.json({ error: "Profile lookup failed" }, { status: 500 });
    }

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
