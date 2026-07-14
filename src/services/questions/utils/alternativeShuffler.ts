import type { QuestionModel } from '../../../models/QuestionModel'

export type AlternativeOption = {
	number: number
	text: string
}

export function getAlternativeOptions(
	question: QuestionModel,
	options: { randomize?: boolean } = {},
): AlternativeOption[] {
	const { alternatives } = question

	const alternativeOptions: AlternativeOption[] = [
		{ number: 1, text: alternatives.alternative_1 },
		{ number: 2, text: alternatives.alternative_2 },
		{ number: 3, text: alternatives.alternative_3 },
	]

	if (alternatives.alternative_4 !== null) {
		alternativeOptions.push({ number: 4, text: alternatives.alternative_4 })
	}

	return options.randomize ? shuffle(alternativeOptions) : alternativeOptions
}

// Fisher-Yates, sem mutar a lista original
// Com toda a certeza, o pessoal que fez SO vai conhecer né?
// Usei isso no meu EP1: https://github.com/MatheusSilver/MAC0422-operating-systems-2025/blob/main/EP1/ep1-matheus_silveira_feitosa/ep1.c
function shuffle<T>(items: T[]): T[] {
	const shuffled = [...items]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}
