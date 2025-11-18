import { forwardRef, LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
        <label ref={ref} className={cn("text-sm font-medium mb-1 block", className)} {...props} />
    )
);
Label.displayName = "Label";