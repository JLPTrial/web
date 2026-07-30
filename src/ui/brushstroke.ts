import { cva, type VariantProps } from "class-variance-authority";

export const BrushstrokeVariants = cva(
    "relative inline-flex items-center justify-center overflow-visible transition-all duration-300",
    {
        variants: {
            inkColor: {
                red: "[&_svg]:text-[rgb(255,0,0)]",
                black: "[&_svg]:text-[rgb(0,0,0)]"
            },

            textColor: {
                white: "text-[rgb(255,255,255)]"
            },

            size: {
                md: "w-60 sm:w-75",
                lg: "w-full md:w-150"
            },

            interactive: {
                true: "cursor-pointer hover:scale-105 hover:[&_svg]:text-[rgb(40,40,40)]",
                false: ""
            }
        },

        defaultVariants: {
            inkColor: "red",
            textColor: "white",
            size: "md",
            interactive: false
        }
    }
);

export type BrushstrokeStyles =
    VariantProps<typeof BrushstrokeVariants>;