import React from "react";
import Brushstroke from "./Brushstroke";
import { BrushstrokeVariants, type BrushstrokeStyles } from "../ui/brushstroke";

interface BrushstrokeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BrushstrokeStyles {}

export function BrushstrokeButton({ inkColor, textColor, size, className, children, ...props }: BrushstrokeButtonProps) {
    return (
        <button className={BrushstrokeVariants({inkColor, textColor, interactive: true, className})} {...props} >
            <Brushstroke className="w-full h-auto drop-shadow-lg"/>

            <span className="absolute inset-0 flex items-center justify-center px-[14%] py-[9%] pointer-events-none">
                {children}
            </span>
        </button>
    );
}