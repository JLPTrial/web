import './App.css'
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router'
import Dashboard from './components/Dashboard.tsx'
import LandingPage from './components/LandingPage.tsx'
import Statistics from './components/Statistics.tsx'
import LogIn from './components/LogIn.tsx'
import SignUp from './components/SignUp.tsx'
import Question from './components/Question.tsx'
import QuestionPreview from './components/QuestionPreview.tsx'
import UserSettings from './components/UserSettings.tsx'
import useUser from './hooks/useUser.ts'

function App() {
        const { user, logout } = useUser()
        const navigate = useNavigate()

        async function handleLogout() {
                await logout()
                navigate('/')
        }

        return (
                <div className='app-shell'>
                        <header className='top-nav'>
                                <strong className='brand'>JLPTrial</strong>
                                <nav
                                        className='top-links'
                                        aria-label='Navegacao principal'>
                                        <NavLink to='/question'>Questões</NavLink>
                                        <NavLink to='/question-preview'>Teste da API</NavLink>
                                        <a href='#'>Meu Progresso</a>
                                        <NavLink to='/settings'>Minha Conta</NavLink>
                                        {
                                                user.isLoggedIn ?
                                                (
                                                        <button onClick={handleLogout} className='cursor-pointer'>
                                                                <a>Sair</a> 
                                                                {/* TODO: Designers mexendo no CSS, mudem o estilo disso para não precisar do <a></a> ou não sla... */}
                                                        </button>
                                                )
                                                :
                                                (
                                                        <>
                                                                <NavLink to='/signup'>Registrar-se</NavLink>
                                                                <NavLink to='/login'>Entrar</NavLink>
                                                        </>
                                                )
                                        }
                                </nav>
                        </header>

                        <main className='w-full mx-auto mt-5 max-w-6xl flex justify-center align-center'>
                                <section
                                        className='mx-auto px-4 w-full'
                                        aria-live='polite'>
                                        <div className='flex flex-col gap-2 w-full'>
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
                                                                path='/question-preview'
                                                                element={<QuestionPreview />}
                                                        />
                                                        <Route
                                                                path='/login'
                                                                element={<LogIn />}
                                                        />
                                                        <Route
                                                                path='/signup'
                                                                element={<SignUp />}
                                                        />
                                                        {/* Rota Protegida de Configurações */}
                                                        <Route 
                                                                path='/settings' 
                                                                element={user.isLoggedIn ? <UserSettings /> : <Navigate to="/login" replace />} 
                                                        />
                                                </Routes>
                                        </div>
                                </section>
                        </main>
                </div>
        )
}

export default App