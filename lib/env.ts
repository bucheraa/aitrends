/*
import { z } from "zod";

const envSchema = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_PRICE_PRO_MONTHLY: z.string(),
    STRIPE_PRICE_PRO_YEARLY: z.string(),
    STRIPE_PUBLIC_KEY: z.string().optional(),
    N8N_WEBHOOK_SECRET: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);*/

import { z } from "zod";

export const env = z
    .object({
        NEXT_PUBLIC_SITE_URL: z.string().url(),

        SUPABASE_URL: z.string().url(),
        SUPABASE_ANON_KEY: z.string(),
        SUPABASE_SERVICE_ROLE_KEY: z.string(),

        STRIPE_SECRET_KEY: z.string().optional(),
        STRIPE_PUBLIC_KEY: z.string().optional(),  // ✔ jetzt optional
        STRIPE_WEBHOOK_SECRET: z.string().optional(),
    })
    .parse(process.env);
