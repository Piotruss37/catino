import Header from '../components/Header/Header'
import { Link } from 'react-router-dom'
import classes from './How.module.css'
const How = () => {
	return (
		<>
			<Header className={'how-section'} showButton={false} description='How does it work?'>
				<p className={classes.desc}>
					Simply go to the{' '}
					<Link className={classes.link} to={'/swipe'}>
						Swipe Page
					</Link>{' '}
					and start swiping! If you come across a cat's profile that you like, swipe right.
				</p>
				<p className={classes.desc}>
					When you come across a cat's profile that doesn't capture your attention, swipe left to indicate that you're
					not interested.
				</p>
			</Header>
		</>
	)
}

export default How
