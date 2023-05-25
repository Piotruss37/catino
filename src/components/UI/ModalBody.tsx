import { createPortal } from 'react-dom'
const ModalBody = (props: { children: React.ReactNode }) => {
	return createPortal(<div className='modal'>{props.children}</div>, document.getElementById('modal')!)
}

export default ModalBody
