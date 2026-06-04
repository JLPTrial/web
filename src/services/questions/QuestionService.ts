import { apiClient } from '../api/APIClient'
import type { QuestionModel } from '../../models/QuestionModel'
// Usem este arquivo para definir as outras rotas que o Davi vai criar
// Ou criem outro se precisarem de algo além das questões.

export async function getQuestion(questionId: number): Promise<QuestionModel> {
	return apiClient.get<QuestionModel>(`/questions/${questionId}`)
}