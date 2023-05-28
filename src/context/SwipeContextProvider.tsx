import { SwipeContext } from './SwipeContext'
import { useState } from 'react'

const SwipeContextProvider = (props: { children: React.ReactNode }) => {
	const [swipedLeftAmount, setSwipedLeftAmount] = useState(0)
	const [swipedRightAmount, setSwipedRightAmount] = useState(0)

	const increaseLeft = () => {
		setSwipedLeftAmount(prevState => prevState + 1)
	}
	const increaseRight = () => {
		setSwipedRightAmount(prevState => prevState + 1)
	}
	const decreaseRight = () => {
		setSwipedRightAmount(prevState => prevState - 1)
	}
	const decreaseLeft = () => {
		setSwipedLeftAmount(prevState => prevState - 1)
	}

	const contextValue = {
		swipedLeftAmount,
		swipedRightAmount,
		increaseLeft,
		increaseRight,
		decreaseLeft,
		decreaseRight,
	}

	return <SwipeContext.Provider value={contextValue}>{props.children}</SwipeContext.Provider>
}

export default SwipeContextProvider
