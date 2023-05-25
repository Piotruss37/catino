interface ButtonProps {
	type?: 'reset' | 'button' | 'submit'
	className?: string
	onClick?: () => void
	children: React.ReactNode
}

const Button = (props: ButtonProps) => {
	return (
		<button type={props.type} onClick={props.onClick} className={props.className}>
			{props.children}
		</button>
	)
}

export default Button
