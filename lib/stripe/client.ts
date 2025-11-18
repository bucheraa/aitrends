import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion weglassen → Stripe SDK wählt automatisch die neueste
});