import Header from '../components/Header/Header'
import MainNav from '../components/Nav/MainNav'
import { Link } from 'react-router-dom'
import BurgerButton from '../components/Nav/BurgerButton'
const ErrorPage = () => {
	return (
		<>
			<BurgerButton></BurgerButton>
			<Link to={'/login'} className={'login-button'}>
				Login
			</Link>
			<MainNav></MainNav>
			<Header className={'login-page'} showButton={false} description='Site not found'></Header>
		</>
	)
}

export default ErrorPage
