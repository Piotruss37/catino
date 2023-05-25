import Header from '../components/Header/Header'
import UserDataForm from '../components/UserProfile/UserDataForm'
const UserProfilePage = () => {
	return (
		<>
			<Header className={'profile-page'} showButton={false} description='Profile'>
				{<UserDataForm></UserDataForm>}
			</Header>
		</>
	)
}

export default UserProfilePage
