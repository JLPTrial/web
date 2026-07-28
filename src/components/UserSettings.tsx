import { Link } from 'react-router';
import useUser from '../hooks/useUser.ts';
import { useThemeContext } from '../contexts/ThemeContext.ts';
import { useRequireAuth } from '../hooks/useRequireAuth.ts'

import { FormLabel } from '../components/FormLabel.tsx';
import { FormInput } from '../components/FormInput.tsx';
import { ContentBox } from './ContentBox.tsx';
import { Text } from './Text.tsx';
import { LeafButton } from './LeafButton.tsx';


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
                <Text usage={"page_title"}>Configurações da Conta</Text>
                <Text usage={"subtitle"}>Gerencie suas informações pessoais e preferências gerais.</Text>
            </div>

            {/* Profile Section */}
            <ContentBox className="flex flex-col gap-4">
                <Text usage={"title"}>Perfil</Text>
                
                <div>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormInput
                        type="text"
                        usage={"settings"}
                        defaultValue={user.name || ''}
                        placeholder="Seu nome de usuário"
                    />
                </div>

                <LeafButton shape={"settings"} >
                    Salvar Usuário
                </LeafButton>
            </ContentBox>

            {/* Account Security Section */}
            <ContentBox className="flex flex-col gap-4">
                <Text usage={"title"}>Segurança da Conta</Text>

                {/* Change Email */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 transition-colors duration-200">
                    <div className='w-[67%]'>
                        <Text usage={"subtitle"}>Endereço de E-mail</Text>
                        <p className="text-sm !text-gray-600 dark:!text-gray-400 mt-1">
                            Seu e-mail atual é <strong className="!text-gray-800 dark:!text-gray-200">{user.email || 'não definido'}</strong>.
                        </p>
                    </div>
                    <LeafButton shape={"settings"} >
                        Alterar E-mail
                    </LeafButton>
                </div>

                {/* Change Password */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 transition-colors duration-200">
                    <div className='w-[67%]'>
                        <Text usage={"subtitle"}>Senha</Text>
                        <Text usage={"normal"}>Certifique-se de que sua conta esteja usando uma senha segura.</Text>
                    </div>
                    <LeafButton shape={"settings"} >
                        Atualizar Senha
                    </LeafButton>
                </div>

                {/* Delete Account */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200">
                    <div className='w-[67%]'>
                        <Text usage={"subtitle"}>Excluir Conta</Text>
                        <Text usage={"normal"}>Remover permanentemente sua conta pessoal e todos os seus dados.</Text>
                    </div>
                    <LeafButton shape={"settings"} >
                        Excluir Conta
                    </LeafButton>
                </div>
            </ContentBox>

            {/* Preferences Section */}
            <ContentBox className="flex flex-col gap-4">
                <Text usage={"title"}>Preferências</Text>
                <Text usage={"normal"}>Personalize a sua experiência na plataforma.</Text>
                
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
            </ContentBox>

        </div>
    );
}