import { createSupabaseServerClient } from "../supabase/server";

// Server-side helper
export async function withProAccess(action: () => Promise<any>) {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "pro") throw new Error("Pro access required");

    return action();
}

// Client-side hook (use in client components)
import { useEffect, useState } from "react";
import { supabaseClient } from "../supabase/client";

export function useIsPro() {
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        supabaseClient.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                supabaseClient.from("profiles").select("role").eq("id", user.id).single().then(({ data }) => {
                    setIsPro(data?.role === "pro");
                });
            }
        });
    }, []);

    return isPro;
}