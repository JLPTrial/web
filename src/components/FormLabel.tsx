import React from "react";

// Vamos importar os tipos e estilos que definimos no respectivo arquivo .ts de mesmo nome
import { FormLabelVariants, type FormLabelStyles } from "../ui/form-label.ts";

// Vamos juntar as propriedades do elemento HTML com as propriedades do estilo que criamos com o CVA para definir o nosso próprio tipo de componente
// Também estamos omitindo o atributo "color" do elemento HTML porque estamos usando esse nome na nossa componente
interface FormLabelProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">, FormLabelStyles {}

export const FormLabel = ({ color, ...props }: FormLabelProps) => {
    return <label className={FormLabelVariants({ color })} {...props} />;
};