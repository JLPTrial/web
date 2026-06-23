import type { QuestionModel } from './QuestionModel.ts'

export type QuestionListModel = {
	page: number
	limit: number
	total: number
	items: QuestionModel[]
}