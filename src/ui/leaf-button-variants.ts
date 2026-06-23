import { cva } from "class-variance-authority"

export const leaf_button = cva(
    `
    text-white
    text-shadow-md
    shadow-md shadow-stone-400
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
            status: {
                enabled: `bg-[rgb(255,0,0)] text-shadow-red-700 cursor-pointer transition-transform duration-300 hover:scale-105`,
                disabled: `bg-[rgb(152,152,152)] text-shadow-[rgb(100,100,100)] cursor-not-allowed`
            },
            shape: {
                square: `h-[50px] w-[50px]`,                              // used at the audio player at Question.tsx
                rectangle: `h-[40px] w-[300px] md:h-[50px] md:w-[200px]`  // used at Question.tsx and at login/signup screens
            },
            text_size: {
                default: `text-base`,
                larger: `text-xl`
            }
        },

        defaultVariants: {
            direction: "left",
            status: "enabled",
            shape: "rectangle",
            text_size: "default"
        }
    }
)