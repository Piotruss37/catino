import { createContext } from 'react'
import { NewData } from '../types/NewData'
const defaultContextValue = {
	isLoggedIn: false,
	loginHandler: () => {},
	logoutHandler: () => {},
	updateUserData: (newData: NewData) => {},
	userData: {
		idToken: '',
		expiresIn: '',
		localId: '',
		photoUrl: '',
		displayName: '',
	},
}

interface ContextType {
	isLoggedIn: boolean
	loginHandler: () => void
	logoutHandler: () => void
	updateUserData: (newData: NewData) => void
	userData: NewData
}

export const AuthContext = createContext<ContextType>(defaultContextValue)
