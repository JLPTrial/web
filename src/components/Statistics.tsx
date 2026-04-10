import { useEffect } from 'react'

export default function Statistics() {
	useEffect(() => {})
	return (
		<div className=' bg-yellow-500 rounded-md p-2'>
			Estatísticas
			<div className='flex gap-2 justify-around *:flex *:justify-center *:items-center *:rounded-md overflow-x-scroll'>
				<div className='w-200 h-50 bg-yellow-400 '>Opções</div>
				<div className='w-200 bg-yellow-400'>Acertos</div>
				<div className='w-200 bg-yellow-400'>Questões respondidas</div>
				<div className='w-200 bg-yellow-400'>...</div>
			</div>
		</div>
	)
}
