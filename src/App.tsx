import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router'
import Dashboard from './components/Dashboard.tsx'
import Statistics from './components/Statistics.tsx'

function App() {
	const [message, setMessage] = useState('Carregando mensagem do backend...')
	const [error, setError] = useState('')

	useEffect(() => {
		const endpoint = import.meta.env.VITE_API_URL

		fetch(endpoint)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`Falha na resposta do backend (${response.status})`)
				}

				const data = (await response.json()) as { message: string }
				setMessage(data.message)
			})
			.catch((err: unknown) => {
				const reason = err instanceof Error ? err.message : 'Erro desconhecido'
				setError(reason)
				setMessage('Não foi possível buscar a mensagem do backend.')
			})
	}, [])

	const isOnline = !error

	// Sim, pedi para o gepetto me gerar esse template, mim não saber fazer design : D
	return (
		<div className='app-shell'>
			<header className='top-nav'>
				<strong className='brand'>JLPTrial</strong>
				<nav
					className='top-links'
					aria-label='Navegacao principal'>
					<a href='#'>Questões</a>
					<a href='#'>Meu Progresso</a>
					<a href='#'>Minha Conta</a>
				</nav>
			</header>

			<main className='web-home'>
				<section
					className='jlpt-card'
					aria-live='polite'>
					<div className='flex flex-col gap-2'>
						<Dashboard />
					</div>
				</section>
			</main>
		</div>
	)
}

export default App
