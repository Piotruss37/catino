import classes from './Header.module.css'
import Paw from './Paw'
import { Link } from 'react-router-dom'

interface HeaderProps {
	description: React.ReactNode
	showButton: boolean
	className?: string
	children?: React.ReactNode
}

const Header = (props: HeaderProps) => {
	let headerClass = `${classes.header}`

	if (props.className) {
		headerClass = `${classes.header} ${props.className}`
	} else {
		headerClass = `header__main ${classes.header}`
	}

	return (
		<div className={headerClass}>
			<div className={classes.title}>
				<h1 className={classes.heading}>Catino</h1>
				<Paw></Paw>
			</div>
			<p className={classes.description}>{props.description}</p>
			{props.showButton && (
				<Link to={'/signup'} className='signup'>
					Sign up!
				</Link>
			)}
			{props.children}
		</div>
	)
}

export default Header
