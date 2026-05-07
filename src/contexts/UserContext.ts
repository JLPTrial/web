import { createContext } from 'react'

export type User = {
	email: string
	username: string
	id: string
	isLoggedIn: boolean
}

export type UserContextType = {
	user: User
	login: (data: User) => Promise<void>
	logout: () => void
}

// Esse código define o Contexto (todos que estiverem dentro, não importa o caminho, poderá receber suas informações)
// Dessa forma, no caso de
//  <AuthContext.Provider value={{ user, login, logout }}>
//	<LandingPage>
//		<ComponenteAleatorio/>
//	</LandingPage>
//  </AuthContext.Provider>

export const UserContext = createContext<UserContextType | null>(null)
