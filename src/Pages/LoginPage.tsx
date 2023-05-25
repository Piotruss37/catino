import AuthForm from '../components/Auth/AuthForm'
import Header from '../components/Header/Header'

const LoginPage = (props: { source?: string }) => {
	return (
		<Header
			className={'login-page'}
			showButton={false}
			description={props.source === 'protected' ? 'You need to login to see this page' : 'Login'}
		>
			<AuthForm mode={'login'}></AuthForm>
		</Header>
	)
}

export default LoginPage
