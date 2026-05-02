// Recurso que permite navegar pelas páginas através de lógica no código ao invés de só por links clicados pelo usuário
import { useNavigate } from 'react-router'

type Properties = {
    onLogin: () => void
    // Depois provavelmente vai ter mais propriedades aqui
}

export default function LogInPage({ onLogin }: Properties) {
    const navigate = useNavigate()

    function handleLogin() { 
        onLogin()
        navigate('/')
    }

	return(
        <div className='w-100 bg-red-500 p-2 rounded-md'>

            Log In
            <br/>
            <button onClick={handleLogin} className='bg-white p-2 rounded-md'>
                Entrar
            </button>

        </div>
    )
}