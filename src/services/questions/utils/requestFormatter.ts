import type { GetQuestionsQueryParams, GetStatisticsQueryParams, QuestionLevelConstants, QuestionTopicConstants } from '../../../models/questionParams'

export type QuestionPathParams = GetQuestionsQueryParams & {
	level?: QuestionLevelConstants
	topic?: QuestionTopicConstants
}

export function formatPath(params: QuestionPathParams = {}) {
	return buildQueryPath(buildBasePath(params), params)
}

export function formatStatisticsPath(params: GetStatisticsQueryParams = {}) {
	const query = new URLSearchParams()

	setQueryParam(query, 'level', params.level)
	setQueryParam(query, 'topic', params.topic)
	setQueryParam(query, 'tag', params.tag)

	return appendQueryString('/questions/statistics', query)
}

function buildBasePath(params: QuestionPathParams) {
	if (params.level !== undefined && params.topic !== undefined) {
		return `/levels/${params.level}/topics/${params.topic}/questions`
	}

	if (params.level !== undefined) {
		return `/levels/${params.level}/questions`
	}

	return '/questions'
}

function buildQueryPath(basePath: string, params: GetQuestionsQueryParams) {
	const query = new URLSearchParams()

	setQueryParam(query, 'question_id', params.questionId)
	setQueryParam(query, 'tag', params.tag)
	setQueryParam(query, 'answer_status', params.answerStatus)
	setQueryParam(query, 'page', params.page)
	setQueryParam(query, 'limit', params.limit)

	return appendQueryString(basePath, query)
}

function setQueryParam(
	query: URLSearchParams,
	key: string,
	value: string | number | undefined | null,
) {
	if (value === undefined || value === null) {
		return
	}

	if (typeof value === 'string' && value.trim().length === 0) {
		return
	}

	query.set(key, String(value))
}


function appendQueryString(basePath: string, query: URLSearchParams) {
	const queryString = query.toString()
	return queryString.length > 0 ? `${basePath}?${queryString}` : basePath
}
