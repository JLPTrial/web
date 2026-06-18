import { NavLink } from "react-router";
import { useState } from 'react'

interface TopNavBarProperties {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

export default function TopNavBar({ isLoggedIn, handleLogout, }: TopNavBarProperties) {
    const [open, setOpen] = useState(false);
    return (
        <>
        <header className="relative z-50 bg-white h-[64px] px-4 border-b border-[var(--nav-border)] flex items-center justify-between">

            <NavLink to="/">
                <img src="src/assets/jlptrial_logo_variant_cursor.svg" alt="JLPTrial" className="brand" />
            </NavLink>

            {/* Navigation bar shown on desktop (i.e. large screens) */}
            <div className="hidden sm:flex gap-3">
                
                <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/question">Questões</NavLink>
                <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/question-preview">Teste da API</NavLink>
                <a className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" href="#">Meu Progresso</a>
                <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/settings">Minha Conta</NavLink>

                {
                    isLoggedIn ? (
                        <button onClick={handleLogout} className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out">
                            Sair
                        </button>
                    ) : (
                        <>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/signup">Registrar-se</NavLink>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/login">Entrar</NavLink>
                        </>
                    )   
                }

            </div>
            
            {/* Menu button to show navigation links (only shown on mobile) */}
            <button className="text-xl cursor-pointer mr-2 sm:hidden" onClick={() => setOpen(!open)}>☰</button>
            
        </header>

        {/* Navigation bar shown on mobile (i.e. smaller screens) */}
        {open && (
            <div className="flex flex-col items-center gap-2 relative z-50 bg-[rgb(255,255,255)] text-black p-4 sm:hidden">
                
                <NavLink className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center" to="/question">Questões</NavLink>
                <NavLink className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center" to="/question-preview">Teste da API</NavLink>
                <a className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center" href="#">Meu Progresso</a>
                <NavLink className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center" to="/settings">Minha Conta</NavLink>

                {
                    isLoggedIn ? (
                        <button onClick={handleLogout} className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center">
                            Sair
                        </button>
                    ) : (
                        <>
                            <NavLink className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center" to="/signup">Registrar-se</NavLink>
                            <NavLink className="cursor-pointer w-full py-1 hover:bg-[rgb(200,200,200)] text-center" to="/login">Entrar</NavLink>
                        </>
                    )   
                }

            </div>
            )}
        </>
    );
}