import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

// Oben in der Datei, nach den Imports
type StripeSubscriptionWithNumbers = Stripe.Subscription & {
    current_period_end: number;  // erzwingt den alten Typ
};

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig!, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();

    // Log event
    await supabase.from("webhook_logs").insert({
        source: "stripe",
        event_type: event.type,
        payload: event.data.object as any,
    });

    switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
            const sub = event.data.object as StripeSubscriptionWithNumbers;
            await supabase.from("subscriptions").upsert({
                user_id: sub.metadata.user_id || (await getUserIdFromCustomer(sub.customer as string, supabase)),
                stripe_customer_id: sub.customer as string,
                stripe_subscription_id: sub.id,
                stripe_price_id: sub.items.data[0].price.id,
                status: sub.status,
                current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            });
            await supabase.from("profiles").update({
                role: "pro",
                current_plan: "pro",
            }).eq("stripe_customer_id", sub.customer);
            break;
        case "customer.subscription.deleted":
            const deletedSub = event.data.object as Stripe.Subscription;
            await supabase.from("subscriptions").update({ status: "canceled" }).eq("stripe_subscription_id", deletedSub.id);
            await supabase.from("profiles").update({
                role: "free",
                current_plan: "free",
            }).eq("stripe_customer_id", deletedSub.customer);
            break;
        default:
        // Ignore other events
    }

    return NextResponse.json({ received: true });
}

async function getUserIdFromCustomer(customerId: string, supabase: any) {
    const { data } = await supabase.from("profiles").select("id").eq("stripe_customer_id", customerId).single();
    return data?.id;
}