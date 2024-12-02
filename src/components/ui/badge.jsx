import { cn } from "@/lib/utils";
import React from "react";

const badgeVariants = {
  primary: "bg-blue-50 text-blue-700 ring-blue-600/20",
  secondary: "bg-gray-50 text-gray-600 ring-gray-500/20",
  success: "bg-green-50 text-green-700 ring-green-600/20",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  warning: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  info: "bg-purple-50 text-purple-700 ring-purple-600/20",
};

export const Badge = React.forwardRef(
  ({ className, variant = "primary", icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
          badgeVariants[variant],
          className
        )}
        {...props}
      >
        {icon && (
          <span className="mr-1 -ml-0.5">
            {React.cloneElement(icon, {
              className: "h-3.5 w-3.5",
              "aria-hidden": "true",
            })}
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
