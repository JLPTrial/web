import { cva } from "class-variance-authority"

export const form_input = cva(
    `
    w-[300px]
    md:w-[400px]
    px-3
    py-2
    bg-white
    border
    border-[rgb(210,210,210)]
    rounded-md
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-[rgb(0,0,0)]
    focus:border-transparent
    transition-all
    duration-150
    `,

    {
        variants: {
            // não há variantes por enquanto
        }
    }
)