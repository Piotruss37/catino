import Header from '../components/Header/Header'
import { useState, useEffect, useContext } from 'react'
import useHttp from '../hooks/use-http'
import { DATABASE_LINK } from '../constants/endpoints'
import { AuthContext } from '../context/AuthContext'
import TinderCard from 'react-tinder-card'
import { CardItem } from '../types/CardItem'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { SwipeContext } from '../context/SwipeContext'
interface Data {
	[key: string]: CardItem
}

let didSwipeAll = false
let isInitial = true
const Swipe = () => {
	const [swipeDirection, setSwipeDirection] = useState('')
	const { isLoading, sendRequest } = useHttp()
	const [isSwiping, setIsSwiping] = useState(false)
	const [iconClasses, setIconClasses] = useState('iconup')
	const authCtx = useContext(AuthContext)
	const swipeCtx = useContext(SwipeContext)
	const data = swipeCtx.swipeData

	useEffect(() => {
		if (!didSwipeAll && isInitial) {
			sendRequest(`${DATABASE_LINK}/users.json`, {}, (data: Data) => {
				const transformedData = Object.keys(data).map(item => {
					return {
						...data[item],
					}
				})
				const currentUserId = authCtx.userData.localId

				const dataWithoutUser = transformedData.filter(item => {
					return item.localId !== currentUserId
				})
				isInitial = false

				swipeCtx.setData(dataWithoutUser)
			})
		}
	}, [authCtx.userData.localId, sendRequest])

	const onCardLeftScreen = () => {
		setIconClasses('iconup animated-icon')

		setTimeout(() => {
			setIconClasses('iconup')
		}, 700)
	}

	const handleDirection = (myIdentifier: string, direction: string) => {
		setIsSwiping(true)
		setSwipeDirection(direction)
		setTimeout(() => {
			setIsSwiping(false)
			swipeCtx.setData(prevData => {
				return prevData.filter(item => item.localId !== myIdentifier)
			})
		}, 200)
		setIconClasses('iconup')
	}

	useEffect(() => {
		if (data.length === 0 && swipeDirection) {
			didSwipeAll = true
		}
	}, [data, swipeDirection])

	useEffect(() => {
		if (isSwiping) {
			if (swipeDirection === 'right') {
				swipeCtx.increaseRight()
			} else {
				swipeCtx.increaseLeft()
			}
		}
	}, [swipeDirection, isSwiping]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Header className={'swipe-page'} showButton={false} description='Swipe left for dislike, right for like'>
				<div className='swipe-container'>
					{isLoading ? (
						<p>Loading...</p>
					) : data.length > 0 ? (
						data.map(item => (
							<TinderCard
								key={item.localId}
								className='swipe-card'
								onCardLeftScreen={onCardLeftScreen}
								onSwipe={direction => handleDirection(item.localId, direction)}
								preventSwipe={['up', 'down']}
							>
								<img src={item.photoUrl} alt='user avatar' />
								<h3>{item.displayName}</h3>
							</TinderCard>
						))
					) : (
						<p>No more cards available</p>
					)}
				</div>
				{swipeDirection === 'right' && (
					<p>{<IconThumbUp strokeWidth={1} height='44' width='44' className={iconClasses}></IconThumbUp>}</p>
				)}
				{swipeDirection === 'left' && (
					<p>{<IconThumbDown strokeWidth={1} height='44' width='44' className={iconClasses}></IconThumbDown>}</p>
				)}
			</Header>
		</>
	)
}

export default Swipe
