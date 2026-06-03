import type { VariantProps } from "class-variance-authority"
import { box } from "../ui/box"

type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof box> & {
    icon?: React.ReactNode
  }

export function Button({
  tone = "default",
  size = "md",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={box({
        interactive: true,
        tone,
        size,
        className,
      })}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
