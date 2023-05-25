import { useState, useCallback } from 'react'

interface RequestConfig {
	body?: string
	headers?: { 'Content-Type': 'application/json' }
	method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState<null | boolean>(null)
	const [didSucceed, setDidSucceed] = useState(false)

	const sendRequest = useCallback(
		async (url: string, requestConfig?: RequestConfig, applyData?: (data: any) => void) => {
			try {
				setDidSucceed(false)
				setIsLoading(true)
				setHasError(null)
				const response = await fetch(url, requestConfig)
				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.error.message)
				}

				if (typeof applyData === 'function') {
					applyData(data)
				}
				setDidSucceed(true)
			} catch (e: any) {
				setHasError(e.message)
				setDidSucceed(false)
			} finally {
				setIsLoading(false)
			}
		},
		[]
	)

	return {
		isLoading,
		hasError,
		sendRequest,
		didSucceed,
	}
}

export default useHttp
