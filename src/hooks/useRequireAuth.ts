import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { auth } from '../constants/FirebaseApp'
import { refreshSession } from '../services/auth/SessionUtils'
import useUser from './useUser'

type AuthStatus = 'pending' | 'authenticated' | 'unauthenticated'

export function useRequireAuth() {
    const { user, isSessionReady } = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    const [authStatus, setAuthStatus] = useState<AuthStatus>('pending')

    useEffect(() => {
        // Se a sessão já está pronta e o usuário está logado, ok
        if (isSessionReady && user.isLoggedIn) {
            setAuthStatus('authenticated')
            return
        }

        // Se a sessão está pronta mas não está logado, verifica refreshToken
        if (isSessionReady && !user.isLoggedIn) {
            const firebaseUser = auth.currentUser

            // Sem usuário Firebase ou sem refreshToken: redireciona imediatamente
            if (!firebaseUser || !firebaseUser.refreshToken) {
                navigate('/login', { replace: true, state: { from: location } })
                setAuthStatus('unauthenticated')
                return
            }

            // Tem refreshToken: tenta refresh
            refreshSession()
                .then(() => {
                    setAuthStatus('authenticated')
                })
                .catch(() => {
                    // Falhou: limpa o token e redireciona
                    auth.signOut()
                    navigate('/login', { replace: true, state: { from: location } })
                    setAuthStatus('unauthenticated')
                })
        }
    }, [isSessionReady, user.isLoggedIn])

    return { authStatus }
}
