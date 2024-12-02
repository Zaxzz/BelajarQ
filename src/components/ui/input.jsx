import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      hint,
      startIcon,
      endIcon,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

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
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              {React.cloneElement(startIcon, {
                className: "h-4 w-4 text-gray-400",
                "aria-hidden": "true",
              })}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "w-full rounded-lg border",
              "placeholder:text-gray-400 text-sm",
              "px-3.5 py-2.5",
              "focus:outline-none focus:border focus:border-black",
              "hover:border-gray-400",
              error
                ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200",
              startIcon && "pl-10",
              endIcon && "pr-10",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
              className
            )}
            {...props}
          />

          {endIcon && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {React.cloneElement(endIcon, {
                className: "h-4 w-4 text-gray-400",
                "aria-hidden": "true",
              })}
            </div>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
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

Input.displayName = "Input";
