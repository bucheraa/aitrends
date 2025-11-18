// Generated from Supabase types or manually defined
// @ts-ignore
import {Json} from "@supabase/postgrest-js/src/select-query-parser/types";

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    username: string | null;
                    role: "free" | "pro" | "admin";
                    stripe_customer_id: string | null;
                    current_plan: "free" | "pro" | null;
                    created_at: string;
                    updated_at: string | null;
                };
                Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
                Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
            };
            trends: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    short_summary: string;
                    description: string;
                    category: string;
                    tags: string[];
                    status: "draft" | "published" | "archived";
                    source_url: string;
                    source_type: string;
                    first_seen_at: string;
                    last_updated_at: string;
                    trend_score_current: number;
                    trend_score_history: Json; // Array<{date: string, score: number}>
                    adoption_stage: "early" | "growing" | "mature";
                    market_segment: string;
                    monetization_potential_score: number;
                    automation_potential_score: number;
                    region: string | null;
                    language: string;
                    created_by: string | null;
                    updated_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["trends"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["trends"]["Row"]>;
            };
            trend_votes: {
                Row: {
                    id: number;
                    trend_id: string;
                    user_id: string;
                    score: number;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["trend_votes"]["Row"], "id" | "created_at">;
            };
            bookmarks: {
                Row: {
                    id: number;
                    user_id: string;
                    trend_id: string;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["bookmarks"]["Row"], "id" | "created_at">;
            };
            subscriptions: {
                Row: {
                    id: number;
                    user_id: string;
                    stripe_customer_id: string;
                    stripe_subscription_id: string;
                    stripe_price_id: string;
                    status: "active" | "past_due" | "canceled" | "incomplete";
                    current_period_end: string;
                    created_at: string;
                    updated_at: string | null;
                };
                Insert: Omit<Database["public"]["Tables"]["subscriptions"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["subscriptions"]["Row"]>;
            };
            webhook_logs: {
                Row: {
                    id: number;
                    source: string;
                    event_type: string;
                    payload: Json;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["webhook_logs"]["Row"], "id" | "created_at">;
            };
        };
    };
};