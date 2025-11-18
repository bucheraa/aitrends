import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("rounded-lg border border-gray-700 bg-black/50 backdrop-blur-md", className)} {...props} />
    )
);
Card.displayName = "Card";