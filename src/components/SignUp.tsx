import { useState } from 'react'
import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'

import { JapanBackground } from "./JapanBackground";
import { FormLabel } from '../components/FormLabel.tsx';
import { FormInput } from '../components/FormInput.tsx';
import { Text } from './Text.tsx';
import { LeafButton } from './LeafButton.tsx';


function SignupHeader() {
    return (
        <div className="flex flex-col justify-center text-left w-full p-5 self-center">
            <Text usage={"page_title"} align={"center"}>Registrar-se</Text>
            <Text usage={"subtitle"} align={"center"}>Crie uma conta JLPTrial</Text>
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
                <FormLabel>Nome</FormLabel>
                <FormInput
                    usage={"login_signup"}
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <FormLabel>Endereço de email</FormLabel>
                <FormInput
                    usage={"login_signup"}
                    type="email"
                    placeholder="você@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <FormLabel>Senha</FormLabel>
                <FormInput
                    usage={"login_signup"}
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
            
            <JapanBackground />

            <div className="relative z-50 flex flex-1 flex-col justify-start items-center gap-3">
                <SignupHeader />

                <div className='flex flex-col justify-center items-center gap-7'>
                    <form
                        onSubmit={handleSignup}
                        className="flex flex-col items-center gap-8"
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


                        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                            <LeafButton
                                type="submit"
                                disabled={isLoading}
                                shape={"rectangle"}
                                >
                                {isLoading ? 'Criando...' : 'Criar conta'}
                            </LeafButton>

                            <Text>ou</Text>

                            <LeafButton
                                type="button"
                                onClick={handleGoogleSignup}
                                disabled={isLoading}
                                shape={"rectangle"}
                                >
                                Entrar com Google
                            </LeafButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
