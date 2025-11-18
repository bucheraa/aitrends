export function AffiliateTools({ affiliates }: { affiliates: any[] }) {
    return (
        <section className="mt-20 p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30">
            <h2 className="text-3xl font-bold mb-8">Die besten Tools für diesen Trend</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {affiliates.map((aff) => (
                    <a
                        key={aff.id}
                        href={aff.tool_url}
                        target="_blank"
                        rel="noopener sponsored"
                        className="flex items-center gap-4 p-6 bg-black/40 rounded-xl hover:bg-black/60 transition"
                    >
                        {aff.tool_logo_url && <img src={aff.tool_logo_url} alt="" className="w-12 h-12 rounded-lg" />}
                        <div>
                            <div className="font-bold text-lg">{aff.tool_name}</div>
                            <div className="text-sm text-gray-400">{aff.description || "Jetzt ausprobieren →"}</div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}