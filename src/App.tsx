import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route,NavLink } from "react-router";

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
		<div className="app-shell">
		<header className="top-nav">
		<strong className="brand">JLPTrial</strong>
		<nav className="top-links" aria-label="Navegacao principal">
		<a href="#">Questões</a>
		<a href="#">Meu Progresso</a>
		<a href="#">Minha Conta</a>
		</nav>
		</header>

		<main className="web-home">
		<section className="jlpt-card" aria-live="polite">
		<h1>JLPTrial Web</h1>
		<p>
		VOCÊ CONSEGUIU! Tá tudo certo agora!
		</p>
		<br/>
		<div className="space-y-4 text-gray-800">
		<p className="text-lg font-medium">
		Agora, você consegue utilizar o Tailwind!
		</p>

		<p className="text-red-500 text-2xl font-semibold">
		Aqui, por exemplo, está um texto vermelho e maior
		</p>

		<p className="text-base leading-relaxed">
		Para mais informações sobre como o Tailwind é usado, acesse{" "}
		<a
		className="text-cyan-500 font-medium hover:underline hover:text-cyan-600 transition-colors"
		href="https://tailwindcss.com/docs"
		target="_blank"
		rel="noopener noreferrer"
		>
		</a>
		é só acessar o site deles.
			</p>

		<p className="text-sm text-gray-600">
		(Para encontrar algo específico, pressione{" "}
		 <span className="px-2 py-1 bg-gray-100 rounded-md font-mono text-xs">
		 Ctrl + K
		 </span>{" "}
		 e pesquise rapidamente :D)
		 </p>
		 </div>

		  <div>
      <p className="text-lg font-medium">
        Opa, React Router instalado! 
      </p>

      {/* Navegação */}
      <nav className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Register
        </NavLink>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route
          path="/"
          element={<p className="text-base">Página inicial!!!!</p>}
        />
        <Route
          path="/login"
          element={<p className="text-base">Uau, login :O</p>}
        />
        <Route
          path="/register"
          element={<p className="text-base">Crie a sua conta!</p>}
        />
      </Routes>
    </div>

		 <div className={`status-pill ${isOnline ? 'ok' : 'error'}`}>
		 <span className="dot" aria-hidden="true" />
		 <span>{isOnline ? 'Backend conectado' : 'Falha de conexao'}</span>
		 </div>

		 <p className="response-label">Resposta do backend</p>
		 <pre>{message}</pre>
		 </section>
		 </main>
		 </div>
	)
}

export default App
