import { cn } from "@/lib/utils"; // Assume cn from clsx/tailwind-merge

export function Button({ variant = "default", className, ...props }: { variant?: "default" | "outline" | "ghost"; className?: string; [key: string]: any }) {
    const variants = {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-primary hover:bg-primary/10",
        ghost: "hover:bg-accent/10",
    };
    return <button className={cn("px-4 py-2 rounded-md transition", variants[variant], className)} {...props} />;
}