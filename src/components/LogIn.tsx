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

function LoginForm() {
    return(
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
                    placeholder="Insira a sua senha"
                />
            </div>
        </div>
    );
}

function LoginButton() {
    const navigate = useNavigate();
    const { login } = useUser()
    
    async function handleLogin() {
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
            "
            onClick={handleLogin}>
        Entrar
      </button>
    );
}

export default function LogInPage() {
	return(
        <div className='flex flex-col gap-10 w-full max-w-[1200px] mx-auto sm:px-10'>
            <LoginHeader />
            <LoginForm />
            <LoginButton />
        </div> 
    )
}