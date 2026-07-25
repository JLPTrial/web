import React from "react";
import { twMerge } from "tailwind-merge";

import { LeafButtonVariants, type LeafButtonStyles } from "../ui/leaf-button-variants.ts";

interface LeafButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, LeafButtonStyles {}

export const SelectableLeafButton = ({ direction, status, shape, text_size, className, ...props }: LeafButtonProps) => {
    return <button className={twMerge(LeafButtonVariants({ direction, status, shape, text_size }), className)} {...props} />;
};