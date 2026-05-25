import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import useUser from '../hooks/useUser.ts'

import {
	grammarQuestions,
	listeningQuestions,
	readingQuestions,
	kanjiQuestions,
	vocabularyQuestions
} from '../constants/SampleQuestions'


export default function Question() {

	const navigate = useNavigate()

	const { user } = useUser()

	// impede o usuário de acessar esta página se não estiver logado (eu imagino que isso aqui mude quando tivermos autenticação de fato)
	if (!user.isLoggedIn) { 
		return(<Navigate to='/login' replace />)
	}

	// 'definidor' da questão atual em que o usuário se encontra
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

	// será verdadeiro se o usuário estiver na última questão do batch de questões
	const isLastQuestion = currentQuestionIndex + 1 >= listeningQuestions.length

	// 'definidor' do estado do batch de questões (este estado será verdadeiro quando o user clicar no botão 'finalizar' na última questão do batch)
	const [isQuestionsFinished, setIsQuestionsFinished] = useState(false)

	// 'definidor' da alternativa atualmente selecionada pelo usuário na questão atual
	const [selectedAlternative,  setSelectedAlternative]  = useState<number | null>(null)

	// 'definidor' do estado de resposta da questão [não respondido -> null, respondido -> true/false]
	const [answerStatus, setAnswerStatus] = useState<boolean | null>(null)

	// 'definidor' de popup para quando o usuário responder uma questão
	const [popup, setPopup] = useState<string | null>(null);

	// questão atualmente sendo mostrada
	const currentQuestion = listeningQuestions[currentQuestionIndex]
	/* 
		OBSERVAÇÃO: por enquanto estamos considerando que o batch (lote) de questões são apenas as questões de
		export const <question_type>Questions: QuestionModel[],
		que é uma lista pequena de questões de um dado tipo. Essas questões estão sendo lidas de 'SampleQuestions.ts'.
	*/

	// mídia da questão (imagem, áudio e transcrição do áudio)
	const media = currentQuestion.media


	const alternatives = [
		currentQuestion.alternatives.alternative_1,
		currentQuestion.alternatives.alternative_2,
		currentQuestion.alternatives.alternative_3,
		currentQuestion.alternatives.alternative_4
	]


	function validateAnswer() {
		if(selectedAlternative === null) { return }  // se nenhuma alternativa for selecionada

		const isCorrect = selectedAlternative === currentQuestion.alternatives.correct_alternative
		setAnswerStatus(isCorrect)
		isCorrect ? showPopup("Resposta correta!") : showPopup("Resposta incorreta!") ;
	}


	function nextQuestion() {
		setCurrentQuestionIndex((previous) => previous + 1)

		setSelectedAlternative(null)  // define que nenhuma alternativa está selecionada
		setAnswerStatus(null)         // define que a questão ainda não foi respondida
	}


	function finishQuestions() {
		setIsQuestionsFinished(true)
	}


	function handleQuestionsFinished() {
		navigate('/')
	}


	function showPopup(message: string, duration = 1000) {
		setPopup(message);
		setTimeout(() => { setPopup(null); }, duration);
	}


	// quando usuário terminar o batch de questões, ao invés de mostrar a próxima questão (que não existe), mostre o seguinte:
	if(isQuestionsFinished) {
		return (
			<div className='flex flex-col gap-4'>
				<div className='font-bold text-2xl p-2 self-center'>Questões finalizadas!</div>

				<button 
					className="
						bg-black
						shadow-2xl
						text-white
						rounded-lg
						self-center
						px-10
						py-3
						my-2
						text-l
						cursor-pointer
						hover:bg-[rgb(255,0,0)]
						transition-all
					"
					onClick={ handleQuestionsFinished }>
					Voltar ao Dashboard
				</button>
			</div>
		)
	}

	// voltar para o topo da janela quando o usuário avançar para a próxima questão
	useEffect(() => {window.scrollTo({ top: 0 }); }, [currentQuestionIndex])

	// mostrando a questão
	return(
		<div className='space-y-5'>
			<div className='border-2 border-stone-200 rounded-md p-5 my-3'>

				{/* NÚMERO DA QUESTÃO (obs: não é o id da questão) */}
				<div className='font-bold text-2xl p-2 self-center'>Questão {currentQuestionIndex +1}</div>

				{/* TAGS DA QUESTÃO */}
				<div className="flex flex-wrap gap-4 p-1">
					{currentQuestion.tags.map((tag, index) => (
						<div
							key={index}
							className='text-white text-base px-3 p-1 text-shadow-md shadow shadow-stone-400 bg-red-500 text-shadow-red-600 rounded-tl-2xl rounded-br-2xl sm:rounded-tl-none sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-none'
						>
							{tag}
						</div>
					))}
				</div>

				<br></br>

				{/* COMANDO DA QUESTÃO (e.g. 'Leia', 'Escute', etc. */}
				<div className='m-2 my-3 p-2 pl-4 border-2 border-[rgb(230,230,230)] rounded-md shadow'>
					{currentQuestion.statement.question_command}
				</div>

				{/* MÍDIA (obs: estamos verificando se não é null antes de mostrar) */}
				{
					(media !== null) && (
						<>
							{media.audio_file_path && (
								<div className='flex justify-center m-2 my-5'>
									<audio
										src={media.audio_file_path}
										controls
										className="w-full p-2 shadow-md rounded-full border border-[rgb(230,230,230)]"
									/>
								</div>)
							}
							{media.image_file_path && (
								<div className="flex justify-center">
									{media.image_file_path && (
										<img
											src={media.image_file_path}
											className="w-1/2 my-3 border-2 border-[rgb(230,230,230)] rounded-md"
										/>
									)}
								</div>)
							}
							{/* media.text_content && (<p>{media.text_content}</p>) */} {/* Acho que não é pra mostrar isso aqui */}
						</>
					)
				}

				{/* PERGUNTA DA QUESTÃO (e.g. 'Onde fulano trabalha?') */}
				<div className='m-2 mb-8 p-2 pl-4 border-2 border-[rgb(230,230,230)] rounded-md shadow'>
					{currentQuestion.question_text}
				</div>

				{/* ALTERNATIVAS */}
				<div className='flex flex-col gap-2 mt-4'>
					{	
						// vamos mapear o campo 'alternatives' das questões para os elementos <input>
						alternatives.map(
							(alternative, index) => {

								// nem todas as questões têm a mesma qtde. de alternativas, vamos tratar isso
								if(!alternative) { return(null) }

								// '+1' pois as alternativas começam em '1' e index começa em '0'
								const alternativeNumber = index + 1;

								const isSelected = (selectedAlternative === alternativeNumber);

								const isCorrect = (currentQuestion.alternatives.correct_alternative === alternativeNumber);

								// estilização das alternativas dependendo do caso
								const alternativeStyling =
									answerStatus === null ? "bg-white border-[rgb(230,230,230)] hover:border-black hover:bg-[rgb(230,230,230)] cursor-pointer" // ainda não-respondida
										: isCorrect ? "border-[rgb(0,255,0)] bg-[rgb(192,255,192)]" // alternativa correta
											: isSelected ? "border-[rgb(255,0,0)] bg-[rgb(255,192,192)]" // alternativa errada
												: "border-[rgb(230,230,230)] opacity-60"; // demais alternativas

								return(

									<label
										key={index}
										className={`flex items-center gap-2 border-2 rounded-md p-2 m-2 my-1 shadow transition-all ${alternativeStyling}`}
									>

										<input
											className="h-4 w-4 ml-1 accent-[rgb(255,0,0)] focus:outline-none"
											type='radio'  // é aquele input que permite apenas uma opção ser selecionada por vez
											name='question'
											disabled={answerStatus !== null}  // condição para desabilitação dos input
											checked={selectedAlternative === alternativeNumber}
											onClick={() => setSelectedAlternative(null)}  // desmarca a alternativa se ela já estiver selecionada
											onChange={() => setSelectedAlternative(alternativeNumber)}  // marca a nova alternativa selecionada
										/>

										<p className='pl-2'>{alternative}</p>

									</label>
								)
							}
						)
					}
				</div>
				
				{/* BOTÃO - VERIFICAR RESPOSTA */}
				<div className='flex justify-between gap-3 m-2 mt-5'>
					{(answerStatus === null) ? <button
						className="
							bg-black
							shadow-2xl
							text-white
							rounded-lg
							self-center
							px-10
							py-3
							my-2
							text-l
							cursor-pointer
							hover:bg-[rgb(255,0,0)]
							transition-all
						"

						onClick={validateAnswer}                                          // botão para validar resposta (e consequentemente ele também marca a questão como respondida)
						disabled={selectedAlternative === null || answerStatus !== null}  // condição para desabilitação do botão
					>
						Verificar Resposta
					</button> : <div></div>} {/* A div vazia é só pra manter o alinhamento do flex justify-between*/}

					{/* condição para mostrar o botão que leva para a próxima questão */}
					{
						answerStatus !== null && (
							<button 
								className="
									bg-black
									shadow-2xl
									text-white
									rounded-lg
									self-center
									px-10
									py-3
									my-2
									text-l
									cursor-pointer
									hover:bg-[rgb(255,0,0)]
									transition-all
								"
								onClick={isLastQuestion ? finishQuestions : nextQuestion}>
								{isLastQuestion ? 'Finalizar' : 'Próxima Questão'}
							</button>
						)
					}
				</div>


				{/* POPUP para quando o usuário responder a questão */}
				{
					popup && (
						<div className="fixed inset-0 flex items-center justify-center bg-black/15 z-50">
							<div className="bg-[rgb(0,0,0)] text-white px-6 py-4 rounded-xl text-lg animate-spin">{popup}</div>
						</div>
					)
				}

			</div>
		</div>
	)
}
