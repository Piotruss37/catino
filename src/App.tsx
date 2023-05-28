import BrowserRouter from './Routes/Routes'
import AuthContextProvider from './context/AuthContextProvider'
import NavContextProvider from './context/NavContextProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SwipeContextProvider from './context/SwipeContextProvider'
function App() {
	return (
		<AuthContextProvider>
			<NavContextProvider>
				<SwipeContextProvider>
					<BrowserRouter></BrowserRouter>
					<ToastContainer />
				</SwipeContextProvider>
			</NavContextProvider>
		</AuthContextProvider>
	)
}

export default App
