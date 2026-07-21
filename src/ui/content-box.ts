import { cva, type VariantProps } from "class-variance-authority";

// SETTINGS
// flex flex-col gap-4

// DASHBOARD
// flex flex-col justify-around items-center text-center border-2 border-stone-200 rounded-xl m-2
// bg-white text-[#6b6375] dark:bg-gray-900 dark:text-gray-50'>

// QUESTIONS
// rounded-md p-5 my-3


// Aqui, vamos definir as variantes da componente
export const ContentBoxVariants = cva
(
    // Estilos que devem ser aplicados à componente independentemente da variante (classes-base)
    "border-2 shadow-sm transition-colors duration-200",
    {
        // As variantes são as diferentes propriedades (props) que uma componente pode assumir
        variants: {
            // Por sua vez, cada propriedade pode ter vários valores diferentes
            color: {
                primary: `border-[rgb(229,229,229)] dark:border-[rgb(128,128,128)]
                          bg-[rgb(255,255,255)]     dark:bg-[rgb(17,24,39)]`
            },
            usage: {
                panel: "rounded-md p-5",
                card: "rounded-xl p-2"
            }
        },

        // Variantes de cada propriedade da componente caso nenhuma seja especificada
        defaultVariants: {
            color: "primary",
            usage: "panel"
        }
    }
);

// Usando o tipo VariantProps para extrair o tipo que criamos no bloco de código acima e exportá-lo
export type ContentBoxStyles = VariantProps<typeof ContentBoxVariants>;