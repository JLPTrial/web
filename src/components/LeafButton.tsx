import React from "react";

import { LeafButtonVariants, type LeafButtonStyles } from "../ui/leaf-button-variants.ts";

interface LeafButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, LeafButtonStyles {}

export const LeafButton = ({ direction, status, shape, text_size, className, ...props }: LeafButtonProps) => {
    return (
        <button className={`${LeafButtonVariants({ direction, status, shape, text_size })} ${className ?? ""}`} {...props} />
    );
};