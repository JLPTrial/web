import type { GetQuestionsQueryParams } from '../../../models/questionParams'

export function formatPath(params: GetQuestionsQueryParams = {}) {
	return buildBasePath(params)
}

function buildBasePath(params: GetQuestionsQueryParams) {
	return buildQueryPath('/questions', params)
}

function buildQueryPath(basePath: string, params: GetQuestionsQueryParams) {
	const query = new URLSearchParams()

	setQueryParam(query, 'question_id', params.questionId)
	setQueryParam(query, 'tag', params.tag)
	setQueryParam(query, 'answered', params.answered)
	setQueryParam(query, 'page', params.page)
	setQueryParam(query, 'limit', params.limit)

	return appendQueryString(basePath, query)
}

function setQueryParam(query: URLSearchParams, key: string, value: unknown) {
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
