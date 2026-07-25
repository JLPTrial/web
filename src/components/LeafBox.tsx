import React from "react";
import { twMerge } from "tailwind-merge";

import { LeafButtonVariants, type LeafButtonStyles } from "../ui/leaf-button-variants.ts";

interface LeafButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, LeafButtonStyles {}

export const LeafBox = ({ direction, shape, text_size, className, ...props }: LeafButtonProps) => {
    return <div className={twMerge(LeafButtonVariants({ direction, shape, text_size }), className)} {...props} />;
};