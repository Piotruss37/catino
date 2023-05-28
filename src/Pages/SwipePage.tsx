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

const Swipe = () => {
	const [data, setData] = useState<CardItem[]>([])
	const [swipeDirection, setSwipeDirection] = useState('')
	const { isLoading, hasError, didSucceed, sendRequest } = useHttp()
	const [iconClasses, setIconClasses] = useState('iconup')
	const authCtx = useContext(AuthContext)
	const swipeCtx = useContext(SwipeContext)

	useEffect(() => {
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

			setData(dataWithoutUser)
		})
	}, [authCtx.userData.localId, sendRequest])

	const onCardLeftScreen = (myIdentifier: string, direction: string) => {
		setIconClasses('iconup animated-icon')
		setSwipeDirection(direction)
		setData(prevData => prevData.filter(item => item.localId !== myIdentifier))

		console.log('card left screen')
		setTimeout(() => {
			setIconClasses('iconup')
		}, 700)
		swipeCtx.increaseLeft()
	}

	const handleDirection = (direction: string) => {
		setIconClasses('iconup')
		console.log('direction')
	}

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
								onCardLeftScreen={direction => onCardLeftScreen(item.localId, direction)}
								onSwipe={direction => handleDirection(direction)}
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
