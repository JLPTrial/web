import { useState } from 'react'
import type { ReactNode } from 'react'
import { UserContext } from './UserContext.ts'
import type { User } from './UserContext.ts'

const defaultUser = {
	email: '',
	username: '',
	id: '',
	isLoggedIn: true,
}
export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User>(defaultUser)

	const login = async (data: User) => {
		setUser(data)
	}

	const logout = () => {
		setUser(defaultUser)
	}

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	)
}
