import { useState } from 'react'
import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'

function LoginHeader() {
    return (
        <div className="flex flex-col justify-center text-left w-full sm:max-w-[700px] min-h-[250px] p-5 self-center">
            <div className='font-bold text-5xl p-1 self-center'>Entrar</div>
            <div className='p-2 self-center'>Entre na sua conta JLPTrial</div>
        </div>
    );
}

export default function LogInPage() {
    const navigate = useNavigate()
    const { loginWithEmail, loginWithGoogle } = useUser()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleEmailLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await loginWithEmail(email, password)
            navigate('/')
        } catch (err) {
            // TODO: Implementar um tradutor de erros aqui
            // Para falar se já tem usuário, ou se a senha ou usuário estão errados, etc...
            setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleGoogleLogin() {
        setError('')
        setIsLoading(true)

        try {
            await loginWithGoogle()
            navigate('/')
        } catch (err) {
            // TODO: Implementar um tradutor de erros aqui
            // Para falar se já tem usuário, ou se a senha ou usuário estão errados, etc...
            setError(err instanceof Error ? err.message : 'Não foi possível entrar com Google.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-10 w-full max-w-[1200px] mx-auto sm:px-10'>
            <LoginHeader />

            <form className="flex flex-col justify-center gap-4" onSubmit={handleEmailLogin}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Endereço de email
                    </label>
                    <input
                    className="
                        w-[400px]
                        px-3 
                        py-2 
                        bg-white 
                        border 
                        border-gray-300 
                        rounded-md 
                        shadow-sm 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-black-500 
                        focus:border-transparent 
                        transition 
                        duration-150
                    "
                    type="email"
                    placeholder="você@exemplo.com"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                        Senha
                    </label>
                    <input
                        className="
                            w-[400px] 
                            px-3 
                            py-2 
                            bg-white 
                            border 
                            border-gray-300 
                            rounded-md 
                            shadow-sm 
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-black-500 
                            focus:border-transparent 
                            transition duration-150
                        "
                        type="password"
                        placeholder="Insira a sua senha"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                {error ? <div className="text-sm text-red-600">{error}</div> : null}

                <button className="bg-black
                        shadow-2xl
                        text-white
                        rounded-lg
                        self-center
                        px-10
                        py-3
                        my-5
                        text-l
                        cursor-pointer
                        hover:bg-[rgb(255,0,0)]
                        transition-all
                        disabled:cursor-not-allowed 
                        disabled:opacity-60
                        "
                    type="submit"
                    disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <div className="flex flex-col gap-3">
                <button
                    type="button"
                    className="
                    bg-white border 
                    border-gray-300 
                    shadow-sm 
                    text-gray-900 
                    rounded-lg 
                    self-center 
                    px-10 
                    py-3 
                    text-l 
                    cursor-pointer 
                    hover:bg-gray-50 
                    transition-all 
                    disabled:cursor-not-allowed 
                    disabled:opacity-60
                    "
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                >
                    Entrar com Google
                </button>
            </div>
        </div>
    )
}