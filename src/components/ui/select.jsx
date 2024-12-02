import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export const Select = React.forwardRef(
  ({ label, options, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full rounded-lg border transition-all duration-200",
              "text-sm text-gray-900 px-3.5 py-2.5 appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
              "hover:border-gray-400",
              error
                ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
              className
            )}
            {...props}
          >
            <option hidden disabled="disabled">
              Choose an option
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        {hint && !error && (
          <p className="text-sm text-gray-500 mt-1.5">{hint}</p>
        )}

        {error && (
          <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-red-600" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
