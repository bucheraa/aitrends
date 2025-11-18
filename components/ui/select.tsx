"use client";
import { forwardRef, SelectHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className, children, ...props }, ref) => (
        <select ref={ref} className={cn("border border-gray-600 bg-background p-2 rounded-md", className)} {...props}>
            {children}
        </select>
    )
);
Select.displayName = "Select";