// lib/supabase/server.ts – CORRECTED VERSION
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js"; // ← Fixed import for SupabaseClient type
import { cookies } from "next/headers";
import type { Database } from "./types";

export const createSupabaseServerClient = (): SupabaseClient<Database> => {
    const cookieStore = cookies();

    return createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch {
                        // ignore
                    }
                },
                remove(name: string, options: any) {
                    try {
                        cookieStore.set({ name, value: "", ...options, maxAge: 0 });
                    } catch {
                        // ignore
                    }
                },
            },
        }
    );
};

export const createSupabaseAdminClient = (): SupabaseClient<Database> => {
    return createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
};