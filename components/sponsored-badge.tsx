export function SponsoredBadge({ trend }: { trend: any }) {
    if (!trend.is_sponsored) return null;
    return (
        <div className="flex items-center gap-3 text-accent mb-8">
      <span className="text-sm px-3 py-1 bg-accent/20 rounded-full">
        {trend.sponsor_label || "Sponsored"}
      </span>
            {trend.sponsor_logo_url && (
                <img src={trend.sponsor_logo_url} alt={trend.sponsored_by} className="h-8" />
            )}
            <span className="font-medium">{trend.sponsored_by}</span>
        </div>
    );
}