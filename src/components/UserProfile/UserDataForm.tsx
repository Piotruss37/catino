import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import classes from './UserDataForm.module.css'
import Modal from '../UI/Modal'
import useInput from '../../hooks/use-input'
import useHttp from '../../hooks/use-http'
import { CHANGE_DATA_ENDPOINT, DATABASE_LINK } from '../../constants/endpoints'
import { toastConfig } from '../../constants/toastConfig'
import { toast } from 'react-toastify'
const UserDataForm = () => {
	const authCtx = useContext(AuthContext)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { hasError: hasErrorProfileData, sendRequest: sendProfileData, didSucceed: didSucceedProfileData } = useHttp()
	const { hasError: hasErrorData, sendRequest: sendDataToDatabase, didSucceed: didSucceedDatabaseRequest } = useHttp()
	const {
		value: usernameValue,
		inputIsInvalid: usernameIsInvalid,
		valueChangeHandler: usernameChangeHandler,
		valueBlurHandler: usernameBlurHandler,
		valueIsValid: usernameIsValid,
		valueIsTouched: usernameIsTouched,
		setValueIsTouched: setUsernameIsTouched,
		resetValidaty: resetUsernameValidaty,
	} = useInput((value: string) => {
		return value.trim().length >= 3
	}, authCtx.userData.displayName)
	const {
		value: urlValue,
		valueIsTouched: urlIsTouched,
		inputIsInvalid: urlIsInvalid,
		valueChangeHandler: urlChangeHandler,
		valueBlurHandler: urlBlurHandler,
		valueIsValid: urlIsValid,
		resetValidaty: resetUrlValidaty,
		setValueIsTouched: setUrlIsTouched,
	} = useInput((value: string) => {
		const regex = /^(http(s)?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\S*)?$/
		const text = value
		if (regex.test(text)) {
			return true
		} else {
			return false
		}
	}, authCtx.userData.photoUrl)

	const showModalHandler = () => {
		setIsModalVisible(true)
	}
	let bothInputsAreTheSame = true

	if (usernameValue === authCtx.userData.displayName && urlValue === authCtx.userData.photoUrl) {
		bothInputsAreTheSame = true
	} else {
		bothInputsAreTheSame = false
	}

	let formIsValid = false

	if (usernameIsValid && urlIsValid) {
		if (!bothInputsAreTheSame) {
			formIsValid = true
		} else {
			formIsValid = false
		}
	}

	const closeModalHandler = () => {
		setIsModalVisible(false)
		resetUsernameValidaty()
		resetUrlValidaty()
	}

	const changeDataHandler = () => {
		urlBlurHandler()
		usernameBlurHandler()
		if (formIsValid) {
			const data = {
				displayName: usernameValue,
				photoUrl: urlValue,
				idToken: authCtx.userData.idToken,
				returnSecureToken: false,
			}
			sendProfileData(
				CHANGE_DATA_ENDPOINT,
				{
					method: 'POST',
					body: JSON.stringify(data),
					headers: { 'Content-Type': 'application/json' },
				},
				(data: { localId: string; photoUrl: string; displayName: string }) => {
					authCtx.updateUserData({
						idToken: authCtx.userData.idToken,
						expiresIn: authCtx.userData.expiresIn,
						localId: data.localId,
						photoUrl: data.photoUrl,
						displayName: data.displayName,
					})
					sendDataToDatabase(`${DATABASE_LINK}/users/${authCtx.userData.localId}.json`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							photoUrl: data.photoUrl,
							displayName: data.displayName,
							localId: data.localId,
						}),
					})
					setIsModalVisible(false)
					setUrlIsTouched(false)
					setUsernameIsTouched(false)
				}
			)
		}
	}

	useEffect(() => {
		if (didSucceedProfileData) {
			toast.success('Data updated successfully', {
				...toastConfig,
				toastId: 'successful',
			})
		}
		if (hasErrorProfileData) {
			toast.error('Cant update data', {
				...toastConfig,
				toastId: 'expired',
			})
			setIsModalVisible(false)
		}
	}, [didSucceedProfileData, hasErrorProfileData])

	const modalContent = (
		<>
			<div className={classes.option}>
				<label htmlFor='username'>Username</label>
				<input
					className={usernameIsInvalid ? 'invalid' : ''}
					onBlur={usernameBlurHandler}
					onChange={usernameChangeHandler}
					id='username'
					type='text'
					defaultValue={authCtx.userData.displayName}
				/>
				{usernameIsInvalid && (
					<p style={{ marginTop: '0.8em', color: 'rgb(255, 57, 57)' }}>Username must be min 3 characters long</p>
				)}
			</div>
			<div className={classes.option}>
				<label htmlFor='username'>Photo Url</label>
				<input
					onBlur={urlBlurHandler}
					onChange={urlChangeHandler}
					id='username'
					type='text'
					defaultValue={authCtx.userData.photoUrl}
				/>
				{urlIsInvalid && <p style={{ marginTop: '0.8em', color: 'rgb(255, 57, 57)' }}>Provide valid link</p>}
			</div>
			{bothInputsAreTheSame && (usernameIsTouched || urlIsTouched) ? (
				<p>Username or URL must be different than actual</p>
			) : (
				''
			)}
			<div className={classes.buttons}>
				<button className={classes.button} onClick={closeModalHandler}>
					Cancel
				</button>
				<button className={classes.button} onClick={changeDataHandler}>
					Change data
				</button>
			</div>
		</>
	)

	return (
		<div className={classes.form}>
			<img className={classes.image} src={authCtx.userData.photoUrl} alt='user avatar' />

			<div className={classes.bottom}>
				<p className={classes.username}>Username : {authCtx.userData.displayName}</p>

				<button onClick={showModalHandler} className={classes.button}>
					Change profile data
				</button>
				{isModalVisible && <Modal onClose={closeModalHandler} modalBody={modalContent}></Modal>}
			</div>
		</div>
	)
}

export default UserDataForm
