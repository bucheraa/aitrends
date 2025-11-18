import { Button } from "./button";

export function BlurOverlay({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="blur-sm">{children}</div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button>Pro-Version erforderlich – Jetzt upgraden</Button>
            </div>
        </div>
    );
}