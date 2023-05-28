import { createRoutesFromElements, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import RootLayout from '../Pages/RootLayout'
import How from '../Pages/How'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignUpPage'
import ErrorPage from '../Pages/ErrorPage'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import Swipe from '../Pages/SwipePage'
import UserProfilePage from '../Pages/Profile'
const BrowserRouter = () => {
	const authCtx = useContext(AuthContext)
	const isLoggedIn = authCtx.isLoggedIn
	const RouteDefinitions = createRoutesFromElements(
		<Route errorElement={<ErrorPage></ErrorPage>} path='/' element={<RootLayout></RootLayout>}>
			<Route path='/' element={<HomePage />} />
			<Route path='/how-does-it-work' element={<How />} />
			<Route path='/swipe' element={isLoggedIn ? <Swipe></Swipe> : <LoginPage source='protected'></LoginPage>} />
			<Route
				path='/profile'
				element={isLoggedIn ? <UserProfilePage></UserProfilePage> : <LoginPage source='protected'></LoginPage>}
			/>

			<Route path='/signup' element={<SignupPage />} />
			<Route path='/login' element={<LoginPage></LoginPage>} />
		</Route>
	)

	const router = createBrowserRouter(RouteDefinitions)

	return <RouterProvider router={router}></RouterProvider>
}

export default BrowserRouter
