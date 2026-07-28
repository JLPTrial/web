import { cva, type VariantProps } from 'class-variance-authority'

export const DropdownButtonVariants = cva(
    `border-b-4 border-red-600 py-4 rounded-xl dark:border-t-2 dark:border-x-2 dark:border-t-gray-700 dark:border-x-gray-700
	shadow-stone-400 shadow-[0_0_20px_-5px_rgba(230,230,230,0.1)] dark:shadow-none
	h-[70px] my-1 sm:mt-10 sm:mb-7 w-full
	bg-white text-[#6b6375] dark:bg-gray-900 dark:text-gray-50
    transition-colors duration-200
	flex items-center justify-start`,
    {
        // Sem variantes por enquanto
        variants: {
            usage: {
                dashboard: "cursor-pointer hover:bg-[rgb(200,200,200)] dark:hover:bg-[rgb(43,48,80)]",
                statistics: ""
            }
        },

        defaultVariants: {
        },
    },
)
export type DropdownButtonStyles = VariantProps<typeof DropdownButtonVariants>
