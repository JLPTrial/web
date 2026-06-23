import { cva } from "class-variance-authority"

export const box = cva(
        `
  text-white
  text-base
  text-shadow-md
  shadow-md shadow-stone-400
  dark:shadow-none
  bg-red-600 text-shadow-red-700
  font-bold
  sm:font-medium
  m-1
  flex items-center justify-center gap-2
  `,
        {
                variants: {
                        direction: {
                                left: `rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl `,
                                right: `rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl sm:rounded-tl-2xl sm:rounded-br-2xl sm:rounded-tr-none sm:rounded-bl-none `
                        },
                        interactive: {
                                true: "cursor-pointer transition-all duration-400 transition-all hover:scale-105 bg-gradient-to-r from-black to-black bg-no-repeat hover:bg-left bg-[length:0%_100%]",
                                false: "",
                        },
                        tone: {
                                default: "",
                                active: "bg-gradient-to-r from-black to-black bg-[length:100%_100%] scale-105 text-shadow-none",
                                danger: "bg-red-900 hover:bg-red-950",
                        },
                        size: {
                                sm: "h-[32px] px-2 text-xs",
                                md: "h-[40px] px-3 text-sm",
                                lg: "h-[56px] px-4 text-base",
                                sq: "h-[56px] w-[56px] px-4 text-base"
                        },
                        radius: {
                                normal: ` rounded-tl-2xl rounded-br-2xl `,
                                large: ` rounded-tl-[64px] rounded-br-[64px] `,
                                hero: ` rounded-tl-[120px] rounded-br-[120px] `,
                        }
                },
                defaultVariants: {
                        direction: "left",
                        interactive: false,
                        tone: "default",
                        size: "md",
                },
                compoundVariants: [
                        {
                                direction: "left",
                                radius: "normal",
                                class: ` rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl `,
                        },
                        {
                                direction: "right",
                                radius: "normal",
                                class: ` rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl sm:rounded-tl-2xl sm:rounded-br-2xl sm:rounded-tr-none sm:rounded-bl-none `,
                        },

                        {
                                direction: "left",
                                radius: "hero",
                                class: ` rounded-tl-none rounded-br-none rounded-tr-[80px] rounded-bl-[80px] sm:rounded-tr-[120px] sm:rounded-bl-[120px] `,
                        },
                        {
                                direction: "right",
                                radius: "hero",
                                class: ` rounded-tr-[80px] rounded-bl-[80px] sm:rounded-tl-[120px] sm:rounded-br-[120px] sm:rounded-tr-none sm:rounded-bl-none `,
                        },
                ]
        }
)
