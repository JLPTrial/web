import { useNavigate } from 'react-router'
import clsx from 'clsx';

import { JapanBackground } from "./JapanBackground";
import Brushstroke from './Brushstroke.tsx';


function MainInfo() {
        return (
                <div className="text-left w-full sm:max-w-[700px] min-h-[250px] p-5 self-start">
                        <div className='font-bold text-5xl p-1'>Bem vindo ao JLPTrial!</div>
                        <div className='p-2'>O JLPTrial é o aplicativo certo para seus estudos para o JLPT (<em>Japanese Language Proficiency Test</em>). Ele é focado em estudantes que pretendem prestar os níveis N4 e N5.</div>

                </div>
        );
}

const secondaryInfo1: string = "Estude com questões de gramática, kanji, audição, leitura e vocabulário!";
const secondaryInfo2: string = "Prepare-se para o JLPT com simulados!";
const secondaryInfo3: string = "Monitore seu progresso! Veja estatísticas sobre o seu desempenho e revise questões nas quais teve dificuldade!";

function SecondaryInfo({ alignment, infoText }) {
        return (
                
                <div
                        className={clsx("relative", "w-[750px]", "aspect-[2/1]",
                                alignment === "right" ? "self-end" : "self-start"
                        )}
                >
                        <Brushstroke className="absolute inset-0 w-full h-full" />

                        <div className="absolute inset-0 flex items-center justify-center text-center p-30">
                                {infoText}
                        </div>
                </div>
        );
}


function StartButton() {
        const navigate = useNavigate();

        return (
                <button className="bg-black
			shadow-2xl
	  		text-white
	  		rounded-lg
			self-center
			p-10
			my-10
			text-xl
			cursor-pointer
			hover:scale-110
			hover:bg-stone-900
			transition-all
			"
                        onClick={() => navigate('/signup')}>
                        Comece agora!
                </button>
        );
}

export default function LandingPage() {
        return (
                <>
                        <JapanBackground />

                        <div className="relative z-50 mt-10 flex flex-col w-full max-w-[1200px] mx-auto sm:px-10">
                                <MainInfo />
                                <SecondaryInfo alignment="right" infoText={secondaryInfo1} />
                                <SecondaryInfo alignment="left" infoText={secondaryInfo2} />
                                <SecondaryInfo alignment="right" infoText={secondaryInfo3} />
                                <StartButton />
                        </div>

                </>
        );
}

