import React from "react";
import Brushstroke from "./Brushstroke";
import { BrushstrokeVariants, type BrushstrokeStyles } from "../ui/brushstroke";

interface BrushstrokeBoxProps extends React.HTMLAttributes<HTMLDivElement>, BrushstrokeStyles {}

export function BrushstrokeBox({ className, inkColor, textColor, size, children, ...props }: BrushstrokeBoxProps) {
    return (
        <div className={BrushstrokeVariants({inkColor, textColor, size, interactive: false, className})} {...props} >
            <Brushstroke className="w-full h-auto" />

            <div className="absolute inset-0 flex items-center justify-center text-center px-[14%] py-[9%]">
                {children}
            </div>
        </div>
    );
}