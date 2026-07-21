import japanBg from "../assets/japan.svg";
import React from "react";
import { JapanBackgroundVariants, type JapanBackgroundStyles } from "../ui/japan-background.ts";

interface JapanBackgroundProps extends React.HTMLAttributes<HTMLDivElement>, JapanBackgroundStyles {}

export const JapanBackground = ({ rotation, className, ...props }: JapanBackgroundProps) => {
    return (
        <div
            className={JapanBackgroundVariants({ rotation, className })}
            style={{ backgroundImage: `url(${japanBg})` }}
            {...props}
        />
    );
};
