import { cva } from "class-variance-authority"

export const form_input = cva(
    `
    w-[300px]
    md:w-[400px]
    px-3
    py-2
    bg-white
    dark:bg-gray-800
    border
    border-[rgb(210,210,210)]
    dark:border-gray-600
    rounded-md
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-[rgb(0,0,0)]
    dark:focus:ring-white
    focus:border-transparent
    transition-all
    duration-150
    text-gray-900
    dark:text-gray-100
    placeholder:text-gray-400
    dark:placeholder:text-gray-500
    `,
    { variants: {} }
)
