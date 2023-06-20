import { CardItem } from '../types/CardItem'
import { SwipeContext } from './SwipeContext'
import { useState } from 'react'
const SwipeContextProvider = (props: { children: React.ReactNode }) => {
	const [data, setData] = useState<CardItem[]>([])
	const [swipedRightAmount, setswipedRightAmount] = useState(0)
	const [swipedLeftAmount, setswipedLeftAmount] = useState(0)

	const increaseLeft = () => {
		setswipedLeftAmount(swipedLeftAmount => {
			return swipedLeftAmount + 1
		})
	}

	const increaseRight = () => {
		setswipedRightAmount(swipedRightAmount => {
			return swipedRightAmount + 1
		})
	}

	const reset = () => {
		setswipedLeftAmount(0)
		setswipedRightAmount(0)
	}

	const swipeContextValue = {
		swipeData: data,
		setData,
		swipedLeftAmount,
		swipedRightAmount,
		reset,
		increaseLeft,
		increaseRight,
	}

	return <SwipeContext.Provider value={swipeContextValue}>{props.children}</SwipeContext.Provider>
}

export default SwipeContextProvider
