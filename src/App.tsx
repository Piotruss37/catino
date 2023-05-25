import BrowserRouter from './Routes/Routes'
import AuthContextProvider from './context/AuthContextProvider'
import NavContextProvider from './context/NavContextProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
	return (
		<AuthContextProvider>
			<NavContextProvider>
				<BrowserRouter></BrowserRouter>
				<ToastContainer />
			</NavContextProvider>
		</AuthContextProvider>
	)
}

export default App
