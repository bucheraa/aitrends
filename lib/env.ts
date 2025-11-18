import { z } from "zod";

const envSchema = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_PRICE_PRO_MONTHLY: z.string(),
    STRIPE_PRICE_PRO_YEARLY: z.string(),
    STRIPE_PUBLIC_KEY: z.string(),
    N8N_WEBHOOK_SECRET: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
});

export const env = envSchema.parse(process.env);