import { NavContext } from '../../context/NavContext'
import { useContext } from 'react'
const BurgerButton = () => {
	const navCtx = useContext(NavContext)

	const additionalClass = navCtx.isNavExtended ? 'opened' : ''

	const openNavHandler = () => {
		navCtx.toggleNavHandler()
	}

	return (
		<button onClick={openNavHandler} className={`${additionalClass} ${'burger-btn'}`} aria-label='Hamburger Menu'>
			<span className='burger-btn__box'>
				<span className={`${additionalClass} burger-btn-line burger-btn-line--1`}></span>
				<span className={`${additionalClass} burger-btn-line burger-btn-line--2`}></span>
				<span className={`${additionalClass} burger-btn-line burger-btn-line--3`}></span>
			</span>
		</button>
	)
}

export default BurgerButton
