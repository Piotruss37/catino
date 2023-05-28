import classes from './MainNav.module.css'
import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
	IconQuestionMark,
	IconHandMove,
	IconLogout,
	IconPaw,
	IconLogin,
	IconUser,
	IconDeviceDesktopAnalytics,
} from '@tabler/icons-react'
import { NavContext } from '../../context/NavContext'
import Backdrop from '../UI/Backdrop'
import { AuthContext } from '../../context/AuthContext'

const MainNav = () => {
	const navCtx = useContext(NavContext)
	const authCtx = useContext(AuthContext)

	return (
		<>
			{navCtx.isNavExtended && <Backdrop onClose={navCtx.closeNavHandler}></Backdrop>}

			<nav className={`${navCtx.isNavExtended ? classes.opened : ''} ${classes.nav}`}>
				<NavLink
					onClick={navCtx.closeNavHandler}
					to={'/'}
					className={({ isActive }) => {
						return isActive ? `${classes.active} ${classes.option}` : `${classes.option}`
					}}
				>
					<IconPaw strokeWidth={1} color='white' size={35}></IconPaw>
					<p>Catino</p>
				</NavLink>
				<NavLink
					onClick={navCtx.closeNavHandler}
					className={({ isActive }) => {
						return isActive ? `${classes.active} ${classes.option}` : `${classes.option}`
					}}
					to={'/how-does-it-work'}
				>
					<IconQuestionMark color='white' size={35}></IconQuestionMark>
					<p>How does it work?</p>
				</NavLink>
				<NavLink
					onClick={navCtx.closeNavHandler}
					className={({ isActive }) => {
						return isActive ? `${classes.active} ${classes.option}` : `${classes.option}`
					}}
					to={'/swipe'}
				>
					<IconHandMove color='white' size={35} strokeWidth={1}></IconHandMove>
					<p>Swipe</p>
				</NavLink>

				<NavLink
					onClick={navCtx.closeNavHandler}
					className={({ isActive }) => {
						return isActive ? `${classes.active} ${classes.option}` : `${classes.option}`
					}}
					to={'/profile'}
				>
					<IconUser strokeWidth={1} color='white' size={35}></IconUser>
					<p>Profile</p>
				</NavLink>

				{authCtx.isLoggedIn && (
					<NavLink
						to={'/'}
						onClick={() => {
							navCtx.closeNavHandler()
							authCtx.logoutHandler()
						}}
						className={classes.option}
					>
						<IconLogout strokeWidth={1} color='white' size={35}></IconLogout>
						<p>Logout</p>
					</NavLink>
				)}

				{!authCtx.isLoggedIn && (
					<Link
						onClick={() => {
							navCtx.closeNavHandler()
						}}
						className={classes.option}
						to={'/login'}
					>
						<IconLogin strokeWidth={1} color='white' size={35}></IconLogin>
						<p>Login</p>
					</Link>
				)}
			</nav>
		</>
	)
}

export default MainNav
