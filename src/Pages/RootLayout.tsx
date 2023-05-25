import { Outlet } from 'react-router-dom'
import BurgerButton from '../components/Nav/BurgerButton'
import MainNav from '../components/Nav/MainNav'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import UserProfile from '../components/UserProfile/UserProfile'
const RootLayout = () => {
	const authCtx = useContext(AuthContext)

	return (
		<>
			<BurgerButton></BurgerButton>
			{!authCtx.isLoggedIn ? (
				<Link to={'/login'} className={'login-button'}>
					Login
				</Link>
			) : (
				<UserProfile></UserProfile>
			)}
			<MainNav></MainNav>
			<Outlet></Outlet>
		</>
	)
}

export default RootLayout
