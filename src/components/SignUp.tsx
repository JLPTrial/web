// Recurso que permite navegar pelas páginas através de lógica no código ao invés de só por links clicados pelo usuário
import { useNavigate } from 'react-router'

type Properties = {
    onSignup: () => void
    // Depois provavelmente vai ter mais propriedades aqui
}

export default function SignUpPage({ onSignup }: Properties) {
    const navigate = useNavigate()

    function handleSignup() { 
        onSignup()
        navigate('/')
    }
    
	return(
        <div className='w-100 bg-red-500 p-2 rounded-md'>

            Sign Up
            <br/>
            <button onClick={handleSignup} className='bg-white p-2 rounded-md'>
                Registrar-se
            </button>

        </div>
    )
}