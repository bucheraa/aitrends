"use client";

import { LineChart, Line, XAxis, YAxis } from "recharts";

export function Chart({ data }: { data: { date: string; score: number }[] }) {
    return <LineChart data={data}><Line type="monotone" dataKey="score" /></LineChart>;
}