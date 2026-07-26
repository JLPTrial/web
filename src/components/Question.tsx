import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useRequireAuth } from '../hooks/useRequireAuth.ts'
import { useQuestions } from '../hooks/useQuestions.ts'
import type { QuestionFilters } from '../hooks/useQuestions.ts'

import AudioPlayer from "./AudioPlayer";
import JapaneseTextParser from "./JapaneseTextParser.tsx";

import { ContentBox } from './ContentBox.tsx';
import { LeafButton } from './LeafButton.tsx';
import { LeafBox } from './LeafBox.tsx';


export default function Question() {

        const navigate = useNavigate()
        const [searchParams] = useSearchParams()

        const { authStatus } = useRequireAuth()

        const {
                currentQuestion,
                currentIndex,
                isLastQuestion,
                isFinished,
                isLoading,
                error,
                selectedAlternative,
                answerStatus,
                getQuestionList,
                selectAlternative,
                submitAnswer,
                nextQuestion,
        } = useQuestions()

        type PopupState = {
                message: string;
                type: "correct" | "incorrect";
        } | null;

        // 'definidor' de popup para quando o usuário responder uma questão
        const [popup, setPopup] = useState<PopupState>(null);

        function showPopup(message: string, type: "correct" | "incorrect", duration = 1400) {
                setPopup({ message, type });
                setTimeout(() => { setPopup(null); }, duration);
        }

        function handleQuestionsFinished() {
                navigate('/')
        }

        // busca as questões da API usando os filtros vindos da URL
        // (os mesmos filtros que a Dashboard envia ao clicar em "Começar")
        useEffect(() => {
                const level = (searchParams.get('level') ?? 'N5') as QuestionFilters['level']
                const topic = (searchParams.get('topic') ?? 'all') as QuestionFilters['topic']
                const answer_status = (searchParams.get('answer_status') ?? 'new') as QuestionFilters['answer_status']
                const limit = (searchParams.get('limit') ?? '5') as QuestionFilters['limit']

                void getQuestionList({ level, topic, answer_status, limit })
                // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        // voltar para o topo da janela quando o usuário avançar para a próxima questão
        useEffect(() => { window.scrollTo({ top: 0 }); }, [currentIndex])

        // Quando fazemos login, pode demorar um pouquinho para sincronizar e validar.
        // Por isso, retornamos antes de verificar se o usuário está logado para ele não voltar
        // Para a página de login, caso queiram, podem aproveitar esta micro estrutura para implementar uma tela de loading ou algo assim.
        if (authStatus === 'pending') {
        return <div className='p-8 text-center'>Carregando sessão...</div>
        }

        // impede o usuário de acessar esta página se não estiver logado (mudou)
        if (authStatus === 'unauthenticated') {
        return null
        }

        // quando usuário terminar o batch de questões, ao invés de mostrar a próxima questão (que não existe), mostre o seguinte:
        if (isFinished) {
                return (
                        <div className='flex flex-col items-center gap-4'>
                                <div className='font-bold text-2xl p-2 self-center'>Questões finalizadas!</div>

                                <LeafButton
                                        onClick={ handleQuestionsFinished }
                                >
                                        Voltar ao Dashboard
                                </LeafButton>
                        </div>
                )
        }

        if (isLoading) {
                return <div className='p-8 text-center'>Carregando questões...</div>
        }

        if (error) {
                return <div className='p-8 text-center text-red-600'>{error}</div>
        }

        if (!currentQuestion) {
                return <div className='p-8 text-center'>Nenhuma questão encontrada para estes filtros.</div>
        }

        // mídia da questão (imagem, áudio e transcrição do áudio)
        const media = currentQuestion.media

        const alternatives = [
                currentQuestion.alternatives.alternative_1,
                currentQuestion.alternatives.alternative_2,
                currentQuestion.alternatives.alternative_3,
                currentQuestion.alternatives.alternative_4
        ]

        // mostrando a questão
        return(
                <div className='space-y-5'>
                        
                        <ContentBox>

                                {/* NÚMERO DA QUESTÃO (obs: não é o id da questão) */}
                                <div className='font-bold text-2xl p-2 self-center'>Questão {currentIndex + 1}</div>

                                {/* TAGS DA QUESTÃO */}
                                <div className="flex flex-wrap gap-4 p-1">
                                        {currentQuestion.tags.map((tag, index) => (
                                                <LeafBox shape={"tag"} status={"not_a_button"} text_size={"smaller"} key={index}>
                                                        {tag}
                                                </LeafBox>
                                        ))}
                                </div>

                                <br></br>

                                {/* COMANDO DA QUESTÃO (e.g. 'Leia', 'Escute', etc. */}
                                <div className='m-2 my-3 p-2 pl-4 border-2 border-[rgb(230,230,230)] dark:border-gray-600 rounded-md shadow dark:bg-gray-800'>
                                        {<JapaneseTextParser text={currentQuestion.statement.question_command} />}
                                </div>

                                {/* MÍDIA (obs: estamos verificando se não é null antes de mostrar) */}
                                {
                                        (media !== null) && (
                                                <>
                                                        {media.audio_file_path && (
                                                                <div className='flex justify-center m-2 my-5'>
                                                                        <AudioPlayer src={media.audio_file_path} />
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
                                                        {media.text_content && (
                                                                <div className='flex justify-center m-2 my-5'>
                                                                        <div className='m-2 my-3 p-2 pl-4 border-2 border-[rgb(230,230,230)] dark:border-gray-600 rounded-md shadow dark:bg-gray-800'>
                                                                                {<JapaneseTextParser text={media.text_content} />}
                                                                        </div>
                                                                </div>)
                                                        }
                                                </>
                                        )
                                }

                                {/* PERGUNTA DA QUESTÃO (e.g. 'Onde fulano trabalha?') */}
                                <div className='m-2 mb-8 p-2 pl-4 border-2 border-[rgb(230,230,230)] dark:border-gray-600 rounded-md shadow dark:bg-gray-800'>
                                        {<JapaneseTextParser text={currentQuestion.question_text} />}
                                </div>

                                {/* ALTERNATIVAS */}
                                <div className='flex flex-col gap-2 mt-4'>
                                        {
                                                alternatives.map(
                                                        (alternative, index) => {

                                                                if(!alternative) { return(null) }

                                                                const alternativeNumber = index + 1;

                                                                const isSelected = (selectedAlternative === alternativeNumber);

                                                                const isCorrect = (currentQuestion.alternatives.correct_alternative === alternativeNumber);

                                                                const alternativeStyling =
                                                                        answerStatus === null
                                                                                ? "bg-white dark:bg-gray-800 border-[rgb(230,230,230)] dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-[rgb(230,230,230)] dark:hover:bg-gray-700 cursor-pointer"
                                                                                : isCorrect
                                                                                        ? "border-[rgb(68,170,0)] bg-[rgb(190,233,161)] dark:bg-[rgb(34,85,0)] dark:border-[rgb(68,170,0)]"
                                                                                        : isSelected
                                                                                                ? "border-[rgb(255,0,0)] bg-[rgb(255,192,192)] dark:bg-[rgb(100,0,0)] dark:border-[rgb(255,0,0)]"
                                                                                                : "border-[rgb(230,230,230)] dark:border-gray-600 opacity-60"

                                                                return(

                                                                        <label
                                                                                key={index}
                                                                                className={`flex items-center gap-2 border-2 rounded-md p-2 m-2 my-1 shadow transition-all ${alternativeStyling}`}
                                                                        >

                                                                                <input
                                                                                        className="h-4 w-4 ml-1 accent-[rgb(255,0,0)] focus:outline-none"
                                                                                        type='radio'
                                                                                        name='question'
                                                                                        disabled={answerStatus !== null}
                                                                                        checked={selectedAlternative === alternativeNumber}
                                                                                        onChange={() => {}}
                                                                                        onClick={() => selectAlternative(alternativeNumber)}
                                                                                />

                                                                                <p className='pl-2'>{<JapaneseTextParser text={alternative} />}</p>

                                                                        </label>
                                                                )
                                                        }
                                                )
                                        }
                                </div>

                                {/* BOTÃO - VERIFICAR RESPOSTA */}
                                <div className='flex justify-between gap-3 m-2 mt-5'>
                                        <LeafButton
                                                status={answerStatus === null && selectedAlternative !== null ? undefined : "disabled"}
                                                onClick={() => {
                                                        void submitAnswer().then((isCorrect) => {
                                                                if (isCorrect === null) { return }
                                                                showPopup(
                                                                        isCorrect ? "Correto!" : "Incorreto!",
                                                                        isCorrect ? "correct" : "incorrect"
                                                                )
                                                        })
                                                }}
                                                disabled={selectedAlternative === null || answerStatus !== null}
                                        >
                                                Verificar Resposta
                                        </LeafButton>

                                        {
                                                answerStatus !== null && (
                                                        <LeafButton onClick={nextQuestion} >
                                                                {isLastQuestion ? 'Finalizar' : 'Próxima Questão'}
                                                        </LeafButton>
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

                        </ContentBox>
                </div>
        )
}
