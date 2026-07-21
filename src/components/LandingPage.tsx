import { useNavigate } from 'react-router'
import { box } from '../ui/box';
import clsx from 'clsx';

import { JapanBackground } from "./JapanBackground";


function MainInfo() {
        return (
                <div className="text-left w-full sm:max-w-[700px] min-h-[250px] p-5 self-start">
                        <div className='font-bold text-5xl p-1'>Bem vindo ao JLPTrial!</div>
                        <div className='p-2'>O JLPTrial é o aplicativo certo para seus estudos para o JLPT (<em>Japanese Language Proficiency Test</em>). Ele é focado em estudantes que pretendem prestar os níveis N4 e N5.</div>

                </div>
        );
}

const secondaryInfo1: string = "Estude com questões de gramática, kanji, audição, leitura e vocabulário!";
const secondaryInfo2: string = "Prepare-se para o exame com simulados!";
const secondaryInfo3: string = "Monitore seu progresso! Veja estatísticas do seu desempenho e reveja questões nas quais teve dificuldade.";

function SecondaryInfo({ alignment, infoText }) {
        return (
                <div className={clsx(box({
                        direction: alignment,
                        radius: "hero",
                }),`
		        min-h-50			
			w-[95%]
			sm:max-w-[600px]
			${alignment === 'right' ?
			'sm:self-end' :
			'sm:self-start'}
			p-10
			flex
			flex-col
			items-center
			self-center
			justify-center`
		)}
                >
                        <div className='m-10'>
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

                        <div className="relative z-50 mt-10 flex flex-col gap-10 w-full max-w-[1200px] mx-auto sm:px-10">
                                <MainInfo />
                                <SecondaryInfo alignment="right" infoText={secondaryInfo1} />
                                <SecondaryInfo alignment="left" infoText={secondaryInfo2} />
                                <SecondaryInfo alignment="right" infoText={secondaryInfo3} />
                                <StartButton />
                        </div>

                </>
        );
}

