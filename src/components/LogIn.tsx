import { useState } from 'react'
import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'
import { leaf_button } from '../ui/leaf-button-variants.ts';
import { text } from '../ui/text.ts';

import { JapanBackground } from "./JapanBackground";
import { FormLabel } from '../components/FormLabel.tsx';
import { FormInput } from '../components/FormInput.tsx';


function LoginHeader() {
    return (
        <div className="flex flex-col justify-center text-left w-full p-5 self-center">
            <div className={text({tone:"jlpt",size:"5xl",weight:"semibold",align:"center" })}>Entrar</div>
            <div className='p-2 self-center'>Entre na sua conta JLPTrial</div>
        </div>
    );
}

function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
}: {
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
}) {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div>
                <FormLabel htmlFor="email">Endereço de email</FormLabel>
                <FormInput
                    type="email"
                    placeholder="você@exemplo.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                
            </div>

            <div>
                <FormLabel htmlFor="password">Endereço de email</FormLabel>
                <FormInput
                    type="password"
                    placeholder="Insira a sua senha"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </div>
        </div>
    )
}

export default function LogInPage() {
    const navigate = useNavigate()
    const { loginWithEmail, loginWithGoogle } = useUser()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleEmailLogin(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        setError('')
        setIsLoading(true)

        try {
            await loginWithEmail(email, password)
            navigate('/')
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Não foi possível entrar.'
            )
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
            setError(
                err instanceof Error
                    ? err.message
                    : 'Não foi possível entrar com Google.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-92px)] flex justify-center items-stretch">
            
            <JapanBackground />

            <div className="relative z-50 flex flex-1 flex-col justify-start items-center gap-3">
                <LoginHeader />

                <div className='flex flex-col justify-center items-center gap-7'>
                    <form
                        onSubmit={handleEmailLogin}
                        className="flex flex-col items-center gap-4"
                    >
                        <LoginForm
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />

                        {error && (
                            <div className="text-sm text-red-600">
                                {error}
                            </div>
                        )}


                        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={leaf_button({ shape: 'rectangle'})}
                                >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </button>

                            <p>ou</p>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className={leaf_button({ shape: 'rectangle' })}
                            >
                                Entrar com Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
