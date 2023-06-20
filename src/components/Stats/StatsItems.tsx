import { useContext } from 'react'
import { SwipeContext } from '../../context/SwipeContext'
import classes from './StatsItems.module.css'
const StatsItems = () => {
	const swipeCtx = useContext(SwipeContext)

	return (
		<div className={classes.items}>
			<div className={classes.item}>
				<p className={classes.text}>You swiped left</p>
				<p className={classes.amount}>{swipeCtx.swipedLeftAmount} times</p>
			</div>
			<div className={classes.item}>
				<p className={classes.text}>You swiped right</p>
				<p className={classes.amount}>{swipeCtx.swipedRightAmount} times</p>
			</div>
		</div>
	)
}

export default StatsItems
