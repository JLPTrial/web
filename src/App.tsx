import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router'
import Dashboard from './components/Dashboard.tsx'
import LandingPage from './components/LandingPage.tsx'
import Statistics from './components/Statistics.tsx'
import LogIn from './components/LogIn.tsx'
import SignUp from './components/SignUp.tsx'
import Question from './components/Question.tsx'
import QuestionPreview from './components/QuestionPreview.tsx'
import UserSettings from './components/UserSettings.tsx'
import useUser from './hooks/useUser.ts'
import TopNavBar from './components/TopNavBar.tsx'

function App() {
	const { user, logout } = useUser()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    return (
        <div className='app-shell'>
            
            <TopNavBar
                isLoggedIn={user.isLoggedIn}
                handleLogout={handleLogout}
            />

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