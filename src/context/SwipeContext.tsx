import { createContext } from 'react'
import { CardItem } from '../types/CardItem'
const defaultSwipeContextValue = {
	swipedLeftAmount: 9,
	swipedRightAmount: 0,
	availableCards: [],
}

interface SwipeContextType {
	swipeLeftAmount: number
	swipeRightAmount: number
	availableCards: CardItem[]
}

export const SwipeContext = createContext(defaultSwipeContextValue)
