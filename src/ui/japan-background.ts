import { cva, type VariantProps } from 'class-variance-authority'

export const JapanBackgroundVariants = cva(
	`fixed z-0 opacity-33 pointer-events-none inset-0
    bg-center bg-no-repeat bg-[length:125vmin] lg:bg-[length:150vmin]
    transition-transform duration-300`,
	{
		variants: {
			rotation: {
				slanted: '-rotate-30 lg:rotate-0',
				straight: 'rotate-0',
			},
		},

		defaultVariants: {
			rotation: 'slanted',
		},
	},
)

export type JapanBackgroundStyles = VariantProps<typeof JapanBackgroundVariants>
