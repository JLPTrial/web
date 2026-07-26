import React from "react";

import { LeafButtonVariants, type LeafButtonStyles } from "../ui/leaf-button-variants.ts";

interface LeafButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, LeafButtonStyles {}

export const LeafBox = ({ direction, status, shape, text_size, className, ...props }: LeafButtonProps) => {
    return (
        <div className={`${LeafButtonVariants({ direction, status, shape, text_size })} ${className ?? ""}`} {...props} />
    );
};