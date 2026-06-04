import { createContext } from 'react'

export type User = {
	email: string
	name: string
	firebase_uid: string
	isLoggedIn: boolean
}

export type UserContextType = {
	user: User
	isSessionReady: boolean
	loginWithEmail: (email: string, password: string) => Promise<void>
	signUpWithEmail: (email: string, password: string, name: string) => Promise<void>
	loginWithGoogle: () => Promise<void>
	logout: () => Promise<void>
}

// Esse código define o Contexto (todos que estiverem dentro, não importa o caminho, poderá receber suas informações)
// Dessa forma, no caso de
//  <AuthContext.Provider value={{ user, login, logout }}>
//	<LandingPage>
//		<ComponenteAleatorio/>
//	</LandingPage>
//  </AuthContext.Provider>

export const UserContext = createContext<UserContextType | null>(null)
