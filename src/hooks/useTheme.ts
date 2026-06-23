import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    // Inicia lendo do localStorage ou da preferência do sistema do usuário
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            return savedTheme;
        }
        // Se não tiver salvo, checa se o SO do usuário prefere dark mode
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    // Sempre que o tema mudar, aplica a classe no HTML e salva no localStorage
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Função auxiliar para o botão
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}