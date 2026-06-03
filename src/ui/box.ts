import { cva } from "class-variance-authority"

export const box = cva(
        `
  text-white
  text-base
  text-shadow-md
  shadow-md shadow-stone-400
  bg-red-500 text-shadow-red-600
  font-bold
  sm:font-medium
  m-1
  flex items-center justify-center gap-2
  `,
        {
                variants: {
                        direction: {
                                left: `rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl `,
                                right: `rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none `
                        },
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
			direction:"left",
                        interactive: false,
                        tone: "default",
                        size: "md",
                },
        }
)
