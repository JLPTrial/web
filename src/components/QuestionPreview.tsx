import { useEffect, useState } from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth.ts'
import { getLevelTopicQuestions } from '../services/questions/QuestionService.ts'
import type { QuestionListModel } from '../models/QuestionListModel.ts'
import { AnswerStatus, QuestionLevel, QuestionTopic } from '../models/questionParams'

// Feito com ChatGPT apenas para testar a API, depois que já estiverem acostumados com o
// formato, fiquem a vontade para explodir este arquivo.

function QuestionPreviewHeader() {
	return (
		<div className="flex flex-col justify-center text-left w-full sm:max-w-[700px] min-h-[220px] p-5 self-center">
			<div className='font-bold text-5xl p-1 self-center'>Teste da API /questions</div>
			<div className='text-center text-sm text-stone-500 mt-2'>Exemplo da listagem oficial de questões do backend</div>
		</div>
	)
}

const INITIAL_PAGE = 1
const LIMIT = 5
const ANSWER_STATUS = AnswerStatus.All
const previewLevel = QuestionLevel.N5
const previewTopic = QuestionTopic.Listening

export default function QuestionPreview() {
	const { authStatus } = useRequireAuth()
	const [questionsResponse, setQuestionsResponse] = useState<QuestionListModel | null>(null)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(INITIAL_PAGE)

	
	useEffect(() => {
		let active = true

		async function loadQuestions() {
			try {
				const response = await getLevelTopicQuestions(previewLevel, previewTopic, {
					page,
					limit: LIMIT,
					answerStatus: ANSWER_STATUS,
				})
				if (!active) {
					return
				}

				setQuestionsResponse(response)
			} catch (err) {
				if (!active) {
					return
				}

				setError(err instanceof Error ? err.message : 'Não foi possível carregar a questão.')
			} finally {
				if (active) {
					setIsLoading(false)
				}
			}
		}

		void loadQuestions()

		return () => {
			active = false
		}
	}, [page])

	if (authStatus === 'pending') {
		return <div className='p-8 text-center'>Carregando sessão...</div>
	}

	if (authStatus === 'unauthenticated') {
		return null
	}

	const questions = questionsResponse?.items ?? []
	const total = questionsResponse?.total ?? 0
	const totalPages = Math.max(1, Math.ceil(total / LIMIT))

	return (
		<div className='flex flex-col gap-8 w-full max-w-[1200px] mx-auto sm:px-10'>
			<QuestionPreviewHeader />

			<div className='border-2 border-stone-200 rounded-md p-5 bg-white shadow-sm'>
				{isLoading ? (
					<div>Carregando questão do backend...</div>
				) : error ? (
					<div className='text-red-600'>{error}</div>
				) : questionsResponse ? (
					<div className='space-y-5'>
						<div className='border-2 border-stone-200 rounded-md p-5 my-3'>
									<div className='font-bold text-2xl p-2 self-center'>Rota /levels/{previewLevel}/topics/{previewTopic}/questions</div>
								<div className='text-sm text-stone-500 px-2 pb-2 flex items-center gap-4'>
									<div>Answer status: {ANSWER_STATUS}</div>
									<div>Página: {page} / {totalPages}</div>
									<div>Limite: {LIMIT}</div>
									<div>Olhe o payload lá em baixo, tem coisas úteis para estatísticas</div>
									<div className='ml-auto flex items-center gap-2'>
										<button
											onClick={() => setPage((p) => Math.max(1, p - 1))}
											disabled={page <= 1}
											className='px-3 py-1 border rounded disabled:opacity-50'
										>
											Prev
										</button>
										<button
											onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
											disabled={page >= totalPages}
											className='px-3 py-1 border rounded disabled:opacity-50'
										>
											Next
										</button>
									</div>
								</div>

							<div className='space-y-4'>
								{questions.map((question) => (
									<div key={question.id} className='border-2 border-[rgb(230,230,230)] rounded-md p-4 shadow-sm'>
										<div className='font-bold text-xl mb-2'>Questão #{question.id}</div>
										<div className='text-sm text-stone-500 mb-2'>{question.question_type}</div>
										<div className='m-2 my-3 p-2 pl-4 border-2 border-[rgb(230,230,230)] rounded-md shadow'>
											{question.statement.question_command}
										</div>
										<div className='m-2 mb-4 p-2 pl-4 border-2 border-[rgb(230,230,230)] rounded-md shadow'>
											{question.question_text}
										</div>
										<div className='flex flex-col gap-2 mt-4'>
											{[
												question.alternatives.alternative_1,
												question.alternatives.alternative_2,
												question.alternatives.alternative_3,
												question.alternatives.alternative_4,
											].map((alternative, index) => {
												if (!alternative) {
													return null
												}

												return (
													<div
														key={index}
														className='flex items-center gap-2 border-2 rounded-md p-2 m-2 my-1 shadow transition-all bg-white border-[rgb(230,230,230)]'
													>
														<div className='h-4 w-4 ml-1 rounded-full border border-[rgb(255,0,0)]' />
														<p className='pl-2'>{alternative}</p>
													</div>
												)
											})}
										</div>
									</div>
								))}
							</div>

							<div className='border-2 border-stone-200 rounded-md p-5 bg-white shadow-sm'>
								<div className='font-semibold mb-2'>Payload bruto</div>
								<pre className='whitespace-pre-wrap text-sm overflow-auto'>{JSON.stringify(questionsResponse, null, 2)}</pre>
							</div>
						</div>
						</div>
				) : null}
			</div>
		</div>
	)
}