import { useState, useEffect } from 'react';
import { SelectableLeafButton } from "./SelectableLeafButton.tsx";
import { JapanBackground } from './JapanBackground.tsx';
import { Text } from './Text.tsx';
import { DropdownButton } from './DropdownButton.tsx';
import { useStatistics } from '../hooks/useStatistics.ts';
import {
	BarChart, Bar,
	XAxis, YAxis,
	CartesianGrid, Tooltip, Legend,
	RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
	ResponsiveContainer,
} from 'recharts';

const skillNamesRadar: Record<string, string> = {
    grammar: "Gram.",
    vocabulary: "Vocab.",
    kanji: "Kanji",
    reading: "Leit.",
    listening: "Aud.",
};

const skillNamesButtons: Record<string, string> = {
    grammar: "Gramática",
    vocabulary: "Vocabulário",
    kanji: "Kanji",
    reading: "Leitura",
    listening: "Audição",
};

function BarGraph({ tags, percentages }) {

    const barData = tags.map((tag, index) => ({
        name: tag,
        percentage: percentages[index] ?? 0,
    }))

    return (
        <div className='h-80 min-w-[500px] rounded-md p-4 flex items-center'>
            <ResponsiveContainer width='80%' height='80%'>

                <BarChart
                    data={barData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis domain={[0,100]} tickFormatter={(tick) => `${tick}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, "Taxa de acerto"]} />
                    <Bar dataKey="percentage" fill="#ff0000" />
                </BarChart>

            </ResponsiveContainer>
        </div>
    )
}

function StackedBarGraph({ periods, correct, wrong }) {

    const stackedBarData = periods.map((period, index) => ({
        name: period,
        Corretas: correct[index] ?? 0,
        Incorretas: wrong[index] ?? 0,
    }))

    return (
        <div className='h-80 min-w-[500px] rounded-md p-4 flex items-center'>
            <ResponsiveContainer width='80%' height='80%'>

                <BarChart
                    data={stackedBarData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} />
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

function RadarGraph({ skills, percentages }) {

    const radarData = skills.map((skill, index) => ({
        subject: skillNamesRadar[skill] ?? skill,
        percentage: percentages[index] ?? 0,
    }))

    return (
        <div className="h-80 min-w-[500px] rounded-md p-4 flex items-center">
            <ResponsiveContainer width="80%" height="80%">

                <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                    <Radar dataKey="percentage" stroke="#dc2626" fill="#dc2626" fillOpacity={0.35} />
                    <Tooltip formatter={(value) => [`${value}%`, "Taxa de acerto"]} />
                </RadarChart>

            </ResponsiveContainer>
        </div>
    )
}

// Dropdown button for each main section of the statistics
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

function GeneralCompetenciesStatisticsBox({ title, graph, period, setPeriod, level, setLevel }) {
    return (
        <div className="flex flex-col w-full min-h-[425px] border-black mb-2 p-1">

            <Text usage="title" align="center">{title}</Text>

            <div className="flex flex-col items-center min-[700px]:flex-row min-[700px]:max-w-[700px]">

                <div className="mr-2 shrink-0 flex flex-col flex-1">

                    <Text usage="subtitle">Tempo</Text>
					<div className='flex flex-row gap-1 sm:flex-col sm:gap-0'>
						<StatisticsNavButton active={period} buttonId="week"   setActive={setPeriod} text="Última semana" />
						<StatisticsNavButton active={period} buttonId="months" setActive={setPeriod} text="Últimos 30 dias" />
						<StatisticsNavButton active={period} buttonId="all"    setActive={setPeriod} text="Todo o período" />
					</div>

                    <Text usage="subtitle">Nível</Text>
					<div className='flex flex-row gap-1 sm:flex-col sm:gap-0'>
						<StatisticsNavButton active={level} buttonId="N4"  setActive={setLevel} text="N4" />
						<StatisticsNavButton active={level} buttonId="N5"  setActive={setLevel} text="N5" />
						<StatisticsNavButton active={level} buttonId="all" setActive={setLevel} text="Todos" />
					</div>

                </div>

                {graph}

            </div>
        </div>
    )
}

function SpecificCompetenciesStatisticsBox({ title, graph, skills, selectedSkill, setSelectedSkill }) {
    return (
        <div className="flex flex-col w-full min-h-[425px] border-black mb-10 p-1">

            <Text usage="title" align="center">{title}</Text>

            <div className="flex flex-col items-center min-[700px]:flex-row min-[700px]:max-w-[700px]">

                <div className="mr-2 shrink-0 flex flex-col flex-1">

                    <Text usage="subtitle">Competência</Text>

                    <div className="flex flex-wrap gap-1">

                        {skills.map(skill => (

                            <SelectableLeafButton
                                key={skill}
                                status={selectedSkill === skill ? "selected" : "enabled"}
                                shape="competency"
                                onClick={() => setSelectedSkill(skill)}
                            >
                                {skillNamesButtons[skill] ?? skill}
                            </SelectableLeafButton>
                        ))}

                    </div>
                </div>

                {graph}

            </div>
        </div>
    )
}

function TimelineStatisticsBox({ graph, period, setPeriod, level, setLevel }) {
    return (
        <div className="flex flex-col w-full min-h-[425px] border-black mb-10 p-1">

            <div className="flex flex-col items-center min-[700px]:flex-row min-[700px]:max-w-[700px]">

                <div className="mr-2 shrink-0 flex flex-col flex-1">

                    <Text usage="subtitle">Tempo</Text>
					<div className='flex flex-row gap-1 sm:flex-col sm:gap-0'>
						<StatisticsNavButton active={period} buttonId="week" setActive={setPeriod} text="Última semana" />
						<StatisticsNavButton active={period} buttonId="months" setActive={setPeriod} text="Últimos 30 dias" />
						<StatisticsNavButton active={period} buttonId="all" setActive={setPeriod} text="Todo o período" />
					</div>

                    <Text usage="subtitle">Nível</Text>
					<div className='flex flex-row gap-1 sm:flex-col sm:gap-0'>
						<StatisticsNavButton active={level} buttonId="N4" setActive={setLevel} text="N4" />
						<StatisticsNavButton active={level} buttonId="N5" setActive={setLevel} text="N5" />
						<StatisticsNavButton active={level} buttonId="all" setActive={setLevel} text="Todos" />
					</div>

                </div>

                {graph}

            </div>
        </div>
    )
}

export default function Statistics() {

	const [competencyOpen, setCompetencyOpen] = useState(false)
	const [timelineOpen, setTimelineOpen] = useState(false)

	const [competencyPeriod, setCompetencyPeriod] = useState("week")
	const [competencyLevel, setCompetencyLevel] = useState("all")

	const [timelinePeriod, setTimelinePeriod] = useState("week")
	const [timelineLevel, setTimelineLevel] = useState("all")

	const [skill, setSkill] = useState("kanji")

    const {
        skills, skillsPercentages,
		tags, tagsPercentages,
        periodList, correctList, wrongList,
        getSkillsGraphInfo,
        getTagsGraphInfo,
        getTimeLine,
        getGeneralInfo,
    } = useStatistics()

	useEffect(() => {
		async function loadCompetencyStats() {
			await Promise.all([
				getSkillsGraphInfo({ period: competencyPeriod, level: competencyLevel        }),
				getTagsGraphInfo  ({ period: competencyPeriod, level: competencyLevel, skill }),
				getGeneralInfo    ({ period: competencyPeriod, level: competencyLevel        }),
			])
		}
		loadCompetencyStats()
	},
	[competencyPeriod, competencyLevel, skill])

	useEffect(() => {
		async function loadTimelineStats() {
			await getTimeLine({ period: timelinePeriod, level: timelineLevel })
		}
		loadTimelineStats()
	},
	[timelinePeriod, timelineLevel])

	return (
		<>
			<JapanBackground/>

			<div className='relative z-50 w-full flex flex-col justify-center items-center'>

				<div className='flex flex-col justify-center items-center w-full min-[700px]:max-w-[700px] min-[1200px]:max-w-full'>
						
					{/* First row of boxes */}
					<div className='flex flex-col justify-center items-center w-full'>
						<MainButton title="Progresso por competências" active={competencyOpen} setActive={setCompetencyOpen} />
						<div className={`grid grid-cols-1 place-items-start gap-1 w-full min-[1200px]:grid-cols-2
							transition-all duration-500 ${competencyOpen? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}
						>
							<GeneralCompetenciesStatisticsBox
								title="Competências Gerais"
								period={competencyPeriod}
								setPeriod={setCompetencyPeriod}
								level={competencyLevel}
								setLevel={setCompetencyLevel}
								graph={
									<RadarGraph
										skills={skills}
										percentages={skillsPercentages}
										selectedSkill={skill}
										setSelectedSkill={setSkill}
        							/>
								}
							/>

							<SpecificCompetenciesStatisticsBox
								title="Competências Específicas"
								skills={skills}
								selectedSkill={skill}
								setSelectedSkill={setSkill}
								graph={
									<BarGraph
										tags={tags}
										percentages={tagsPercentages}
									/>
								}
							/>
						</div>
					</div>

					{/* Second row of boxes */}
					<div className='grid grid-cols-1 place-items-center gap-5 w-full min-[1200px]:grid-cols-2'>
						<div className='w-full flex flex-col items-center justify-center'>
							<MainButton title="Progresso ao longo do tempo" active={timelineOpen} setActive={setTimelineOpen} />
							<div className={`w-full transition-all duration-500
								${timelineOpen? "max-h-[2000px] opacity-100" : "max-h-[0px] opacity-0 pointer-events-none min-[1200px]:max-h-[2000px] min-[1200px]:pointer-events-auto min-[1200px]:opacity-100"}`}
							>
								<TimelineStatisticsBox
									period={timelinePeriod}
									setPeriod={setTimelinePeriod}							
									level={timelineLevel}
									setLevel={setTimelineLevel}
									graph={
										<StackedBarGraph
											periods={periodList}
											correct={correctList}
											wrong={wrongList}
										/>
									}
								/>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}