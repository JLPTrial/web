import { useState } from 'react'
import {Button} from "./Button.tsx"
import japanBg from '../assets/japan.svg';

// Dropdown button for each main section of the dashboard
function MainButton({title, active, setActive}) {
	return (
		<button onClick={() => setActive(!active)}
		className="border-b-4 border-red-600 py-4 rounded-xl dark:border-t-2 dark:border-x-2 dark:border-t-gray-700 dark:border-x-gray-700
			shadow-stone-400 shadow-[0_0_20px_-5px_rgba(230,230,230,0.1)] dark:shadow-none
			h-[70px] my-1 sm:mt-10 sm:mb-7 w-full
			bg-white text-[#6b6375] dark:bg-gray-900 dark:text-gray-50
			cursor-pointer bg-white
			flex items-center justify-start">

				{/* Text div */}
				<div className='font-bold font-sans text-[20px] sm:text-[30px] text-left flex items-center gap-3 justify-start'>

					{/* Dropdown triangle */}
					<div className={`w-0 h-0 m-2 
					${active ?
						'border-l-[10px] border-l-transparent border-t-[13px] border-t-red-600 border-r-[10px] border-r-transparent' :
						'border-t-[10px] border-t-transparent border-l-[13px] border-l-red-600 border-b-[10px] border-b-transparent'}`}>
					</div>

					{/* Main button text */}
					<div>{title}</div>
				</div>
	</button>
	);	
}

// Navigation buttons in the statistics section
function StatisticsNavButton({active, buttonId, setActive, text}) {
	return (
		<Button tone={active===buttonId? "active":"default"} onClick={() => setActive(buttonId)}
			id={buttonId}  size="sm2">
			{text}
		</Button>
	);
}

// Box with Statistics
function StatisticsByGraphBox({title}) {

	const [active1, setActive1] = useState("week") 
	const [active2, setActive2] = useState("n4") 

	return (
		<div className='flex flex-col w-full min-h-[500px] border-black mb-10 p-1'>

			{/* Title */}
			<div className='text-3xl font-bold text-center p-4 text-[#6b6375] dark:text-gray-50'>
				{title}
			</div>

			<div className='flex flex-col min-[700px]:flex-row min-[700px]:max-w-[700px]'>

				{/* Navigation bar */}
				<div className={`mr-2 shrink-0 text-wrap flex flex-col flex-1`}>
					<div className='font-bold text-[#6b6375] dark:text-gray-50'>Tempo</div>
					<StatisticsNavButton active={active1} buttonId="week" setActive={setActive1} text="Última semana" />
					<StatisticsNavButton active={active1} buttonId="months" setActive={setActive1} text="Últimos dois meses" />
					<StatisticsNavButton active={active1} buttonId="all" setActive={setActive1} text="Tudo" />
					<div className='font-bold text-[#6b6375] dark:text-gray-50'>Nível</div>
					<StatisticsNavButton active={active2} buttonId="n4" setActive={setActive2} text="N4" />
					<StatisticsNavButton active={active2} buttonId="n5" setActive={setActive2} text="N5" />
					
				</div>

				{/* Graph or other contents */}
				<div className='flex-3 bg-red-500'>

				</div>

			</div>


		</div>

	);
}


export default function Statistics() {

	const [active1, setActive1] = useState(false) 
	const [active2, setActive2] = useState(false) 
	const [active3, setActive3] = useState(false) 

	return (

		<>

			{/* Background Japan image */}
			<div
				className="fixed z-0 opacity-33 pointer-events-none inset-0 bg-center bg-no-repeat bg-[length:125vmin] lg:bg-[length:150vmin] transition-transform duration-300 -rotate-30 lg:rotate-0"
				style={{ backgroundImage: `url(${japanBg})` }}
			/>

			<div className='relative z-50 w-full flex flex-col justify-center items-center'>

				<div className='flex flex-col justify-center items-center w-full min-[700px]:max-w-[700px] min-[1200px]:max-w-full'>
						
						{/* First row of boxes */}
						<div className='flex flex-col justify-center items-center w-full'>

							<MainButton title="Progresso por competências" active={active1} setActive={setActive1} />

							<div className={`grid grid-cols-1 place-items-center gap-1 w-full min-[1200px]:grid-cols-2
								transition-all duration-500 ${active1? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}>
								<StatisticsByGraphBox title="Competências Gerais" />
								<StatisticsByGraphBox title="Competências Específicas" />

							</div>

						</div>


						{/* Second row of boxes */}
						<div className='grid grid-cols-1 place-items-center gap-1 w-full min-[1200px]:grid-cols-2'>

							<div className='w-full flex flex-col items-center justify-center'>
								<MainButton title="Progresso por competências" active={active2} setActive={setActive2} />
								<div className={`w-full transition-all duration-500
								${active2? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}>
									<StatisticsByGraphBox title="Competências Gerais" />
								</div>
								

							</div>

							<div className='w-full flex flex-col items-center justify-center'>
								<MainButton title="Progresso por competências" active={active3} setActive={setActive3} />

								<div className={`w-full transition-all duration-500 bg-yellow mb-10 h-[500px]
								${active3? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}>
									<StatisticsByGraphBox title="Competências Gerais" />
								</div>


							</div>




						</div>
					
					</div>



			</div>

		</>





	)
}
