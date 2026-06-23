// Adaptado de:
// https://basarat.gitbook.io/typescript/type-system/generics
// O objetivo era fazer com que isto fosse o mais simples e genérico
// Possível para que no futuro, possamos copiar e colar em outros projetos futuros

import { sendRequest, formatBody } from './RequestUtils'
import type { RequestBody } from './RequestUtils'

export const apiClient = {
	get<T>(path: string) {
		return sendRequest<T>(path, { method: 'GET' })
	},

	post<T>(path: string, body?: RequestBody) {
		return sendRequest<T>(path, {
			method: 'POST',
			body: formatBody(body),
		})
	},

	patch<T>(path: string, body?: RequestBody) {
		return sendRequest<T>(path, {
			method: 'PATCH',
			body: formatBody(body),
		})
	},
	delete<T>(path: string) {
		return sendRequest<T>(path, { method: 'DELETE' })
	},
}