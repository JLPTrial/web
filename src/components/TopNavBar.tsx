import { NavLink } from "react-router";
import { useState } from 'react'
import Logo from './NavBarLogo.tsx'
import "../App.css";

interface TopNavBarProperties {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

export default function TopNavBar({ isLoggedIn, handleLogout, }: TopNavBarProperties) {
    const [open, setOpen] = useState(false);
    return (
        <>
        <header className="relative z-50 bg-white dark:bg-[#111827] h-[64px] px-4 border-b border-[var(--nav-border)] flex items-center justify-between">

            <NavLink to="/">
                <Logo />
            </NavLink>

            {/* Navigation bar shown on desktop (i.e. large screens) */}
            <div className="hidden lg:flex gap-3">
                

                {
                    isLoggedIn ? (
                        <>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/stat">Meu progresso</NavLink>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/settings">Minha Conta</NavLink>
                            <button onClick={handleLogout} className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out">
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/signup">Registrar-se</NavLink>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/login">Entrar</NavLink>
                        </>
                    )   
                }

            </div>
            
            {/* Menu button to show navigation links (only shown on mobile) */}
            <button
                className="w-10 h-10 flex items-center justify-center text-[30px] cursor-pointer mr-2 lg:hidden relative"
                onClick={() => setOpen(!open)}
            >
                <span className={`absolute text-[30px] transition-opacity duration-200 ${ open ? "opacity-0" : "opacity-100"  }`} >
                    ☰
                </span>

                <span className={`absolute text-[30px] transition-opacity duration-200 ${ open ? "opacity-100" : "opacity-0" }`} >
                    ✖
                </span>
            </button>
            
        </header>

        {/* Navigation bar shown on mobile (i.e. smaller screens) */}
        {open && (
            <div className="flex flex-col items-center gap-2 relative z-50 bg-[rgba(225,225,225,0.5)] text-black p-4 lg:hidden">

                {
                    isLoggedIn ? (
                        <>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/stat">Meu progresso</NavLink>
                            <NavLink className="cursor-pointer px-3 py-1 rounded-full hover:bg-[rgb(232,0,0)] hover:text-white transition duration-200 ease-in-out" to="/settings">Minha Conta</NavLink>
                            <button onClick={handleLogout} className="cursor-pointer w-full py-1 transition-all duration-150 hover:bg-[rgb(200,200,200)] text-center">
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => setOpen(false)} className="cursor-pointer w-full py-1 transition-all duration-150 hover:bg-[rgb(200,200,200)] text-center" to="/signup">Registrar-se</NavLink>
                            <NavLink onClick={() => setOpen(false)} className="cursor-pointer w-full py-1 transition-all duration-150 hover:bg-[rgb(200,200,200)] text-center" to="/login">Entrar</NavLink>
                        </>
                    )   
                }

            </div>
            )}
        </>
    );
}