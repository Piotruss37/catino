import AuthForm from '../components/Auth/AuthForm'
import Header from '../components/Header/Header'

const SignupPage = () => {
	return (
		<Header className={'signup-page'} showButton={false} description='Signup'>
			<AuthForm></AuthForm>
		</Header>
	)
}

export default SignupPage
