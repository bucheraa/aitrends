// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Turbopack ist noch nicht ready für Supabase SSR → abschalten!
    experimental: {
        turbopack: false,   // ← Das behebt ALLE cookieStore-Fehler sofort
    },
};

export default nextConfig;