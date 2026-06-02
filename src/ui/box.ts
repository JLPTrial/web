import { cva } from "class-variance-authority"

export const box = cva(
  `
  text-white
  text-base
  text-shadow-md
  shadow-md shadow-stone-400
  bg-red-500 text-shadow-red-600

  rounded-tl-2xl rounded-br-2xl
  sm:rounded-tl-none sm:rounded-tr-2xl
  sm:rounded-bl-2xl sm:rounded-br-none
  `,
  {
    variants: {
      interactive: {
        true: "cursor-pointer transition-all duration-300 hover:scale-105",
        false: "",
      },
      tone: {
        default: "",
        active: "bg-red-700 scale-105",
        danger: "bg-red-900 hover:bg-red-950",
      },
      size: {
        sm: "h-[32px] px-2 text-xs",
        md: "h-[40px] px-3 text-sm",
        lg: "h-[56px] px-4 text-base",
      },
    },
    defaultVariants: {
      interactive: false,
      tone: "default",
      size: "md",
    },
  }
)
