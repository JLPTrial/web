import useUser from '../hooks/useUser.ts'
import { useNavigate } from 'react-router'
import { text } from '../ui/text.ts';
import { box } from '../ui/box.ts';

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
        <div className="flex flex-col justify-center gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <button className={box()} onClick={handleSignup}>
            Criar conta
        </button>
    );
}

export default function SignUpPage() {
    return (
        <div className='flex flex-col gap-10 w-full max-w-[1200px] mx-auto sm:px-10'>
            <SignupHeader />
            <SignupForm />
            <SignupButton />
        </div>
    )
}
