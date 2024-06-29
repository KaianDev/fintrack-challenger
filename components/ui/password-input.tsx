"use client"

import { ComponentProps, useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends ComponentProps<"input"> {}

export const PasswordInput = ({
  className,
  value,
  disabled,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const disable = value === "" || value === undefined || disabled

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle", className)}
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        variant="ghost"
        size="sm"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disable}
      >
        {showPassword && !disable ? (
          <Eye size={16} aria-hidden="true" />
        ) : (
          <EyeOff size={16} aria-hidden="true" />
        )}
      </Button>

      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  )
}
