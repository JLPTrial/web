import { apiClient } from '../api/APIClient'
import type { StatisticResponseModel } from '../../models/StatisticsModels.ts'

export async function getStatistics(period: string = "all", level: string = "all"): Promise<StatisticResponseModel> {


    if (period === undefined || period === null || level === undefined || level === null) {
		throw new Error('Parâmetros inválidos')
	}

	if ( (typeof period === 'string' && period.trim().length === 0) || (typeof level === 'string' && level.trim().length === 0) ) {
		throw new Error('Parâmetros inválidos')
	}

    const query = new URLSearchParams({
        period,
        level,
    })

    const route: string = `/statistics?${query.toString()}`;
	return apiClient.get<StatisticResponseModel>(route)
}