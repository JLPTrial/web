import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'
import { Button } from './Button.tsx';
import { text } from '../ui/text.ts';
import { form_input } from '../ui/form-input-variants.ts';

function SignupHeader() {
    return (
        <div className="flex flex-col justify-center text-left w-full sm:max-w-[700px] min-h-[250px] p-5 self-center">
            <div className={text({ tone: "jlpt", size: "5xl", weight: "semibold", align: "center" })}>Registrar-se</div>
            <div className='p-2 self-center'>Crie uma conta JLPTrial</div>
        </div>
    );
}

function SignupForm() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço de email
                </label>
                <input
                    className={form_input()}
                    type="email"
                    placeholder="você@exemplo.com"
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
                />
            </div>
        </div>
    );
}

function SignupButton() {
    const navigate = useNavigate();
    const { login } = useUser()

    async function handleSignup() {
        await login(
            {
                email: 'teste@email.com',
                username: 'Usuário Teste',
                id: '1',
                isLoggedIn: true,
            }
        );

        navigate('/')
    }

    return (
        <Button onClick={handleSignup}>
            Criar conta
        </Button>
    );
}

export default function SignUpPage() {
    return (
        <div className='flex flex-col justify-center items-center gap-10 w-full max-w-[1200px] mx-auto sm:px-10'>
            <SignupHeader />
            <SignupForm />
            <SignupButton />
        </div>
    )
}
