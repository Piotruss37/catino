import { useState, useEffect } from 'react'

const useInput = (validateFunction: (inputValue: string) => boolean, defaultValue: string = '') => {
	const [value, setValue] = useState(defaultValue)
	const [valueIsTouched, setValueIsTouched] = useState(false)

	useEffect(() => {
		setValue(defaultValue)
	}, [defaultValue])

	let valueIsValid = validateFunction(value)
	let inputIsInvalid = !valueIsValid && valueIsTouched

	const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValue(e.target.value)
	}

	const valueBlurHandler = () => {
		setValueIsTouched(true)
	}

	const clearValue = () => {
		setValue('')
	}

	const resetValidaty = () => {
		setValueIsTouched(false)
		valueIsValid = validateFunction(value)
		setValue(defaultValue)
		inputIsInvalid = false
	}

	return {
		resetValidaty,
		setValueIsTouched,
		value,
		clearValue,
		valueIsValid,
		valueIsTouched,
		inputIsInvalid,
		valueChangeHandler,
		valueBlurHandler,
	}
}

export default useInput
