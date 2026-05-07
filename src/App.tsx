import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from 'react-router'
import Dashboard from './components/Dashboard.tsx'
import LandingPage from './components/LandingPage.tsx'
import Statistics from './components/Statistics.tsx'
import LogIn from './components/LogIn.tsx'
import SignUp from './components/SignUp.tsx'

function App() {
	const [message, setMessage] = useState('Carregando mensagem do backend...')
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false) // protótipo
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
	console.log("a api está: " + (isOnline ? 'online' : 'offline'));
	console.log(message);

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
					<NavLink to="/signup">Registrar-se</NavLink>
					<NavLink to="/login">Entrar</NavLink>
				</nav>
			</header>

			<main className='web-home'>
			<Routes>
							<Route
								path='/'
								element={isUserLoggedIn ? <Dashboard /> : <LandingPage />}
							/>
							<Route
								path='/stat'
								element={<Statistics/>}
							/>
							<Route
								path='/mock-test'
								element={<>Mock test</>}
							/>
							<Route
								path='/question'
								element={<>Question</>}
							/>
							<Route
								path="/login"
								/* 
									Por enquanto a única coisa que está sendo feita é setar a variável.
									Eu imagino que fazer login tenha muito mais operações envolvidas.
								*/
								element={<LogIn onLogin={() => setIsUserLoggedIn(true)} />}
							/>
							<Route
								path="/signup"
								// Mesma coisa aqui.
								element={<SignUp onSignup={() => setIsUserLoggedIn(true)}/>}
							/>
						</Routes>
			</main>
		</div>
	)
}

export default App
