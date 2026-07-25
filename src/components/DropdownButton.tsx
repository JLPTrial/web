import React from "react";
import { twMerge } from "tailwind-merge";

import { DropdownButtonVariants, type DropdownButtonStyles } from "../ui/dropdown-button.ts";

interface DropdownButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, DropdownButtonStyles {}

export const DropdownButton = ({ className, ...props }: DropdownButtonProps) => {
    return <button className={twMerge(DropdownButtonVariants({ }), className)} {...props} />;
};