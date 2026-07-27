import { useState } from 'react';
import { SelectableLeafButton } from "./SelectableLeafButton.tsx";
import { JapanBackground } from './JapanBackground.tsx';
import { Text } from './Text.tsx';
import { DropdownButton } from './DropdownButton.tsx';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	ResponsiveContainer,
} from 'recharts'

const barData = [
  { name: 'Jan', Corretas: 42, Incorretas: 28, amt: 70, },
  { name: 'Feb', Corretas: 39, Incorretas: 31, amt: 70, },
  { name: 'Mar', Corretas: 51, Incorretas: 34, amt: 85, },
  { name: 'Apr', Corretas: 47, Incorretas: 36, amt: 83, },
  { name: 'May', Corretas: 58, Incorretas: 39, amt: 97, },
  { name: 'Jun', Corretas: 62, Incorretas: 41, amt: 103, }
];

const radarData = [
	{ subject: 'Gramática', value: 90 },
	{ subject: 'Leitura', value: 65 },
	{ subject: 'Vocabulário', value: 80 },
	{ subject: 'Kanji', value: 50 },
	{ subject: 'Audição', value: 75 },
]

function BarGraph() {
	return (
		<div className='h-80 min-w-[500px] rounded-md p-4'>
			<Text usage={"normal"}>Progresso</Text>

			<ResponsiveContainer width='80%' height='80%'>
				<BarChart
					data={barData}
					margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="Corretas" stackId="a" fill="#15ab12" />
					<Bar dataKey="Incorretas" stackId="a" fill="#ff0000" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

function RadarGraph() {
	return (
		<div className='h-80 min-w-[500px] rounded-md p-4'>
			<Text usage={"normal"}>Habilidades</Text>

			<ResponsiveContainer width='80%' height='80%'>
				<RadarChart data={radarData}>
					<PolarGrid />
					<PolarAngleAxis dataKey='subject' />
					<PolarRadiusAxis />
					<Radar dataKey='value' stroke='#dc2626' fill='#dc2626' fillOpacity={0.35} />
					<Tooltip />
				</RadarChart>
			</ResponsiveContainer>
		</div>
	)
}

// Dropdown button for each main section of the dashboard
function MainButton({title, active, setActive}) {
	return (
		<DropdownButton onClick={() => setActive(!active)} >
            {/* Text div */}
            <div className='flex items-center gap-3 justify-start'>
                {/* Dropdown triangle */}
                <div
                    className={`
                        w-0 h-0 ml-5 mr-2
                        border-t-[10px] border-t-transparent
                        border-b-[10px] border-b-transparent
                        border-l-[13px] border-l-red-600
                        transition-transform duration-200
                        ${active ? 'rotate-90' : 'sm:rotate-90 rotate-0'}
                    `}
                />

                {/* Main button text */}
                <Text usage={"title"}>{title}</Text>
            </div>
        </DropdownButton>
	);	
}

// Navigation buttons in the statistics section
function StatisticsNavButton({active, buttonId, setActive, text}) {
	return (
        <SelectableLeafButton
            status={active === buttonId ? "selected" : "enabled"}
            onClick={() => setActive(buttonId)}
            shape={"competency"}
            id={buttonId}>
            {text}
        </SelectableLeafButton>
	);
}

// Box with Statistics
function StatisticsByGraphBox({title, graph}) {

	const [active1, setActive1] = useState("week") 
	const [active2, setActive2] = useState("n4") 

	return (
		<div className='flex flex-col w-full min-h-[500px] border-black mb-10 p-1'>

			<Text usage={"title"} align={"center"}>{title}</Text>

			<div className='flex flex-col min-[700px]:flex-row min-[700px]:max-w-[700px]'>

				{/* Navigation bar */}
				<div className={`mr-2 shrink-0 text-wrap flex flex-col flex-1`}>
					<Text usage={"subtitle"}>Tempo</Text>
						<StatisticsNavButton active={active1} buttonId="week" setActive={setActive1} text="Última semana" />
						<StatisticsNavButton active={active1} buttonId="months" setActive={setActive1} text="Últimos 30 dias" />
						<StatisticsNavButton active={active1} buttonId="all" setActive={setActive1} text="Todo o período" />

					<Text usage={"subtitle"}>Nível</Text>
					<div className='flex flex-row sm:flex-col gap-1 sm:gap-0'>
						<StatisticsNavButton active={active2} buttonId="n4" setActive={setActive2} text="N4" />
						<StatisticsNavButton active={active2} buttonId="n5" setActive={setActive2} text="N5" />
						<StatisticsNavButton active={active2} buttonId="all" setActive={setActive2} text="Tudo" />
					</div>
				</div>

				{graph}

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
			<JapanBackground/>

			<div className='relative z-50 w-full flex flex-col justify-center items-center'>

				<div className='flex flex-col justify-center items-center w-full min-[700px]:max-w-[700px] min-[1200px]:max-w-full'>
						
					{/* First row of boxes */}
					<div className='flex flex-col justify-center items-center w-full'>
						<MainButton title="Progresso por competências" active={active1} setActive={setActive1} />
						<div className={`grid grid-cols-1 place-items-center gap-1 w-full min-[1200px]:grid-cols-2
							transition-all duration-500 ${active1? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}
						>
							<StatisticsByGraphBox title="Competências Gerais" graph={<RadarGraph/>} />
							<StatisticsByGraphBox title="Competências Específicas" graph={<RadarGraph/>} />
						</div>
					</div>


					{/* Second row of boxes */}
					<div className='grid grid-cols-1 place-items-center gap-5 w-full min-[1200px]:grid-cols-2'>
						<div className='w-full flex flex-col items-center justify-center'>
							<MainButton title="Progresso por competências" active={active2} setActive={setActive2} />
							<div className={`w-full transition-all duration-500
								${active2? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}
							>
								<StatisticsByGraphBox title="Competências Gerais" graph={<BarGraph/>} />
							</div>
						</div>

						<div className='w-full flex flex-col items-center justify-center'>
							<MainButton title="Progresso por competências" active={active3} setActive={setActive3} />
							<div className={`w-full transition-all duration-500 bg-yellow mb-10 h-[500px]
								${active3? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}
							>
								<StatisticsByGraphBox title="Competências Gerais" graph={<BarGraph/>} />
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}