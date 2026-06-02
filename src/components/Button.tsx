import React from "react"

type ButtonVariant = "default" | "active" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  default: `
    bg-red-500
    text-shadow-red-600
    rounded-tl-2xl rounded-br-2xl
    sm:rounded-tl-none sm:rounded-tr-2xl
    sm:rounded-bl-2xl sm:rounded-br-none
    hover:bg-red-600 hover:scale-105
  `,
  active: `
    bg-red-700
    text-shadow-red-800
    rounded-tl-2xl rounded-tr-none
    rounded-bl-none rounded-br-2xl
    scale-105
  `,
  danger: `
    bg-red-900
    hover:bg-red-950
    rounded-2xl
  `,
}

const sizes: Record<ButtonSize, string> = {
  sm: `
    h-[32px]
    px-2
    text-xs
  `,
  md: `
    h-[40px]
    px-3
    text-sm
  `,
  lg: `
    h-[56px]
    px-4
    text-base
  `,
}

export function Button({
  variant = "default",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        cursor-pointer
        transition-all duration-300
        text-white
        font-bold
        sm:font-medium
        text-shadow-md
        shadow-md shadow-stone-400
        m-1
        flex items-center justify-center gap-2

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
