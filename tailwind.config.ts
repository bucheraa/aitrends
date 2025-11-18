import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./(app)/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3B82F6",
                accent: "#A855F7",
                background: "#111827",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")], // ← KEIN /postcss !!!!
};

export default config;