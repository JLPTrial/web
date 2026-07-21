import React from "react";
import { twMerge } from "tailwind-merge";

// Vamos importar os tipos e estilos que definimos no respectivo arquivo .ts de mesmo nome
import { ContentBoxVariants, type ContentBoxStyles } from "../ui/content-box.ts";

// Vamos juntar as propriedades do elemento HTML com as propriedades do estilo que criamos com o CVA para definir o nosso próprio tipo de componente
// Também estamos omitindo o atributo "color" do elemento HTML porque estamos usando esse nome na nossa componente
interface ContentBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, ContentBoxStyles {}

export const ContentBox = ({ color, usage, className, ...props }: ContentBoxProps) => { 
    return (<div className={twMerge(ContentBoxVariants({ color, usage }), className)} {...props} />); 
};