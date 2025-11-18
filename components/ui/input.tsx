import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // Für clsx

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn("border border-gray-600 bg-background p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary", className)}
            {...props}
        />
    )
);
Input.displayName = "Input";