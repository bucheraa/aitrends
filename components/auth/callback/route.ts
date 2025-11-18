import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const code = searchParams.get("code");

    if (code) {
        const supabase = createSupabaseServerClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
}