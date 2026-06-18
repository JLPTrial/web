import { useNavigate } from 'react-router'
import { useState } from 'react'
import {Button} from "./Button.tsx"
import japanBg from '../assets/japan.svg';

// Box that displays statistics data
function StatDisplayBox({title, data, type}) {
    return (
        <div className='flex flex-col justify-around items-center text-center bg-white border-2 border-stone-200 rounded-xl p-2 m-2'>
			<div className='font-bold text-md'>
				{title} {type}
			</div>
			<div className='font-bold text-3xl'>
				{data}
			</div>	
        </div>
    );

}

// Function that applies the filters selected by the user,
// and checks if there are any questions in the database with these filters
function get_number_of_questions(answered: string = 'false', topic: string = "kanji", level: string = "n4", limit: string = "5", correct: string = "true" ) {
	let url: string;
	if (topic === "all") {
		url = `/levels/${level}/questions?answered=${answered}&limit=${limit}&correct=${correct}&random=true`;
	}
	else {
		url = `/levels/${level}/topics/${topic}/questions?answered=${answered}&limit=${limit}&correct=${correct}&random=true`;
	}
	console.log(url);
}

// Display that contains all boxes with statistics
function StatisticsDisplay({type}) {
	const navigate = useNavigate();
	return (
		<div className='max-w-[300px] sm:max-w-[1000px] flex flex-col items-center'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
				<StatDisplayBox title="Porcentagem de acertos" data="50%" type={type} />
				<StatDisplayBox title="Questões respondidas" data="30/200" type={type} />
				<StatDisplayBox title="Porcentagem de acertos hoje" data="80%" type={type} />
				<StatDisplayBox title="Questões respondidas hoje" data="10" type={type} />
			</div>
			<button onClick={() => navigate('/stat')} className='m-2 self-end p-1 hover:scale-110 cursor-pointer font-bold transition-all duration-300'>Ver mais ➝</button>
		</div>
	);

}

// Navigation buttons in the statistics section
function StatisticsNavButton({active2, buttonId, setActive2, text}) {
	return (
		<Button tone={active2==buttonId? "active":"default"} onClick={() => setActive2(buttonId)}
			id={buttonId}>
			{text}
		</Button>
	);
}

function ButtonText({kanji, text}) {
	return (
		<div className='relative flex items-center justify-between w-full px-2'>
			<div className='text-xl'>{kanji}</div>
			<div>{text}</div>
			<div></div>
		</div>
	);
}

function StartButton({answered ='false', topic = "kanji", level = "n4", limit = "5", correct = "true"}) {
        const navigate = useNavigate();


	return (
		<button onClick={() => get_number_of_questions(answered, topic, level, limit, correct)}
			className='m-2 px-10 py-5 rounded-xl text-xl
			bg-red-700 text-white font-bold
			hover:scale-115 cursor-pointer
			shadow-md shadow-stone-400 dark:shadow-none
			transition-all duration-300'>Começar</button>
	);
}

// Rectangular leaf button used to select filters 
function QuestionsButton({active, buttonId, setActive, text, alignment }) {
	return (
		<Button
			tone={active==buttonId? "active":"default"}
			onClick={() => setActive(buttonId)}
			size="lg"
			direction={alignment}			
			className="w-full"
			>
			{text}
		</Button>
	);
}

// Square leaf button used to select filters
function LeafButton({active, buttonId, setActive, text }) {
	return (
		<Button
			tone={active==buttonId? "active":"default"}
			onClick={() => setActive(buttonId)}
			size="sq"
			direction="right"			
			>
			{text}
		</Button>
	);
}

// Dropdown button for each main section of the dashboard
function MainButton({title, active1, setActive1}) {
	return (
		<button onClick={() => setActive1(!active1)}
		className="border-b-4 border-red-600 py-4 rounded-xl dark:border-t-2 dark:border-x-2 dark:border-t-gray-700 dark:border-x-gray-700
			shadow-stone-400 shadow-[0_0_20px_-5px_rgba(230,230,230,0.1)] dark:shadow-none
			h-[70px] my-1 sm:mt-10 sm:mb-7 w-full
			cursor-pointer bg-white
			flex items-center justify-start">

				{/* Text div */}
				<div className='font-bold font-sans text-[20px] sm:text-[30px] text-left flex items-center gap-3 justify-start'>

					{/* Dropdown triangle */}
					<div className={`w-0 h-0 m-2 
					${active1 ?
						'border-l-[10px] border-l-transparent border-t-[13px] border-t-red-600 border-r-[10px] border-r-transparent' :
						'border-t-[10px] border-t-transparent border-l-[13px] border-l-red-600 border-b-[10px] border-b-transparent'}`}>
					</div>

					{/* Main button text */}
					<div>{title}</div>
				</div>
	</button>
	);	
}

// Main statistics box
function StatisticsBox() {
	const [active1, setActive1] = useState(false) // variable that defines if main button is active
	const [active2, setActive2] = useState("vocabulary") // variable that defines which navigation button is selected
    return (
        <div className="flex flex-col w-[95%] p-2 sm:p-0 w-[90%] sm:max-w-[700px]">

			{/* Main button */}
			<MainButton title="Meu progresso" active1={active1} setActive1={setActive1} />

			{/* Content section */}
			<div className={`mt-3 flex flex-col items-center sm:items-start sm:flex-row transition-all duration-500
				${active1 ? "max-h-[1000px] opacity-100" : "max-h-[0px] pointer-events-none opacity-0"}`}>
				
				{/* Navigation bar */}
				<div className={`w-[90%] sm:w-[170px] mr-2 shrink-0 text-wrap flex flex-col`}>
					<StatisticsNavButton active2={active2} buttonId="kanji" setActive2={setActive2} text="Kanji" />
					<StatisticsNavButton active2={active2} buttonId="vocabulary" setActive2={setActive2} text="Vocabulário" />
					<StatisticsNavButton active2={active2} buttonId="reading" setActive2={setActive2} text="Leitura" />
					<StatisticsNavButton active2={active2} buttonId="grammar" setActive2={setActive2} text="Gramática"/>
					<StatisticsNavButton active2={active2} buttonId="listening" setActive2={setActive2} text="Escuta"/>
					<StatisticsNavButton active2={active2} buttonId="all" setActive2={setActive2} text="Tudo"/>
				</div>

				{/* Data display */}
				<StatisticsDisplay type={active2} />
				
			</div>
        </div>
    );
}

// Main box for question selection
function QuestionBox({title, review}) {
	const [active1, setActive1] = useState(false) // variable that defines if main button is active
	const [active2, setActive2] = useState("kanji") // variable that defines which type of question is selected
	const [active3, setActive3] = useState("N4") // variable that defines which level is selected
	const [active4, setActive4] = useState("5") // variable that defines which number of questions is selected
	const [active5, setActive5] = useState("all") // variable that defines which type of review is selected

	// Texts for each button
	const title1 = <ButtonText kanji="漢字" text="Kanji" />
	const title2 = <ButtonText kanji="語彙" text="Vocabulário" />
	const title3 = <ButtonText kanji="読み方" text="Leitura" />
	const title4 = <ButtonText kanji="文法" text="Gramática" />
	const title5 = <ButtonText kanji="聴取" text="Audição" />
	const title6 = <ButtonText kanji="全て" text="Tudo" />

    return (
        <div className="flex flex-col w-[95%] p-2 sm:p-0 sm:max-w-[700px]">

			{/* Main button */}
			<MainButton title={title} active1={active1} setActive1={setActive1} />

			{/* Content section */}
			<div className={`transition-all duration-500
					${active1 ? "max-h-[2000px] opacity-100" : "max-h-[0px] pointer-events-none opacity-0"}`}>

				{/* Type of review filter */}
				<div className={review ? "" : "hidden"}>
					<div className='text-xl font-bold p-1'>Tipo de revisão</div>
					<div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5`}>
						<QuestionsButton active={active5} buttonId="all" setActive={setActive5} text="Todas as questões" alignment="left" />
						<QuestionsButton active={active5} buttonId="wrong" setActive={setActive5} text="Apenas erradas" alignment="right" />				
					</div>
				</div>
				{/* Level filter */}
				<div className='text-xl font-bold p-1'>Nível</div>
				<div className={`flex flex-row gap-x-1 gap-y-5 mb-5`}>
					<LeafButton active={active3} buttonId="N4" setActive={setActive3} text="N4" />
					<LeafButton active={active3} buttonId="N5" setActive={setActive3} text="N5" />
				</div>

				{/* Competency filter */}
				<div className='text-xl font-bold p-1'>Competência</div>
				<div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5`}>
					<QuestionsButton active={active2} buttonId="kanji" setActive={setActive2} text={title1} alignment="left" />
					<QuestionsButton active={active2} buttonId="vocabulary" setActive={setActive2} text={title2} alignment="right" />
					<QuestionsButton active={active2} buttonId="reading" setActive={setActive2} text={title3} alignment="left" />
					<QuestionsButton active={active2} buttonId="grammar" setActive={setActive2} text={title4} alignment="right" />
					<QuestionsButton active={active2} buttonId="listening" setActive={setActive2} text={title5} alignment="left" />
					<QuestionsButton active={active2} buttonId="all" setActive={setActive2} text={title6} alignment="right" />				
				</div>

				{/* Number of questions filter */}
				<div className='text-xl font-bold p-1'>Quantidade de questões</div>
				<div className='flex flex-row gap-x-1 gap-y-5 mb-5'>
					<LeafButton active={active4} buttonId="5" setActive={setActive4} text="5" />
					<LeafButton active={active4} buttonId="10" setActive={setActive4} text="10" />
					<LeafButton active={active4} buttonId="20" setActive={setActive4} text="20" />
					<LeafButton active={active4} buttonId="30" setActive={setActive4} text="30" />
				</div>
				
				<div className='w-full flex items-centers justify-center'>
					<StartButton answered={review ? "true" : "false"} topic={active2} level={active3} limit={active4} correct={active5 === "all" ? "true" : "false"} />
				</div>

			</div>

        </div>
    );
}

// Main box for mock test
function MockTestBox({title}) {
	const [active1, setActive1] = useState(false)
    return (
        <div className="flex flex-col w-[95%] p-2 sm:p-0 sm:max-w-[700px]">

			{/* Main button */}
			<MainButton title={title} active1={active1} setActive1={setActive1} />

			{/* Content section */}
			<div className={`mt-3 flex align-center justify-center sm:grid-cols-2 gap-5 transition-all duration-500 ease-out
			${active1 ? "max-h-[1000px] opacity-100" : "max-h-[0px] pointer-events-none opacity-0"}`}>
				<StartButton />
			</div>
        </div>
    );
}


// Dashboard
export default function Dashboard() {
	return (
		<>
			<div
				className="fixed z-0 opacity-33 pointer-events-none inset-0 bg-center bg-no-repeat bg-[length:125vmin] lg:bg-[length:150vmin] transition-transform duration-300 -rotate-30 lg:rotate-0"
				style={{ backgroundImage: `url(${japanBg})` }}
			/>
			
			<div className='relative z-50 w-full flex flex-col items-center justify-center pb-[200px]'>
				<StatisticsBox />
				<QuestionBox title="Novas questões" review={false}/>
				<QuestionBox title="Revisar questões" review={true} />
				<MockTestBox title="Simulado" />

			</div>
		</>
	)
}
