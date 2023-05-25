import { createContext } from 'react'

const defaultContextValue = {
	isNavExtended: false,
	openNavHandler: () => {},
	closeNavHandler: () => {},
	toggleNavHandler: () => {},
}

interface NavContextType {
	isNavExtended: boolean
	openNavHandler: () => void
	closeNavHandler: () => void
	toggleNavHandler: () => void
}

export const NavContext = createContext<NavContextType>(defaultContextValue)
