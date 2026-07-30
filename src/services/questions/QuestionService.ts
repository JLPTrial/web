import { apiClient } from '../api/APIClient'
import type { QuestionListModel } from '../../models/QuestionListModel.ts'
import { formatPath, formatStatisticsPath } from './utils/requestFormatter.ts'
import type { GetQuestionsQueryParams, GetStatisticsQueryParams, QuestionLevelConstants, QuestionTopicConstants } from '../../models/questionParams'
import type { QuestionStatisticsModel, RegisterQuestionRequest, RegisterQuestionResponse } from '../../models/QuestionRegisterModel'
import { QuestionLevel } from '../../models/questionParams'

// Usem este arquivo para definir as outras rotas que o Davi vai criar
// Ou criem outro se precisarem de algo além das questões.

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

export async function registerQuestion(body: RegisterQuestionRequest): Promise<RegisterQuestionResponse> {
	return apiClient.post<RegisterQuestionResponse>('/questions/register', body)
}

export async function getQuestionStatistics(params: GetStatisticsQueryParams = {}): Promise<QuestionStatisticsModel> {
	return apiClient.get<QuestionStatisticsModel>(formatStatisticsPath(params))
}

export async function getMockTest(level: QuestionLevelConstants = QuestionLevel.N4): Promise<QuestionListModel> {

	if (level === undefined || level === null) {
		throw new Error('Parâmetros inválidos')
	}

    const route = `/questions/mock/${level}/`

	return apiClient.get<QuestionListModel>(route)
}
