// components/filter-bar.tsx
"use client";

import { Select } from "./ui/select";

export function FilterBar() {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            <Select defaultValue="">
                <option value="" disabled>Kategorie wählen</option>
                <option value="agents">Agents</option>
                <option value="devtools">Dev Tools</option>
                <option value="infra">Infrastruktur</option>
            </Select>

            <Select defaultValue="30">
                <option value="7">Letzte 7 Tage</option>
                <option value="30">Letzte 30 Tage</option>
                <option value="180">Letzte 6 Monate</option>
            </Select>

            <Select defaultValue="score">
                <option value="score">Höchster Score</option>
                <option value="updated">Zuletzt aktualisiert</option>
                <option value="bookmarks">Meist bookmarked</option>
            </Select>
        </div>
    );
}