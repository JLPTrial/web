import { Link } from 'react-router';
import useUser from '../hooks/useUser.ts';
import { useTheme } from '../hooks/useTheme.ts';

export default function UserSettings() {
    const { user } = useUser();
    const { theme, toggleTheme } = useTheme();

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
                    <label className="block text-sm font-medium mb-1 !text-gray-700 dark:!text-gray-300 transition-colors duration-200">
                        Nome de Usuário
                    </label>
                    <input
                        className="
                            w-full sm:w-[400px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 
                            focus:ring-black dark:focus:ring-white focus:border-transparent transition duration-150
                            !text-gray-900 dark:!text-gray-100
                        "
                        type="text"
                        defaultValue={user.username || ''}
                        placeholder="Seu nome de usuário"
                    />
                </div>

                <button 
                    className="
                        bg-black dark:bg-gray-100 shadow-2xl text-white dark:text-black rounded-lg px-10 py-3 mt-4 
                        text-l cursor-pointer hover:bg-[rgb(255,0,0)] dark:hover:bg-[rgb(255,0,0)] dark:hover:text-white transition-all 
                        w-full sm:w-[400px] font-medium
                    "
                >
                    Salvar Usuário
                </button>
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
                    <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 !text-gray-900 dark:!text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium shadow-sm">
                        Alterar E-mail
                    </button>
                </div>

                {/* Change Password */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 transition-colors duration-200">
                    <div>
                        <h3 className="font-semibold text-lg !text-gray-900 dark:!text-gray-100">Senha</h3>
                        <p className="text-sm !text-gray-600 dark:!text-gray-400 mt-1">
                            Certifique-se de que sua conta esteja usando uma senha segura.
                        </p>
                    </div>
                    <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 !text-gray-900 dark:!text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium shadow-sm">
                        Atualizar Senha
                    </button>
                </div>

                {/* Delete Account */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200">
                    <div>
                        <h3 className="font-semibold text-lg !text-red-600 dark:!text-red-500">Excluir Conta</h3>
                        <p className="text-sm !text-red-700 dark:!text-red-400 mt-1">
                            Remover permanentemente sua conta pessoal e todos os seus dados.
                        </p>
                    </div>
                    <button className="px-6 py-2 bg-[rgb(255,0,0)] text-white rounded-md hover:bg-red-800 dark:hover:bg-red-700 transition-colors font-bold shadow-md">
                        Excluir Conta
                    </button>
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