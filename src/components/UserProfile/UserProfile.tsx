import { Link } from 'react-router-dom'
const UserProfile = () => {
	return (
		<Link to={'/profile'} className={'login-button'}>
			Profile
		</Link>
	)
}

export default UserProfile
