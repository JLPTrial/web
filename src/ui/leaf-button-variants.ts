import { cva, type VariantProps } from "class-variance-authority"

export const LeafButtonVariants = cva(
    `
    text-white text-shadow-md font-bold sm:font-medium m-1
    shadow-md shadow-[rgb(163,163,163)] dark:shadow-none 
    flex items-center justify-center gap-2
    
    bg-gradient-to-r from-black to-black bg-no-repeat bg-left bg-[length:0%_100%]
    transition-all duration-500
    `,

    {
        variants: {
            direction: {
                left: `rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl`,
                right: `rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none `
            },
            status: {
                selected: `bg-[rgb(255,0,0)] bg-[length:100%_100%] scale-105 text-shadow-none hover:scale-105 cursor-pointer`,
                enabled: `bg-[rgb(255,0,0)] text-shadow-[rgb(150,0,0)] hover:scale-105 cursor-pointer`,
                disabled: `bg-[rgb(152,152,152)] text-shadow-[rgb(100,100,100)] cursor-not-allowed`,
                not_a_button: `bg-[rgb(255,0,0)]`
            },
            shape: {
                square: `h-[50px] w-[50px]`,                              // used at the audio player at Question.tsx
                rectangle: `h-[40px] w-[300px] md:h-[50px] md:w-[200px]`,  // used at Question.tsx and at login/signup screens
                filter: `h-[60px] px-5`,
                competency: `h-[40px] sm:w-[160px] w-full sm:rounded-tl-none sm:rounded-br-none sm:rounded-tr-2xl sm:rounded-bl-2xl`,
                tag: `h-[40px] px-5`
            },
            text_size: {
                smaller: `text-sm`,
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
export type LeafButtonStyles = VariantProps<typeof LeafButtonVariants>