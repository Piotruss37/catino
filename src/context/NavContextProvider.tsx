import { NavContext } from './NavContext'
import { useState } from 'react'

const NavContextProvider = (props: { children: React.ReactNode }) => {
	const [isNavExtended, setIsNavExtended] = useState(false)

	const openNavHandler = () => {
		setIsNavExtended(true)
	}

	const closeNavHandler = () => {
		setIsNavExtended(false)
	}

	const toggleNavHandler = () => {
		setIsNavExtended(prevState => {
			return !prevState
		})
	}

	const navContextValue = {
		isNavExtended,
		openNavHandler,
		closeNavHandler,
        toggleNavHandler
	}

	return <NavContext.Provider value={navContextValue}>{props.children}</NavContext.Provider>
}

export default NavContextProvider
