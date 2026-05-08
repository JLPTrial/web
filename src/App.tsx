import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from 'react-router'
import Dashboard from './components/Dashboard.tsx'
import LandingPage from './components/LandingPage.tsx'
import Statistics from './components/Statistics.tsx'
import LogIn from './components/LogIn.tsx'
import SignUp from './components/SignUp.tsx'
import Question from './components/Question.tsx'
import useUser from './hooks/useUser.ts'

function App() {
	const [message, setMessage] = useState('Carregando mensagem do backend...')
	const [error, setError] = useState('')
	const { user } = useUser()

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
	console.log('a api está: ' + (isOnline ? 'online' : 'offline'))
	console.log(message)

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
					<NavLink to='/signup'>Registrar-se</NavLink>
					<NavLink to='/login'>Entrar</NavLink>
				</nav>
			</header>

			<main className='w-full mx-auto mt-5 max-w-6xl flex justify-center align-center'>
				<section
					className='mx-auto px-4'
					aria-live='polite'>
					<div className='flex flex-col gap-2'>
						<Routes>
							<Route
								path='/'
								element={user.isLoggedIn ? <Dashboard /> : <LandingPage />}
							/>
							<Route
								path='/stat'
								element={<Statistics />}
							/>
							<Route
								path='/mock-test'
								element={<>Mock test</>}
							/>
							<Route
								path='/question'
								element={<Question />}
							/>
							<Route
								path='/login'
								element={<LogIn onLogin={() => console.log('Vai logar!')} />}
							/>
							<Route
								path='/signup'
								element={
									<SignUp onSignup={() => console.log('Vai criar conta!')} />
								}
							/>
						</Routes>
					</div>
				</section>
			</main>
		</div>
	)
}

export default App
