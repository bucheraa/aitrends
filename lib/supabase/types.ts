export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            bookmarks: {
                Row: {
                    id: number;
                    user_id: string;
                    trend_id: string;
                    created_at: string | null;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    trend_id: string;
                    created_at?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["bookmarks"]["Row"]>;
            };

            profiles: {
                Row: {
                    id: string;
                    username: string | null;
                    role: "free" | "pro" | "admin";
                    stripe_customer_id: string | null;
                    current_plan: string | null; // free | pro
                    created_at: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    id: string;
                    username?: string | null;
                    role?: "free" | "pro" | "admin";
                    stripe_customer_id?: string | null;
                    current_plan?: string | null;
                    created_at?: string | null;
                    updated_at?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
            };

            subscriptions: {
                Row: {
                    id: number;
                    user_id: string | null;
                    stripe_customer_id: string;
                    stripe_subscription_id: string;
                    stripe_price_id: string;
                    status: "active" | "past_due" | "canceled" | "incomplete" | null;
                    current_period_end: string | null;
                    created_at: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    id?: number;
                    user_id?: string | null;
                    stripe_customer_id: string;
                    stripe_subscription_id: string;
                    stripe_price_id: string;
                    status?: "active" | "past_due" | "canceled" | "incomplete" | null;
                    current_period_end?: string | null;
                    created_at?: string | null;
                    updated_at?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["subscriptions"]["Row"]>;
            };

            trend_affiliates: {
                Row: {
                    id: number;
                    trend_id: string;
                    tool_name: string;
                    tool_url: string;
                    tool_logo_url: string | null;
                    description: string | null;
                    priority: number | null;
                    created_at: string | null;
                };
                Insert: {
                    id?: number;
                    trend_id: string;
                    tool_name: string;
                    tool_url: string;
                    tool_logo_url?: string | null;
                    description?: string | null;
                    priority?: number | null;
                    created_at?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["trend_affiliates"]["Row"]>;
            };

            trend_votes: {
                Row: {
                    id: number;
                    trend_id: string | null;
                    user_id: string | null;
                    score: number | null;
                    created_at: string | null;
                };
                Insert: {
                    id?: number;
                    trend_id?: string | null;
                    user_id?: string | null;
                    score?: number | null;
                    created_at?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["trend_votes"]["Row"]>;
            };

            trends: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    short_summary: string;
                    content: string | null;
                    description: string | null;
                    category: string;
                    tags: string[];
                    status: "draft" | "published" | "archived";
                    source_url: string | null;
                    source_type: string | null;
                    first_seen_at: string | null;
                    last_updated_at: string | null;
                    trend_score_current: number | null;
                    trend_score_history: Json | null;
                    adoption_stage: "early" | "growing" | "mature" | null;
                    market_segment: string | null;
                    monetization_potential_score: number | null;
                    automation_potential_score: number | null;
                    region: string | null;
                    language: string;
                    is_sponsored: boolean | null;
                    sponsored_by: string | null;
                    sponsor_logo_url: string | null;
                    sponsor_url: string | null;
                    sponsor_label: string | null;
                    created_by: string | null;
                    updated_by: string | null;
                    created_at: string | null;
                    updated_at: string | null;
                };
                Insert: Partial<Database["public"]["Tables"]["trends"]["Row"]> & {
                    slug: string;
                    title: string;
                    short_summary: string;
                    category: string;
                };
                Update: Partial<Database["public"]["Tables"]["trends"]["Row"]>;
            };

            webhook_logs: {
                Row: {
                    id: number;
                    source: string;
                    event_type: string;
                    payload: Json;
                    created_at: string | null;
                };
                Insert: {
                    id?: number;
                    source: string;
                    event_type: string;
                    payload: Json;
                    created_at?: string | null;
                };
                Update: Partial<Database["public"]["Tables"]["webhook_logs"]["Row"]>;
            };
        };

        Functions: {};
        Enums: {
            adoption_stage: "early" | "growing" | "mature";
            subscription_status: "active" | "past_due" | "canceled" | "incomplete";
            trend_status: "draft" | "published" | "archived";
            user_role: "free" | "pro" | "admin";
        };
    };
}
