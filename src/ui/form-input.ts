import { cva, type VariantProps } from "class-variance-authority";

// Aqui, vamos definir as variantes da componente
export const FormInputVariants = cva
(
	// Estilos que devem ser aplicados à componente independentemente da variante (classes-base)
	`
	w-[300px] md:w-[475px]
	px-3 py-2
	border rounded-md
	shadow-sm
	focus:outline-none focus:ring-2 focus:border-transparent
	transition-all duration-150
	`,
	{
		// As variantes são as diferentes propriedades (props) que uma componente pode assumir
		variants: {
			// Por sua vez, cada propriedade pode ter vários valores diferentes
			color: {
				primary: `bg-[rgb(255,255,255)]               dark:bg-[rgb(17,24,39)]
						  border-[rgb(210,210,210)]           dark:border-[rgb(86,86,86)]
						  focus:ring-[rgb(0,0,0)]             dark:focus:ring-[rgb(255,255,255)]
						  text-[rgb(27,27,27)]                dark:text-[rgb(244,244,244)]
						  placeholder:text-[rgb(163,163,163)] dark:placeholder:text-[rgb(116,116,116)]`
			}
		},

		// Variantes de cada propriedade da componente caso nenhuma seja especificada
		defaultVariants: {
			color: "primary"
		}
	}
);

// Usando o tipo VariantProps para extrair o tipo que criamos no bloco de código acima e exportá-lo
export type FormInputStyles = VariantProps<typeof FormInputVariants>;