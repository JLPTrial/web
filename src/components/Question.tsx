import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import useUser from '../hooks/useUser.ts'

import {
	listeningQuestions,
} from '../constants/SampleQuestions'
import { box } from '../ui/box.ts'
import { leaf_button } from '../ui/leaf-button-variants.ts';


export default function Question() {

	const navigate = useNavigate()

	const { user } = useUser()

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

	type PopupState = {
		message: string;
		type: "correct" | "incorrect";
	} | null;

	// 'definidor' de popup para quando o usuário responder uma questão
	const [popup, setPopup] = useState<PopupState>(null);

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
		showPopup(
			isCorrect ? "Correto!" : "Incorreto!",
			isCorrect ? "correct" : "incorrect"
		)
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


	function showPopup(message: string, type: "correct" | "incorrect", duration = 1400) {
		setPopup({ message, type });
		setTimeout(() => { setPopup(null); }, duration);
	}

	// voltar para o topo da janela quando o usuário avançar para a próxima questão
	useEffect(() => {window.scrollTo({ top: 0 }); }, [currentQuestionIndex])

	// impede o usuário de acessar esta página se não estiver logado (eu imagino que isso aqui mude quando tivermos autenticação de fato)
	if (!user.isLoggedIn) { 
		return(<Navigate to='/login' replace />)
	}

	// quando usuário terminar o batch de questões, ao invés de mostrar a próxima questão (que não existe), mostre o seguinte:
	if(isQuestionsFinished) {
		return (
			<div className='flex flex-col gap-4'>
				<div className='font-bold text-2xl p-2 self-center'>Questões finalizadas!</div>

				<button 
					className={leaf_button()}
					onClick={ handleQuestionsFinished }>
					Voltar ao Dashboard
				</button>
			</div>
		)
	}

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
							className={box()}						>
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
								<div className="flex justify-center m-2">
									{media.image_file_path && (
										<img
											src={media.image_file_path}
											className="w-full md:w-1/2 my-3 p-2 border-2 border-[rgb(230,230,230)] rounded-md"
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
										: isCorrect ? "border-[rgb(68,170,0)] bg-[rgb(190,233,161)]" // alternativa correta
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
					<button
						className={answerStatus === null && selectedAlternative !== null ? leaf_button() : leaf_button({ status: "disabled"})}
						onClick={validateAnswer}  // botão para validar resposta (e consequentemente ele também marca a questão como respondida)
						disabled={selectedAlternative === null || answerStatus !== null}  // condição para desabilitação do botão
					>
						Verificar Resposta
					</button> 

					{/* condição para mostrar o botão que leva para a próxima questão */}
					{
						answerStatus !== null && (
							<button 
								className={leaf_button()}
								onClick={isLastQuestion ? finishQuestions : nextQuestion}
							>
								{isLastQuestion ? 'Finalizar' : 'Próxima Questão'}
							</button>
						)
					}
				</div>


				{/* POPUP para quando o usuário responder a questão */}
				{
					popup && (
						<div className="fixed inset-0 flex flex-col items-center justify-center bg-black/15 z-50 animate-question-answer-backdrop">
							{popup.type === "correct" ?
								(
									<div className="flex flex-col items-center justify-center gap-10">
										<img
											src="src/assets/correct_answer.svg"
											alt="Correct"
											className="h-50 w-50 animate-question-answer-icon"
										/>

										<div className="text-[50px] font-bold text-[rgb(68,170,0)] animate-question-answer-text">
											{popup.message}
										</div>
									</div>
								)
								: 
								(
									<div className="flex flex-col items-center justify-center gap-10">
										<img
											src="src/assets/wrong_answer.svg"
											alt="Wrong"
											className="h-50 w-50 animate-question-answer-icon"
										/>

										<div className="text-[35px] font-bold text-[rgb(255,0,0)] animate-question-answer-text">
											{popup.message}
										</div>
									</div>
								)
							}
						</div>
					)
				}

			</div>
		</div>
	)
}
