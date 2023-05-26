import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect, useState, useContext, useCallback } from 'react'
import { CHANGE_DATA_ENDPOINT, DATABASE_LINK, LOGIN_ENDPOINT, SIGN_UP_ENDPOINT } from '../../constants/endpoints'
import { toastConfig } from '../../constants/toastConfig'
import classes from './AuthForm.module.css'
import useInput from '../../hooks/use-input'
import useHttp from '../../hooks/use-http'
import { AuthContext } from '../../context/AuthContext'

interface Data {
	idToken: string
	expiresIn: string
	photoUrl: string
	localId: string
	displayName: string
}
interface LoginData extends Data {
	profilePicture: string
}
let firstRequest = true

const AuthForm = (props: { mode?: string }) => {
	const {
		value: passwordValue,
		inputIsInvalid: passwordIsInvalid,
		valueChangeHandler: passwordChangeHandler,
		valueBlurHandler: passwordBlurHandler,
		valueIsValid: passwordIsValid,
	} = useInput((value: string) => {
		return value.trim().length >= 8
	})
	const {
		value: emailValue,
		inputIsInvalid: emailIsInvalid,
		valueChangeHandler: emailChangeHandler,
		valueBlurHandler: emailBlurHandler,
		valueIsValid: emailIsValid,
	} = useInput((value: string) => {
		return value.trim().includes('@')
	})
	const {
		value: usernameValue,
		inputIsInvalid: usernameIsInvalid,
		valueChangeHandler: usernameChangeHandler,
		valueBlurHandler: usernameBlurHandler,
		valueIsValid: usernameIsValid,
	} = useInput((value: string) => {
		return value.trim().length >= 3
	})
	const {
		value: urlValue,
		inputIsInvalid: urlIsInvalid,
		valueChangeHandler: urlChangeHandler,
		valueBlurHandler: urlBlurHandler,
		valueIsValid: urlIsValid,
	} = useInput((value: string) => {
		const regex = /^(http(s)?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\S*)?$/
		const text = value
		if (regex.test(text)) {
			return true
		} else {
			return false
		}
	})

	const { hasError: hasErrorLogin, sendRequest: loginHandler, didSucceed: didSucceedLogingin } = useHttp()
	const { hasError: hasErrorProfileData, sendRequest: sendProfileData, didSucceed: didSucceedProfileData } = useHttp()
	const {
		hasError: hasErrorDatabase,
		sendRequest: sendDataToDatabase,
		didSucceed: didSucceedDatabaseRequest,
	} = useHttp()
	const { isLoading, hasError, sendRequest, didSucceed } = useHttp()
	const [signupData, setSignupData] = useState<Data>()
	const [loginData, setLoginData] = useState<Data>()
	const authCtx = useContext(AuthContext)
	const location = useLocation()
	const navigate = useNavigate()

	let modeLogin: boolean
	let formIsValid: boolean

	if (location.pathname === '/login') {
		modeLogin = true
	} else if (props.mode === 'login') {
		modeLogin = true
	} else {
		modeLogin = false
	}


	if (modeLogin) {
		if (passwordIsValid && emailIsValid) {
			formIsValid = true
		} else {
			formIsValid = false
		}
	} else {
		if (passwordIsValid && emailIsValid && urlIsValid && usernameIsValid) {
			formIsValid = true
		} else {
			formIsValid = false
		}
	}

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		passwordBlurHandler()
		emailBlurHandler()
		if (modeLogin === false) {
			usernameBlurHandler()
			urlBlurHandler()
			if (formIsValid) {
				const userData = {
					email: emailValue,
					password: passwordValue,
					returnSecureToken: false,
				}

				sendRequest(
					SIGN_UP_ENDPOINT,
					{
						method: 'POST',
						body: JSON.stringify(userData),
						headers: { 'Content-Type': 'application/json' },
					},
					(data: Data) => {
						setSignupData(data)
					}
				)
			}
		} else {
			if (formIsValid) {
				const userData = {
					email: emailValue,
					password: passwordValue,
					returnSecureToken: true,
				}

				loginHandler(
					LOGIN_ENDPOINT,
					{
						method: 'POST',
						body: JSON.stringify(userData),
						headers: { 'Content-Type': 'application/json' },
					},
					(data: LoginData) => {
						const formatedData = {
							displayName: data.displayName,
							expiresIn: data.expiresIn,
							idToken: data.idToken,
							localId: data.localId,
							photoUrl: data.profilePicture,
						}

						setLoginData(formatedData)
						authCtx.updateUserData(formatedData)
					}
				)
			}
		}
	}
	const navigateToHomePage = useCallback(() => {
		authCtx.loginHandler()
		toast.dismiss('expired')

		const expiration = new Date()
		expiration.setHours(expiration.getHours() + 1)

		localStorage.setItem('expiration', expiration.toISOString())

		setTimeout(() => {
			navigate('/')
			toast.dismiss('success')
		}, 2000)

		toast.dismiss('error')
	}, [navigate, authCtx])

	useEffect(() => {
		if (hasError || hasErrorProfileData || hasErrorLogin) {
			toast.error(`${hasError || hasErrorProfileData || hasErrorLogin}`, {
				...toastConfig,
				toastId: 'error',
			})
		} else {
			toast.dismiss('error')
		}

		if (didSucceed && didSucceedProfileData) {
			toast.success('account created successfully - redirecting...', {
				...toastConfig,
				toastId: 'success',
			})

			localStorage.setItem('token', signupData!.idToken)
			navigateToHomePage()
		} else if (didSucceedLogingin) {
			toast.success('successfully logged in - redirecting...', {
				...toastConfig,
				toastId: 'success',
			})

			localStorage.setItem('token', loginData!.idToken)
			navigateToHomePage()
		}
	}, [
		hasError,
		didSucceed,
		hasErrorProfileData,
		didSucceedProfileData,
		didSucceedLogingin,
		hasErrorLogin,
		navigate,
		loginData,
		signupData,
		navigateToHomePage,
	])

	useEffect(() => {
		if (signupData?.idToken && firstRequest) {
			firstRequest = false
			const userProfileData = {
				idToken: signupData?.idToken,
				displayName: usernameValue,
				photoUrl: urlValue,
				returnSecureToken: false,
			}

			sendProfileData(
				CHANGE_DATA_ENDPOINT,
				{
					method: 'POST',
					body: JSON.stringify(userProfileData),
					headers: { 'Content-Type': 'application/json' },
				},
				data => {
					authCtx.updateUserData({
						idToken: signupData!.idToken,
						expiresIn: signupData!.expiresIn,
						localId: signupData!.localId,
						photoUrl: data.photoUrl,
						displayName: data.displayName,
					})

					setSignupData((prevData: Data | undefined) => {
						return {
							idToken: prevData!.idToken,
							expiresIn: prevData!.expiresIn,
							localId: prevData!.localId,
							photoUrl: data.photoUrl,
							displayName: data.displayName,
						}
					})
					navigateToHomePage()
					// send data to database (needed for swipe)
					sendDataToDatabase(`${DATABASE_LINK}/users/${signupData.localId}.json`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							photoUrl: data.photoUrl,
							displayName: data.displayName,
							localId: signupData.localId,
						}),
					})
					firstRequest = true
				}
			)
		}
	}, [signupData, urlValue, usernameValue, sendProfileData, authCtx, sendDataToDatabase, navigateToHomePage])

	useEffect(() => {
		if (typeof loginData !== 'undefined') {
			authCtx.loginHandler()
		} else if (typeof signupData !== 'undefined') {
			authCtx.loginHandler()
		}
	}, [loginData, signupData, authCtx])

	const invalidPasswordClass = passwordIsInvalid ? 'invalid' : ''
	const invalidEmailClass = emailIsInvalid ? 'invalid' : ''
	const invalidUsernameClass = usernameIsInvalid ? 'invalid' : ''
	const invalidUrlClass = urlIsInvalid ? 'invalid' : ''
	let buttonContent: string | JSX.Element = modeLogin ? 'Login' : 'Signup'
	let errorSingupContent = hasError && <p className={classes.error}>{hasError}</p>

	if (isLoading) {
		buttonContent = <p>Sending...</p>
	}

	return (
		<form noValidate onSubmit={formSubmitHandler} className={classes.auth__form}>
			<div className={classes.auth__div}>
				<input
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					placeholder=' '
					id='email'
					type='email'
					className={`${classes.auth__input} ${invalidEmailClass}`}
				/>
				<label htmlFor='email' className={classes.auth__label}>
					E-mail adress
				</label>
				{emailIsInvalid && <p className={classes.error}>Error - e-mail must be valid</p>}
			</div>
			<div className={classes.auth__div}>
				<input
					onChange={passwordChangeHandler}
					onBlur={passwordBlurHandler}
					placeholder=' '
					id='password'
					type='password'
					className={`${classes.auth__input} ${invalidPasswordClass}`}
				/>
				<label htmlFor='password' className={classes.auth__label}>
					Password
				</label>
				{passwordIsInvalid && <p className={classes.error}>Error - password must be minimum 8 characters long</p>}
			</div>

			{!modeLogin ? (
				<>
					<div className={classes.auth__div}>
						<input
							onChange={usernameChangeHandler}
							onBlur={usernameBlurHandler}
							placeholder=' '
							id='username'
							type='text'
							className={`${classes.auth__input} ${invalidUsernameClass}`}
						/>
						<label htmlFor='username' className={classes.auth__label}>
							Username
						</label>
						{usernameIsInvalid && <p className={classes.error}>Error - username must be minimum 3 characters long</p>}
					</div>
					<div className={classes.auth__div}>
						<input
							onChange={urlChangeHandler}
							onBlur={urlBlurHandler}
							placeholder=' '
							id='url'
							type='text'
							className={`${classes.auth__input} ${invalidUrlClass}`}
						/>
						<label htmlFor='url' className={classes.auth__label}>
							Link to profile picture
						</label>
						{urlIsInvalid && <p className={classes.error}>Error - provide a valid link to profile picture</p>}
					</div>
				</>
			) : (
				''
			)}
			{!modeLogin ? (
				<p className={classes.desc}>
					Already have an account?{' '}
					<Link className={classes.link} to={'/login'}>
						Login
					</Link>{' '}
				</p>
			) : (
				<p className={classes.desc}>
					<Link className={classes.link} to={'/signup'}>
						Create new account
					</Link>
				</p>
			)}
			<button className={'signup'}>{buttonContent}</button>
			{errorSingupContent}
		</form>
	)
}

export default AuthForm
