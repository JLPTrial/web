import { Link } from 'react-router';
import useUser from '../hooks/useUser.ts';
import { useThemeContext } from '../contexts/ThemeContext.ts';
import { useRequireAuth } from '../hooks/useRequireAuth.ts'
import { Button } from './Button.tsx'

import { FormLabel } from '../components/FormLabel.tsx';
import { FormInput } from '../components/FormInput.tsx';


export default function UserSettings() {
    const { user } = useUser();
    const { theme, toggleTheme } = useThemeContext();
    const { authStatus } = useRequireAuth()

    if (authStatus === 'pending') {
        return <div className='p-8 text-center'>Carregando sessão...</div>
    }

    if (authStatus === 'unauthenticated') {
        return null
    }

    return (
        <div className="flex flex-col gap-10 w-full max-w-[1200px] mx-auto sm:px-10 my-10 text-left transition-colors duration-200">
            
            {/* Header Section */}
            <div className="flex flex-col w-full">
                <Link 
                    to="/" 
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline w-fit mb-2 transition-colors duration-200"
                >
                    &larr; Voltar ao Dashboard
                </Link>
                <h1 className="font-bold text-5xl p-1 !text-gray-900 dark:!text-gray-100 transition-colors duration-200">
                    Configurações da Conta
                </h1>
                <p className="p-2 !text-gray-600 dark:!text-gray-400 transition-colors duration-200">
                    Gerencie suas informações pessoais e preferências gerais.
                </p>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-md shadow-sm transition-colors duration-200">
                <h2 className="font-bold text-2xl mb-2 !text-gray-900 dark:!text-gray-100 transition-colors duration-200">
                    Perfil
                </h2>
                
                <div>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormInput
                        type="text"
                        defaultValue={user.name || ''}
                        placeholder="Seu nome de usuário"
                    />
                </div>

                <Button size="lg" className="w-full sm:w-[400px] mt-4">
                    Salvar Usuário
                </Button>
            </div>

            {/* Account Security Section */}
            <div className="flex flex-col p-6 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-md shadow-sm transition-colors duration-200">
                <h2 className="font-bold text-2xl mb-6 !text-gray-900 dark:!text-gray-100 transition-colors duration-200">
                    Segurança da Conta
                </h2>

                {/* Change Email */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 transition-colors duration-200">
                    <div>
                        <h3 className="font-semibold text-lg !text-gray-900 dark:!text-gray-100">Endereço de E-mail</h3>
                        <p className="text-sm !text-gray-600 dark:!text-gray-400 mt-1">
                            Seu e-mail atual é <strong className="!text-gray-800 dark:!text-gray-200">{user.email || 'não definido'}</strong>.
                        </p>
                    </div>
                    <Button size="md">
                        Alterar E-mail
                    </Button>
                </div>

                {/* Change Password */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 transition-colors duration-200">
                    <div>
                        <h3 className="font-semibold text-lg !text-gray-900 dark:!text-gray-100">Senha</h3>
                        <p className="text-sm !text-gray-600 dark:!text-gray-400 mt-1">
                            Certifique-se de que sua conta esteja usando uma senha segura.
                        </p>
                    </div>
                    <Button size="md">
                        Atualizar Senha
                    </Button>
                </div>

                {/* Delete Account */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200">
                    <div>
                        <h3 className="font-semibold text-lg !text-red-600 dark:!text-red-500">Excluir Conta</h3>
                        <p className="text-sm !text-red-700 dark:!text-red-400 mt-1">
                            Remover permanentemente sua conta pessoal e todos os seus dados.
                        </p>
                    </div>
                    <Button tone="danger" size="md">
                        Excluir Conta
                    </Button>
                </div>
            </div>

            {/* Preferences Section */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-md shadow-sm transition-colors duration-200">
                <h2 className="font-bold text-2xl mb-2 !text-gray-900 dark:!text-gray-100 transition-colors duration-200">
                    Preferências
                </h2>
                <p className="text-sm !text-gray-600 dark:!text-gray-400 mb-4 transition-colors duration-200">
                    Personalize a sua experiência na plataforma.
                </p>
                
                <div className="flex items-center gap-3">
                    <button 
                        type="button"
                        onClick={toggleTheme}
                        className={`
                            relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                            ${theme === 'dark' ? 'bg-[rgb(255,0,0)]' : 'bg-gray-300'}
                        `}
                        aria-label="Alternar Modo Escuro"
                    >
                        <span 
                            className={`
                                inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-300 ease-in-out
                                ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
                            `}
                        />
                    </button>
                    <span className="text-sm font-medium !text-gray-700 dark:!text-gray-200 transition-colors duration-200">
                        {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
                    </span>
                </div>
            </div>

        </div>
    );
}