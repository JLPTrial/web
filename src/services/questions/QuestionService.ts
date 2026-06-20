import { apiClient } from '../api/APIClient'
import type { QuestionModel } from '../../models/QuestionModel'
import type { QuestionListModel } from '../../models/QuestionListModel.ts'
import { formatPath } from './utils/requestFormatter.ts'
import type { GetQuestionsQueryParams, QuestionLevelConstants, QuestionTopicConstants } from '../../models/questionParams'

// Usem este arquivo para definir as outras rotas que o Davi vai criar
// Ou criem outro se precisarem de algo além das questões.

export async function getQuestion(questionId: number): Promise<QuestionModel> {
	return apiClient.get<QuestionModel>(`/questions/${questionId}`)
}

export async function getQuestions(params: GetQuestionsQueryParams = {}): Promise<QuestionListModel> {
	return apiClient.get<QuestionListModel>(formatPath(params))
}

export async function getLevelQuestions(level: QuestionLevelConstants, params: Omit<GetQuestionsQueryParams, 'level' | 'topic'> = {}): Promise<QuestionListModel> {
	return apiClient.get<QuestionListModel>(formatPath({ ...params, level }))
}

export async function getLevelTopicQuestions(
	level: QuestionLevelConstants,
	topic: QuestionTopicConstants,
	params: Omit<GetQuestionsQueryParams, 'level' | 'topic'> = {},
): Promise<QuestionListModel> {
	return apiClient.get<QuestionListModel>(formatPath({ ...params, level, topic }))
}