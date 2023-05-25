import { AuthContext } from './AuthContext'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../constants/toastConfig'
import { NewData } from '../types/NewData'
import useHttp from '../hooks/use-http'
import { GET_USER_DATA_ENDPOINT } from '../constants/endpoints'
interface UserData {
	displayName: string
	photoUrl: string
	localId: string
}
function getTokenDuration() {
	const storedExpirationDate = localStorage.getItem('expiration')

	if (!storedExpirationDate) {
		return 0
	}

	const expirationDate = new Date(storedExpirationDate!)
	const now = new Date()
	const duration = expirationDate.getTime() - now.getTime()
	return duration
}
const retrieveStoredToken = () => {
	const token = localStorage.getItem('token')

	if (!token) {
		return null
	}

	let tokenDuration = getTokenDuration()
	if (tokenDuration < 0) {
		tokenDuration = 0
		return null
	}
	return token
}

const AuthContextProvider = (props: { children: React.ReactNode }) => {
	let duration = getTokenDuration()

	const defaultState = {
		idToken: retrieveStoredToken()!,
		expiresIn: duration.toString(),
		localId: '',
		photoUrl: '',
		displayName: '',
	}
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	if (+duration < 0) {
		toast.error('Your session expired - please login again', {
			...toastConfig,
			toastId: 'expired',
		})
		duration = 0
	}
	const [userData, setUserData] = useState<NewData>(defaultState)
	const token = retrieveStoredToken()
	const { sendRequest: getUserData } = useHttp()
	useEffect(() => {
		if (token) {
			setIsLoggedIn(true)
			getUserData(
				GET_USER_DATA_ENDPOINT,
				{
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					body: JSON.stringify({ idToken: userData.idToken }),
				},
				(data: { users: UserData[] }) => {
					setUserData(prevData => {
						return {
							...prevData,
							displayName: data.users[0].displayName,
							photoUrl: data.users[0].photoUrl,
							localId: data.users[0].localId,
						}
					})
				}
			)
		} else {
			setIsLoggedIn(false)
		}
	}, [token, getUserData, userData.idToken])

	const loginHandler = () => {
		toast.dismiss('expired')
		setIsLoggedIn(true)
	}

	const logoutHandler = () => {
		toast.dismiss('expired')
		setIsLoggedIn(false)
		setUserData({
			idToken: '',
			expiresIn: '',
			localId: '',
			photoUrl: '',
			displayName: '',
		})
		localStorage.clear()
	}

	const updateUserData = (newData: NewData) => {
		toast.dismiss('expired')
		setUserData(newData)
	}

	const contextValue = {
		isLoggedIn,
		loginHandler,
		logoutHandler,
		userData,
		updateUserData,
	}

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider
