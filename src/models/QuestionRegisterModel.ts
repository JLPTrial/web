export type RegisterQuestionRequest = {
	question_uid: string
	selected_alternative: number
}

export type RegisterQuestionResponse = {
	question_uid: string
	selected_alternative: number
	status: 'correct' | 'incorrect'
}

// total = questões existentes no grupo; 
// answered = correct + incorrect.
export type QuestionStatisticsModel = {
	total: number
	answered: number
	correct: number
	incorrect: number
}
