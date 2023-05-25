import Header from '../components/Header/Header'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const HomePage = () => {
	const authCtx = useContext(AuthContext)
	return (
		<>
			<Header
				description='Find soulmate 
				for Your cat!'
				showButton={authCtx.isLoggedIn ? false : true}
			>
				{authCtx.isLoggedIn && (
					<div className='logged__links'>
						<Link className='logged__btn' to={'/swipe'}>
							Start Swiping
						</Link>
						<Link className='logged__btn' to={'/profile'}>
							Change profile data
						</Link>
					</div>
				)}
			</Header>
		</>
	)
}

export default HomePage
