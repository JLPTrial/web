
import { useState } from 'react'
import {Button} from "./Button.tsx"
import {Link} from "react-router"

function StatDisplayBox({title, data, type}) {
    return (
        <div className='flex flex-col justify-around items-center text-center border-2 border-stone-200 rounded-xl p-2 m-2'>
			<div className='font-bold text-md'>
				{title} {type}
			</div>
			<div className='font-bold text-3xl'>
				{data}
			</div>	
        </div>
    );

}

function StatisticsDisplay({type}) {
	return (
		<div className='max-w-[300px] sm:max-w-[1000px] flex flex-col items-center'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
				<StatDisplayBox title="Porcentagem de acertos" data="50%" type={type} />
				<StatDisplayBox title="Questões respondidas" data="30/200" type={type} />
				<StatDisplayBox title="Porcentagem de acertos hoje" data="80%" type={type} />
				<StatDisplayBox title="Questões respondidas hoje" data="10" type={type} />
			</div>
			<button className='m-2 self-end p-1 hover:scale-110 cursor-pointer font-bold transition-all duration-300'>Ver mais ➝</button>
		</div>
	);

}

function StatisticsNavButton({active2, buttonId, setActive2, text}) {
	return (
		<Button tone={active2==buttonId? "active":"default"} onClick={() => setActive2(buttonId)}
			id={buttonId}>
			{text}
		</Button>
	);
}


function QuestionsButton({ link, text, alignment }) {
	return (
		<Link to={link}>
			<Button
				size="lg"
				direction={alignment}			
				className="w-full"
				>
				{text}
			</Button>
		</Link>
	);
}

function MainButton({title, active1, setActive1}) {
	return (
		<button onClick={() => setActive1(!active1)}
		className="border-b-4 border-red-600 py-4 rounded-xl
			shadow-stone-400 shadow-[0_0_20px_-5px_rgba(230,230,230,0.1)]
			h-[70px] my-1 sm:my-10 w-full
			cursor-pointer
			flex items-center justify-start">
				<div className='font-bold font-sans text-[20px] sm:text-[30px] text-left flex items-center gap-3 justify-start'>
					<div className={`w-0 h-0 m-2 
					${active1 ?
						'border-l-[10px] border-l-transparent border-t-[13px] border-t-red-600 border-r-[10px] border-r-transparent' :
						'border-t-[10px] border-t-transparent border-l-[13px] border-l-red-600 border-b-[10px] border-b-transparent'}`}>
					</div>
					<div>{title}</div>

				</div>
	</button>
	);	
}


function StatisticsBox() {
	const [active1, setActive1] = useState(false)
	const [active2, setActive2] = useState("vocabulary")
    return (
        <div className="flex flex-col w-[95%] p-2 sm:p-0 w-[90%] sm:max-w-[700px]">
			<MainButton title="Meu progresso" active1={active1} setActive1={setActive1} />
			<div className={`mt-3 flex flex-col items-center sm:items-start sm:flex-row transition-all duration-500
				${active1 ? "max-h-[1000px] opacity-100" : "max-h-[0px] pointer-events-none opacity-0"}`}>
				<div className={`w-[90%] sm:w-[170px] mr-2 shrink-0 text-wrap flex flex-col`}>
					<StatisticsNavButton active2={active2} buttonId="vocabulary" setActive2={setActive2} text="Kanji/Vocabulário" />
					<StatisticsNavButton active2={active2} buttonId="reading" setActive2={setActive2} text="Leitura" />
					<StatisticsNavButton active2={active2} buttonId="grammar" setActive2={setActive2} text="Gramática"/>
					<StatisticsNavButton active2={active2} buttonId="listening" setActive2={setActive2} text="Escuta"/>
					<StatisticsNavButton active2={active2} buttonId="all" setActive2={setActive2} text="Tudo"/>
				</div>

				<StatisticsDisplay type={active2} />
				
			</div>
        </div>
    );
}


function QuestionBox({title, revision}) {
	const [active1, setActive1] = useState(false)
    return (
        <div className="flex flex-col w-[95%] p-2 sm:p-0 sm:max-w-[700px]">
			<MainButton title={title} active1={active1} setActive1={setActive1} />
			<div className={`mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-500
				${active1 ? "max-h-[1000px] opacity-100" : "max-h-[0px] pointer-events-none opacity-0"}`}>
				<QuestionsButton link={revision ? "/" : "/login"} text="Kanji/Vocabulário" alignment="left" />
				<QuestionsButton link={revision ? "/" : "/login"} text="Leitura" alignment="right" />
				<QuestionsButton link={revision ? "/" : "/login"} text="Gramática" alignment="left" />
				<QuestionsButton link={revision ? "/" : "/login"} text="Escuta" alignment="right" />
				<QuestionsButton link={revision ? "/" : "/login"} text="Tudo" alignment="left" />
				<QuestionsButton link={revision ? "/" : "/login"} text="Continuar de onde parei"  alignment="right" />
				
			</div>
        </div>
    );
}

function MockTestBox({title}) {
	const [active1, setActive1] = useState(false)
    return (
        <div className="flex flex-col w-[95%] p-2 sm:p-0 sm:max-w-[700px]">
			<MainButton title={title} active1={active1} setActive1={setActive1} />
			<div className={`mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-500 ease-out
			${active1 ? "max-h-[100px] opacity-100" : "max-h-[0px] pointer-events-none opacity-0"}`}>
				<QuestionsButton link="/" text="Novo simulado" alignment="left" />
				<QuestionsButton link="/" text="Refazer simulado" alignment="right" />	
			</div>
        </div>
    );
}



export default function Dashboard() {
	return (
		<div className='w-full flex flex-col items-center justify-center pb-[200px]'>
			<StatisticsBox />
			<QuestionBox title="Novas questões" revision={false}/>
			<QuestionBox title="Revisar questões" revision={true} />
			<MockTestBox title="Simulados" />

		</div>
	)
}
