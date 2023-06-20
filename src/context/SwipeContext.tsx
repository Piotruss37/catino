import { createContext } from 'react'
import { CardItem } from '../types/CardItem'

interface SwipeContextType {
	swipeData: CardItem[]
	setData: React.Dispatch<React.SetStateAction<CardItem[]>>
	swipedLeftAmount: number
	swipedRightAmount: number
	increaseRight: () => void
	increaseLeft: () => void
	reset: () => void
}

const defaultSwipeContextValue = {
	swipeData: [],
	swipedLeftAmount: 0,
	swipedRightAmount: 0,
	setData: () => {},
	increaseRight: () => {},
	increaseLeft: () => {},
	reset: () => {},
}

export const SwipeContext = createContext<SwipeContextType>(defaultSwipeContextValue)
