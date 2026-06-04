import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { UserContext } from './UserContext.ts'
import type { User } from './UserContext.ts'
import {
	loginWithEmail as authLoginWithEmail,
	loginWithGoogle as authLoginWithGoogle,
	signUpWithEmail as authSignUpWithEmail,
	logout as authLogout,
} from '../services/auth/FirebaseAuthService.ts'

import { refreshSession } from "../services/auth/SessionUtils.ts"

const defaultUser: User = {
	email: '',
	name: '',
	firebase_uid: '',
	isLoggedIn: false,
}

function toLoggedInUser(user: { email: string; name: string; firebase_uid: string }): User {
	return {
		email: user.email,
		name: user.name,
		firebase_uid: user.firebase_uid,
		isLoggedIn: true,
	}
}

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User>(defaultUser)
	const [isSessionReady, setIsSessionReady] = useState(false)

	useEffect(() => {
		let active = true

		async function restoreSession() {
			try {
				const sessionUser = await refreshSession()
				if (!active) {
					return
				}

				setUser((currentUser) => (currentUser.isLoggedIn ? currentUser : toLoggedInUser(sessionUser)))
			} catch {
				if (!active) {
					return
				}

				setUser((currentUser) => (currentUser.isLoggedIn ? currentUser : defaultUser))
			} finally {
				if (active) {
					setIsSessionReady(true)
				}
			}
		}

		void restoreSession()

		return () => {
			active = false
		}
	}, [])

	const loginWithEmail = async (email: string, password: string) => {
		const sessionUser = await authLoginWithEmail(email, password)
		setUser(toLoggedInUser(sessionUser))
	}

	const signUpWithEmail = async (email: string, password: string, name: string) => {
		const sessionUser = await authSignUpWithEmail(email, password, name)
		setUser(toLoggedInUser(sessionUser))
	}

	const loginWithGoogle = async () => {
		const sessionUser = await authLoginWithGoogle()
		setUser(toLoggedInUser(sessionUser))
	}

	const logout = async () => {
		await authLogout()
		setUser(defaultUser)
		setIsSessionReady(true)
	}

	return (
		<UserContext.Provider value={{ user, isSessionReady, loginWithEmail, signUpWithEmail, loginWithGoogle, logout }}>
			{children}
		</UserContext.Provider>
	)
}
