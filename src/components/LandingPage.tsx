import { useNavigate } from 'react-router'
import clsx from 'clsx';

import { JapanBackground } from "./JapanBackground";
import { BrushstrokeButton } from './BrushstrokeButton.tsx';
import { BrushstrokeBox } from './BrushstrokeBox.tsx';
import { Text } from './Text.tsx';
import Logo from './NavBarLogo.tsx';


function MainInfo() {
        return (
                <div className="text-left w-full sm:max-w-[700px] min-h-[250px] p-5 self-start">
                        <div className='font-bold text-5xl p-1'>Bem vindo ao JLPTrial!</div>
                        <div className='p-2'>O JLPTrial é o aplicativo certo para você estudar para o JLPT (<em>Japanese Language Proficiency Test</em>). Ele é destinado para estudantes que pretendem prestá-lo nos níveis N4 ou N5.</div>

                </div>
        );
}

const secondaryInfo1: string = "Estude com questões de\ngramática, kanji, audição, leitura e vocabulário!";
const secondaryInfo2: string = "Prepare-se para o JLPT com simulados!";
const secondaryInfo3: string = "Monitore seu progresso!\nVeja estatísticas sobre o seu desempenho e revise questões nas quais teve dificuldade!";

function SecondaryInfo({ alignment, infoText }) {
        return (
                
                <div
                        className={clsx("relative", "aspect-[2/1]", "self-center",
                                alignment === "right" ? "sm:self-end" : "sm:self-start"
                        )}
                >
                        <BrushstrokeBox size={"lg"}>
                                <Text usage={"brushstroke_info_text"} align={"center"}>{infoText}</Text>
                        </BrushstrokeBox>
                </div>
        );
}


function StartButton() {
        const navigate = useNavigate();

        return (
                <BrushstrokeButton className="self-center" size={"md"} inkColor={"black"} onClick={() => navigate('/signup')}>
                        <Text usage={"brushstroke_button_text"} align={"center"}>Vamos lá!</Text>
                </BrushstrokeButton>
        );
}

export default function LandingPage() {
        return (
                <>
                        <JapanBackground />

                        <div className="relative z-50 mt-10 flex flex-col w-full max-w-[1200px] mx-auto sm:px-10 whitespace-pre-line">
                                <div className='w-[75%] sm:w-[50%] mb-5 sm:mb-20 self-center'><Logo /></div>
                                <MainInfo />
                                <SecondaryInfo alignment="right" infoText={secondaryInfo1} />
                                <SecondaryInfo alignment="left" infoText={secondaryInfo2} />
                                <SecondaryInfo alignment="right" infoText={secondaryInfo3} />
                                <StartButton />
                        </div>

                </>
        );
}

