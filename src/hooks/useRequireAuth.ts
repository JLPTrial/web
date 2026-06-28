import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { auth } from '../constants/FirebaseApp'
import { refreshSession } from '../services/auth/SessionUtils'
import useUser from './useUser'

type AuthStatus = 'pending' | 'authenticated' | 'unauthenticated'

export function useRequireAuth(): { authStatus: AuthStatus } {
    const { user, isSessionReady } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isSessionReady) return
        if (user.isLoggedIn) return

        const firebaseUser = auth.currentUser

        if (!firebaseUser || !firebaseUser.refreshToken) {
            navigate('/login', { replace: true, state: { from: location } })
            return
        }

        refreshSession()
            .catch(() => {
                auth.signOut()
                navigate('/login', { replace: true, state: { from: location } })
            })
    }, [isSessionReady, user.isLoggedIn, navigate, location])

    if (!isSessionReady) return { authStatus: 'pending' }
    if (user.isLoggedIn) return { authStatus: 'authenticated' }
    return { authStatus: 'pending' }
}
