import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import useUser from '../hooks/useUser.ts'
import { getQuestion } from '../services/questions/QuestionService.ts'
import type { QuestionModel } from '../models/QuestionModel.ts'


// Feito com ChatGPT apenas para testar a API, depois que já estiverem acostumados com o
// formato, fiquem a vontade para explodir este arquivo.

function QuestionPreviewHeader() {
	return (
		<div className="flex flex-col justify-center text-left w-full sm:max-w-[700px] min-h-[220px] p-5 self-center">
			<div className='font-bold text-5xl p-1 self-center'>Teste da API</div>
		</div>
	)
}

const questionNumber = 314;

export default function QuestionPreview() {
	const { user } = useUser()
	const [question, setQuestion] = useState<QuestionModel | null>(null)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	
	useEffect(() => {
		let active = true

		async function loadQuestion() {
			try {
				const response = await getQuestion(questionNumber)
				console.log(response)
				if (!active) {
					return
				}

				setQuestion(response)
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

		void loadQuestion()

		return () => {
			active = false
		}
	}, [])

	if (!user.isLoggedIn) {
		return <Navigate to='/login' replace />
	}

	const media = question?.media ?? null
	const alternatives = question
		? [
			question.alternatives.alternative_1,
			question.alternatives.alternative_2,
			question.alternatives.alternative_3,
			question.alternatives.alternative_4,
		]
		: []

	return (
		<div className='flex flex-col gap-8 w-full max-w-[1200px] mx-auto sm:px-10'>
			<QuestionPreviewHeader />

			<div className='border-2 border-stone-200 rounded-md p-5 bg-white shadow-sm'>
				{isLoading ? (
					<div>Carregando questão do backend...</div>
				) : error ? (
					<div className='text-red-600'>{error}</div>
				) : question ? (
					<div className='space-y-5'>
						<div className='border-2 border-stone-200 rounded-md p-5 my-3'>
							<div className='font-bold text-2xl p-2 self-center'>Questão {questionNumber}</div>

							<div className="flex flex-wrap gap-4 p-1">
								{question.tags.map((tag, index) => (
									<div
										key={index}
										className='text-white text-base px-3 p-1 text-shadow-md shadow shadow-stone-400 bg-red-500 text-shadow-red-600 rounded-tl-2xl rounded-br-2xl sm:rounded-tl-none sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-none'
									>
										{tag}
									</div>
								))}
							</div>

							<br></br>

							<div className='m-2 my-3 p-2 pl-4 border-2 border-[rgb(230,230,230)] rounded-md shadow'>
								{question.statement.question_command}
							</div>

							{media !== null && (
								<>
									{media.audio_file_path && (
										<div className='flex justify-center m-2 my-5'>
											<audio
												src={media.audio_file_path}
												controls
												className="w-full p-2 shadow-md rounded-full border border-[rgb(230,230,230)]"
											/>
										</div>
									)}
									{media.image_file_path && (
										<div className="flex justify-center">
											<img
												src={media.image_file_path}
												className="w-1/2 my-3 border-2 border-[rgb(230,230,230)] rounded-md"
											/>
										</div>
									)}
								</>
							)}

							<div className='m-2 mb-8 p-2 pl-4 border-2 border-[rgb(230,230,230)] rounded-md shadow'>
								{question.question_text}
							</div>

							<div className='flex flex-col gap-2 mt-4'>
								{alternatives.map((alternative, index) => {
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

						<div className='border-2 border-stone-200 rounded-md p-5 bg-white shadow-sm'>
							<div className='font-semibold mb-2'>Payload bruto</div>
							<pre className='whitespace-pre-wrap text-sm overflow-auto'>{JSON.stringify(question, null, 2)}</pre>
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}