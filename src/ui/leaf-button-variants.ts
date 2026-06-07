import { cva } from "class-variance-authority"

export const leaf_button = cva(
    `
    h-[40px]
    w-[300px]
    md:w-[400px]
    text-white
    text-base
    text-shadow-md
    shadow-md shadow-stone-400
    bg-red-600 text-shadow-red-700
    font-bold
    sm:font-medium
    m-1
    flex items-center justify-center gap-2
    cursor-pointer transition-all duration-300 hover:scale-105
    `,

    {
        variants: {
            direction: {
                left: `rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl `,
                right: `rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none `
            }
        },

        defaultVariants: {
            direction: "left"
        }
    }
)