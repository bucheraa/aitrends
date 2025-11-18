"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = { type: "sign-in" | "sign-up" };

export function AuthForm({ type }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { error } = type === "sign-in"
            ? await supabaseClient.auth.signInWithPassword({ email, password })
            : await supabaseClient.auth.signUp({ email, password });

        if (error) setError(error.message);
        else window.location.href = "/dashboard";
    };

    const handleGoogle = async () => {
        await supabaseClient.auth.signInWithOAuth({ provider: "google" });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-80">
            <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="password">Passwort</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit">{type === "sign-in" ? "Anmelden" : "Registrieren"}</Button>
            <Button variant="outline" onClick={handleGoogle}>Mit Google</Button>
        </form>
    );
}