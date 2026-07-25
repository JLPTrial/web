import { cva, type VariantProps } from 'class-variance-authority'

// Aqui, vamos definir as variantes da componente
export const TextVariants = cva(
	// Estilos que devem ser aplicados à componente independentemente da variante (classes-base)
	'text-black transition-colors duration-200',
	{
		// As variantes são as diferentes propriedades (props) que uma componente pode assumir
		variants: {
			// Por sua vez, cada propriedade pode ter vários valores diferentes
			usage: {
				page_title:
					'text-[50px] text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)] font-[900] my-5',
				title:
					'text-[30px] text-[rgb(25,25,25)] dark:text-[rgb(255,255,255)] font-[750] my-2',
				subtitle:
					'text-[20px] text-[rgb(25,25,25)] dark:text-[rgb(220,220,220)] font-[500] my-2',
				normal:
					'text-[15px] text-[rgb(50,50,50)] dark:text-[rgb(175,175,175)] font-[250] my-1',
				brushstroke_button_text:
					'text-[30px] text-[rgb(255,255,255)] font-[750] my-2',
				brushstroke_info_text:
					'text-[20px] text-[rgb(255,255,255)] font-[500] my-2'
			},

			align: {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right',
			},
		},

		defaultVariants: {
			usage: 'normal',
			align: 'left',
		},
	},
)

// Usando o tipo VariantProps para extrair o tipo que criamos no bloco de código acima e exportá-lo
export type TextStyles = VariantProps<typeof TextVariants>
