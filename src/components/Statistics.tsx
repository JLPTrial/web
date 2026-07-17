import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	ResponsiveContainer,
} from 'recharts'

const lineData = [
	{ day: 'Seg', score: 45 },
	{ day: 'Ter', score: 62 },
	{ day: 'Qua', score: 55 },
	{ day: 'Qui', score: 81 },
	{ day: 'Sex', score: 72 },
	{ day: 'Sáb', score: 90 },
	{ day: 'Dom', score: 85 },
]

const radarData = [
	{ subject: 'Gramática', value: 90 },
	{ subject: 'Leitura', value: 65 },
	{ subject: 'Vocabulário', value: 80 },
	{ subject: 'Kanji', value: 50 },
	{ subject: 'Audição', value: 75 },
]

export default function Statistics() {
	return (
		<div className='rounded-md p-4'>
			<span className='text-red-400'>*EM CRIAÇÃO</span>
			<h2 className='mb-4 text-xl font-semibold'>Estatísticas</h2>

			<div className='flex gap-4 overflow-x-auto'>
				<div className='h-80 min-w-[500px] rounded-md p-4'>
					<h3 className='mb-2 font-medium'>Progresso</h3>

					<ResponsiveContainer
						width='100%'
						height='100%'>
						<LineChart data={lineData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='day' />
							<YAxis />
							<Tooltip />
							<Line
								type='monotone'
								dataKey='score'
								stroke='#2563eb'
								strokeWidth={3}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className='h-80 min-w-[500px] rounded-md p-4'>
					<h3 className='mb-2 font-medium'>Habilidades</h3>

					<ResponsiveContainer
						width='100%'
						height='100%'>
						<RadarChart data={radarData}>
							<PolarGrid />
							<PolarAngleAxis dataKey='subject' />
							<PolarRadiusAxis />
							<Radar
								dataKey='value'
								stroke='#dc2626'
								fill='#dc2626'
								fillOpacity={0.35}
							/>
							<Tooltip />
						</RadarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
