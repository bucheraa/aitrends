import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TrendCard } from "@/components/trend-card";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    // WICHTIG: Supabase-Client awaiten
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/auth/sign-in");

    const { data: bookmarks } = await supabase
        .from("bookmarks")
        .select("trends(*)")
        .eq("user_id", user.id);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Deine Bookmarks</h1>

            {bookmarks && bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookmarks.map((b: any) => (
                        <TrendCard key={b.trends.id} trend={b.trends} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 py-20">
                    Noch keine Bookmarks – entdecke Trends!
                </p>
            )}
        </div>
    );
}
