import React from "react";
import { twMerge } from "tailwind-merge";

// Vamos importar os tipos e estilos que definimos no respectivo arquivo .ts de mesmo nome
import { TextVariants, type TextStyles } from "../ui/text.ts";

// Vamos juntar as propriedades do elemento HTML com as propriedades do estilo que criamos com o CVA para definir o nosso próprio tipo de componente
// Também estamos omitindo o atributo "color" do elemento HTML porque estamos usando esse nome na nossa componente
interface TextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, TextStyles {}

export const Text = ({ usage, align, className, ...props }: TextProps) => { 
    return (<div className={twMerge(TextVariants({ usage, align }), className)} {...props} />); 
};