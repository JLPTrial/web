import { apiClient } from '../api/APIClient'
import type { StatisticResponseModel } from '../../models/StatisticsModels.ts'

export async function getStatistics(period: string = "all"): Promise<StatisticResponseModel> {
    let route: string = "/statistics?period=";
    route += period;
	return apiClient.get<StatisticResponseModel>(route)
}