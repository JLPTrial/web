import React from "react";

// Vamos importar os tipos e estilos que definimos no respectivo arquivo .ts de mesmo nome
import { FormInputVariants, type FormInputStyles } from "../ui/form-input.ts";

// Vamos juntar as propriedades do elemento HTML com as propriedades do estilo que criamos com o CVA para definir o nosso próprio tipo de componente
// Também estamos omitindo o atributo "color" do elemento HTML porque estamos usando esse nome na nossa componente
interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color">, FormInputStyles {}

export const FormInput = ({ color, usage, ...props }: FormInputProps) => {
    return <input className={FormInputVariants({ color, usage })} {...props} />;
};