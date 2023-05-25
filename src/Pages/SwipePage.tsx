import Header from '../components/Header/Header'
import { useState, useEffect, useContext } from 'react'
import useHttp from '../hooks/use-http'
import { DATABASE_LINK } from '../constants/endpoints'
import { AuthContext } from '../context/AuthContext'
import TinderCard from 'react-tinder-card'

interface Data {
	[key: string]: DataItem
}

interface DataItem {
	displayName: string
	localId: string
	photoUrl: string
}

const Swipe = () => {
	const [data, setData] = useState<DataItem[]>([])
	const { isLoading, hasError, didSucceed, sendRequest } = useHttp()
	const authCtx = useContext(AuthContext)

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

	const onCardLeftScreen = (myIdentifier: string) => {
		setData(prevData => prevData.filter(item => item.localId !== myIdentifier))
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
								onCardLeftScreen={() => onCardLeftScreen(item.localId)}
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
			</Header>
		</>
	)
}

export default Swipe
