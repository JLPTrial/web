import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuestions } from '../../src/hooks/useQuestions'
import {
	getLevelQuestions,
	getLevelTopicQuestions,
	registerQuestion,
} from '../../src/services/questions/QuestionService'

vi.mock('../../src/services/questions/QuestionService', () => ({
	getLevelQuestions: vi.fn(),
	getLevelTopicQuestions: vi.fn(),
	registerQuestion: vi.fn(),
}))

const mockedQuestion = {
	uid: 'question-1',
	alternatives: {
		correct_alternative: 2,
	},
}

describe('useQuestions', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('starts with the correct initial state', () => {
		const { result } = renderHook(() => useQuestions())

		expect(result.current.questions).toEqual([])
		expect(result.current.total).toBe(0)
		expect(result.current.currentQuestion).toBeNull()
		expect(result.current.currentIndex).toBe(0)
		expect(result.current.isFinished).toBe(false)
		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBeNull()
	})

	it('loads questions', async () => {
		vi.mocked(getLevelQuestions).mockResolvedValue({
			items: [mockedQuestion],
			total: 1,
		})

		const { result } = renderHook(() => useQuestions())

		await act(async () => {
			await result.current.getQuestionList({
				level: 'n5',
				topic: 'all',
				answer_status: 'all',
				limit: '10',
			})
		})

		expect(getLevelQuestions).toHaveBeenCalledOnce()
		expect(result.current.questions).toHaveLength(1)
		expect(result.current.currentQuestion?.uid).toBe('question-1')
		expect(result.current.total).toBe(1)
	})

	it('gets only the question count', async () => {
		vi.mocked(getLevelQuestions).mockResolvedValue({
			items: [],
			total: 42,
		})

		const { result } = renderHook(() => useQuestions())

		let total = 0

		await act(async () => {
			total = await result.current.getQuestionCount({
				level: 'n5',
				topic: 'all',
				answer_status: 'all',
				limit: '10',
			})
		})

		expect(total).toBe(42)
	})

	it('selects and deselects an alternative', () => {
		const { result } = renderHook(() => useQuestions())

		act(() => {
			result.current.selectAlternative(2)
		})

		expect(result.current.selectedAlternative).toBe(2)

		act(() => {
			result.current.selectAlternative(2)
		})

		expect(result.current.selectedAlternative).toBeNull()
	})

	it('submits a correct answer', async () => {
		vi.mocked(getLevelQuestions).mockResolvedValue({
			items: [mockedQuestion],
			total: 1,
		})

		vi.mocked(registerQuestion).mockResolvedValue({
			status: 'correct',
		})

		const { result } = renderHook(() => useQuestions())

		await act(async () => {
			await result.current.getQuestionList({
				level: 'n5',
				topic: 'all',
				answer_status: 'all',
				limit: '10',
			})
		})

		act(() => {
			result.current.selectAlternative(2)
		})

		let response

		await act(async () => {
			response = await result.current.submitAnswer()
		})

		expect(response).toBe(true)
		expect(result.current.answerStatus).toBe(true)
	})

	it('uses local validation if registerQuestion fails', async () => {
		vi.mocked(getLevelQuestions).mockResolvedValue({
			items: [mockedQuestion],
			total: 1,
		})

		vi.mocked(registerQuestion).mockRejectedValue(new Error())

		const { result } = renderHook(() => useQuestions())

		await act(async () => {
			await result.current.getQuestionList({
				level: 'n5',
				topic: 'all',
				answer_status: 'all',
				limit: '10',
			})
		})

		act(() => {
			result.current.selectAlternative(2)
		})

		let response

		await act(async () => {
			response = await result.current.submitAnswer()
		})

		expect(response).toBe(true)
		expect(result.current.answerStatus).toBe(true)
	})

	it('moves to the next question', async () => {
		vi.mocked(getLevelQuestions).mockResolvedValue({
			items: [mockedQuestion, { ...mockedQuestion, uid: 'question-2' }],
			total: 2,
		})

		const { result } = renderHook(() => useQuestions())

		await act(async () => {
			await result.current.getQuestionList({
				level: 'n5',
				topic: 'all',
				answer_status: 'all',
				limit: '10',
			})
		})

		act(() => {
			result.current.nextQuestion()
		})

		expect(result.current.currentIndex).toBe(1)
		expect(result.current.currentQuestion?.uid).toBe('question-2')
	})

	it('finishes when reaching the last question', async () => {
		vi.mocked(getLevelQuestions).mockResolvedValue({
			items: [mockedQuestion],
			total: 1,
		})

		const { result } = renderHook(() => useQuestions())

		await act(async () => {
			await result.current.getQuestionList({
				level: 'n5',
				topic: 'all',
				answer_status: 'all',
				limit: '10',
			})
		})

		act(() => {
			result.current.nextQuestion()
		})

		expect(result.current.isFinished).toBe(true)
	})

	it('calls getLevelTopicQuestions when a topic is provided', async () => {
		vi.mocked(getLevelTopicQuestions).mockResolvedValue({
			items: [],
			total: 0,
		})

		const { result } = renderHook(() => useQuestions())

		await act(async () => {
			await result.current.getQuestionList({
				level: 'n5',
				topic: 'grammar',
				answer_status: 'all',
				limit: '10',
			})
		})

		expect(getLevelTopicQuestions).toHaveBeenCalledOnce()
		expect(getLevelQuestions).not.toHaveBeenCalled()
	})
})
