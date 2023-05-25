import Backdrop from './Backdrop'
import ModalBody from './ModalBody'

const Modal = (props: { onClose: () => void; modalBody: React.ReactNode }) => {
	return (
		<>
			<Backdrop onClose={props.onClose}></Backdrop>
			<ModalBody>{props.modalBody}</ModalBody>
		</>
	)
}

export default Modal
