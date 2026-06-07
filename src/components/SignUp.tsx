import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'
import { Button } from './Button.tsx';
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
        <div className="min-h-[calc(100vh-92px)] flex justify-center items-stretch">
            <div
                className="fixed z-0 opacity-33 pointer-events-none inset-0 bg-center bg-no-repeat bg-[length:125vmin] lg:bg-[length:150vmin] transition-transform duration-300 -rotate-30 lg:rotate-0"
                style={{backgroundImage: `url(${japanBg})`}}
            />

            <div className='relative z-50 flex flex-1 flex-col justify-start items-center gap-10'>
                <SignupHeader />
                <SignupForm />
                <SignupButton />
            </div>
        </div>
    )
}
