import { NavLink } from "react-router";

interface TopNavBarProperties {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

export default function TopNavBar({ isLoggedIn, handleLogout, }: TopNavBarProperties) {
    return (
        <header className="top-nav">

            <NavLink to="/">
                <img src="src/assets/jlptrial_logo_variant_cursor.svg" alt="JLPTrial" className="brand" />
            </NavLink>

            <nav className="top-links" aria-label="Navegacao principal">
                
                <NavLink to="/question">Questões</NavLink>
                <NavLink to="/question-preview">Teste da API</NavLink>
                <a href="#">Meu Progresso</a>
                <NavLink to="/settings">Minha Conta</NavLink>

                {
                    isLoggedIn ? (
                        <button onClick={handleLogout} className="cursor-pointer">
                            Sair
                        </button>
                    ) : (
                        <>
                            <NavLink to="/signup">Registrar-se</NavLink>
                            <NavLink to="/login">Entrar</NavLink>
                        </>
                    )   
                }

            </nav>
        </header>
    );
}