import { createPortal } from 'react-dom'
const Backdrop = (props: { onClose: () => void }) => {
	return createPortal(<div onClick={props.onClose} className='backdrop'></div>, document.getElementById('backdrop')!)
}

export default Backdrop
