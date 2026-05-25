import { useState } from 'react'
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


	// quando usuário terminar o batch de questões, ao invés de mostrar a próxima questão (que não existe), mostre o seguinte:
	if(isQuestionsFinished) {
		return (
			<div className='flex flex-col gap-4'>
				<p>Questões finalizadas!</p>

				<button onClick={ handleQuestionsFinished }>
					Voltar ao Dashboard
				</button>
			</div>
		)
	}

	// mostrando a questão
	return(
		<div className='space-y-5'>
			<div className='bg-yellow-500 rounded-md p-2'>

				{/* NÚMERO DA QUESTÃO (obs: não é o id da questão) */}
				<h2>Questão {currentQuestionIndex + 1}</h2>

				{/* TAGS DA QUESTÃO */}
				<p>Tags: {currentQuestion.tags.join(" - ")}</p>

				<br></br>

				{/* COMANDO DA QUESTÃO (e.g. 'Leia', 'Escute', etc. */}
				<p>{currentQuestion.statement.question_command}</p>

				{/* MÍDIA (obs: estamos verificando se não é null antes de mostrar) */}
				{
					(media !== null) && (
						<>
							{media.audio_file_path && (<audio src={media.audio_file_path} controls />)}
							{media.image_file_path && (<img src={media.image_file_path} />)}
							{/* media.text_content && (<p>{media.text_content}</p>) */} {/* Acho que não é pra mostrar isso aqui */}
						</>
					)
				}

				{/* PERGUNTA DA QUESTÃO (e.g. 'Onde fulano trabalha?') */}
				<p>{currentQuestion.question_text}</p>

				{/* ALTERNATIVAS */}
				<div className='flex flex-col gap-2 mt-4'>
					{	
						// vamos mapear o campo 'alternatives' das questões para os elementos <input>
						alternatives.map(
							(alternative, index) => {

								// nem todas as questões têm a mesma qtde. de alternativas, vamos tratar isso
								if(!alternative) { return(null) }

								return(

									<label key={index} className='flex items-center gap-2'>

										<input
											type='radio'                                        // é aquele input que permite apenas uma opção ser selecionada por vez
											name='question'
											disabled={answerStatus !== null}                    // condição para desabilitação dos input
											checked={selectedAlternative === index + 1}         // '+1' pois as alternativas começam em '1' e index começa em '0'
											onClick={() => setSelectedAlternative(null)}        // desmarca a alternativa se ela já estiver selecionada
											onChange={() => setSelectedAlternative(index + 1)}  // marca a nova alternativa selecionada
										/>

										<p>{alternative}</p>

									</label>
								)
							}
						)
					}
				</div>
				
				{/* BOTÃO - VERIFICAR RESPOSTA */}
				<div className='flex gap-3 mt-5'>
					<button
						onClick={validateAnswer}                                          // botão para validar resposta (e consequentemente ele também marca a questão como respondida)
						disabled={selectedAlternative === null || answerStatus !== null}  // condição para desabilitação do botão
					>
						Verificar Resposta
					</button>

					{/* condição para mostrar o botão que leva para a próxima questão */}
					{
						answerStatus !== null && (
							<button onClick={isLastQuestion ? finishQuestions : nextQuestion}>
								{isLastQuestion ? 'Finalizar' : 'Próxima Questão'}
							</button>
						)
					}
				</div>


				{/* o que será exibido a depender do status da resposta */}
				{answerStatus === true && (<p>Resposta correta!</p>)}
				{answerStatus === false && (<p>Resposta incorreta!</p>)}

			</div>
		</div>
	)
}
