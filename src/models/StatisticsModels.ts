// Statistics Response Model

export type StatisticResponseModel = {
	summary: Record<string, number>
	skills: Record<string, number | string>[];
	skillTags: Record<string, Record<string, number | string>[]>
	timeline: Record<string, number | string>[]
	database: Record<string, number>
}