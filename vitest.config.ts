import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		coverage: {
			provider: 'v8', // ou 'istanbul' :D
		},
	},
})
