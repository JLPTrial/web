import { cva, type VariantProps } from "class-variance-authority";

// Aqui, vamos definir as variantes da componente
export const FormLabelVariants = cva
(
    // Estilos que devem ser aplicados à componente independentemente da variante (classes-base)
    "block text-sm font-medium mb-1 transition-colors duration-200", 
    {
        // As variantes são as diferentes propriedades (props) que uma componente pode assumir
        variants: {
            // Por sua vez, cada propriedade pode ter vários valores diferentes
            color: {
                primary: "text-[rgb(67,67,67)] dark:text-[rgb(255,255,255)]"
            }
        },

        // Variantes de cada propriedade da componente caso nenhuma seja especificada
        defaultVariants: {
            color: "primary"
        }
    }
);

// Usando o tipo VariantProps para extrair o tipo que criamos no bloco de código acima e exportá-lo
export type FormLabelStyles = VariantProps<typeof FormLabelVariants>; 