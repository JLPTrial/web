import { useState } from 'react'
import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'
import { leaf_button } from '../ui/leaf-button-variants.ts';
import { text } from '../ui/text.ts';
import { form_input } from '../ui/form-input-variants.ts';
import japanBg from '../assets/japan.svg';

function SignupHeader() {
    return (
        <div className="flex flex-col justify-center text-left w-full p-5 self-center">
            <div className={text({ tone: "jlpt", size: "5xl", weight: "semibold", align: "center" })}>Registrar-se</div>
            <div className='p-2 self-center'>Crie uma conta JLPTrial</div>
        </div>
    );
}

function SignupForm({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
}: {
    name: string
    setName: (value: string) => void
    email: string
    setEmail: (value: string) => void
    password: string
    setPassword: (value: string) => void
}) {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                </label>
                <input
                    className={form_input()}
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço de email
                </label>
                <input
                    className={form_input()}
                    type="email"
                    placeholder="você@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                </label>
                <input
                    className={form_input()}
                    type="password"
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
    )
}


export default function SignUpPage() {
    const navigate = useNavigate()
    const { signUpWithEmail, loginWithGoogle } = useUser()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setError('')
        setIsLoading(true)

        try {
            await signUpWithEmail(email, password, name)
            navigate('/')
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Não foi possível criar a conta.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    async function handleGoogleSignup() {
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
            <div
                className="fixed z-0 opacity-33 pointer-events-none inset-0 bg-center bg-no-repeat bg-[length:125vmin] lg:bg-[length:150vmin] transition-transform duration-300 -rotate-30 lg:rotate-0"
                style={{ backgroundImage: `url(${japanBg})` }}
            />

            <div className="relative z-50 flex flex-1 flex-col justify-start items-center gap-10">
                <SignupHeader />

                <form
                    onSubmit={handleSignup}
                    className="flex flex-col items-center gap-4"
                >
                    <SignupForm
                        name={name}
                        setName={setName}
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

                    <button
                        className={leaf_button()}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Criando...' : 'Criar conta'}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className={leaf_button({ variant: 'secondary' })}
                >
                    Entrar com Google
                </button>
            </div>
        </div>
    )
}
