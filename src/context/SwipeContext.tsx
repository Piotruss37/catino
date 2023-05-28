import { createContext } from 'react'

const defaultContextValue = {
	swipedLeftAmount: 0,
	swipedRightAmount: 0,
	increaseLeft: () => {},
	increaseRight: () => {},
	decreaseLeft: () => {},
	decreaseRight: () => {},
}
interface contextType {
	swipedLeftAmount: number
	swipedRightAmount: number
	increaseLeft: () => void
	decreaseLeft: () => void
	decreaseRight: () => void
	increaseRight: () => void
}

export const SwipeContext = createContext<contextType>(defaultContextValue)
