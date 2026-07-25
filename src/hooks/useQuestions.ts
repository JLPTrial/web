import { useState, useCallback } from 'react'
import { getLevelQuestions, getLevelTopicQuestions, registerQuestion } from '../services/questions/QuestionService.ts'
import { AnswerStatus, QuestionLevel } from '../models/questionParams'
import type { AnswerStatusConstants, QuestionTopicConstants } from '../models/questionParams'
import type { QuestionModel } from '../models/QuestionModel.ts'

// Formato simples usado pelos componentes (bate com os IDs dos botões da Dashboard)
export type SimpleLevel = 'n4' | 'n5' | 'N4' | 'N5'
export type SimpleAnswerStatus = 'new' | 'all' | 'wrong'
export type SimpleTopic = QuestionTopicConstants | 'all'
export type SimpleLimit = '5' | '10' | '20' | '30'

export type QuestionFilters = {
    level: SimpleLevel
    topic: SimpleTopic
    answer_status: SimpleAnswerStatus
    limit: SimpleLimit
    page?: number
    random?: boolean
}

// Traduz o formato simples dos botões para o formato que a API espera
function translateFilters(filters: QuestionFilters) {
    const levelId = filters.level.toLowerCase() === 'n4' ? QuestionLevel.N4 : QuestionLevel.N5

    let answerStatus: AnswerStatusConstants
    if (filters.answer_status === 'new') {
        answerStatus = AnswerStatus.Unanswered
    } else if (filters.answer_status === 'wrong') {
        answerStatus = AnswerStatus.Incorrect
    } else {
        answerStatus = AnswerStatus.Answered
    }

    const limit = Number(filters.limit)
    const topic = filters.topic === 'all' ? undefined : filters.topic
    const page = filters.page
    const random = filters.random

    return { levelId, answerStatus, limit, topic, page, random }
}

async function fetchQuestions(filters: QuestionFilters) {
    const { levelId, answerStatus, limit, topic, page, random } = translateFilters(filters)
    const params = { answerStatus, limit, page, random }

    return topic
        ? getLevelTopicQuestions(levelId, topic, params)
        : getLevelQuestions(levelId, params)
}

export function useQuestions() {
    const [questions, setQuestions] = useState<QuestionModel[]>([])
    const [total, setTotal] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null)
    const [answerStatus, setAnswerStatus] = useState<boolean | null>(null)
    const [isFinished, setIsFinished] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const currentQuestion = questions[currentIndex] ?? null
    const totalQuestions = questions.length
    const isLastQuestion = currentIndex + 1 >= totalQuestions

    // Retorna quantas questões existem para os filtros escolhidos (sem carregar sessão)
    const getQuestionCount = useCallback(async (filters: QuestionFilters): Promise<number> => {
        try {
            const response = await fetchQuestions(filters)
            return response.total
        } catch (err) {
            console.error('Erro ao buscar contagem de questões:', err)
            return -1
        }
    }, [])

    // Busca a lista de questões para os filtros escolhidos e inicia/atualiza a sessão
    const getQuestionList = useCallback(async (filters: QuestionFilters): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetchQuestions(filters)
            setQuestions(response.items)
            setTotal(response.total)
            setCurrentIndex(0)
            setSelectedAlternative(null)
            setAnswerStatus(null)
            setIsFinished(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível carregar as questões.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const selectAlternative = useCallback((alternativeNumber: number) => {
        setSelectedAlternative((current) => {
            if (answerStatus !== null) return current // já respondida, não deixa trocar
            return current === alternativeNumber ? null : alternativeNumber
        })
    }, [answerStatus])

    const submitAnswer = useCallback(async (): Promise<boolean | null> => {
        if (selectedAlternative === null || !currentQuestion) return null

        try {
            const response = await registerQuestion({
                question_uid: currentQuestion.uid,
                selected_alternative: selectedAlternative,
            })
            const isCorrect = response.status === 'correct'
            setAnswerStatus(isCorrect)
            return isCorrect
        } catch (err) {
            console.error('Erro ao registrar resposta:', err)
            // fallback: valida localmente caso o backend esteja indisponível
            const isCorrect = selectedAlternative === currentQuestion.alternatives.correct_alternative
            setAnswerStatus(isCorrect)
            return isCorrect
        }
    }, [selectedAlternative, currentQuestion])

    const nextQuestion = useCallback(() => {
        if (isLastQuestion) {
            setIsFinished(true)
            return
        }
        setCurrentIndex((previous) => previous + 1)
        setSelectedAlternative(null)
        setAnswerStatus(null)
    }, [isLastQuestion])

    const finishSession = useCallback(() => {
        setIsFinished(true)
    }, [])

    return {
        // estado
        questions,
        total,
        currentQuestion,
        currentIndex,
        totalQuestions,
        isLastQuestion,
        isFinished,
        isLoading,
        error,
        selectedAlternative,
        answerStatus,

        // ações
        getQuestionCount,
        getQuestionList,
        selectAlternative,
        submitAnswer,
        nextQuestion,
        finishSession,
    }
}
