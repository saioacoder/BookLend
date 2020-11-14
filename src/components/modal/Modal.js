import './Modal.scss';

const Modal = ({title, isOpen, onClose, children}) => (
	<div className={isOpen ? 'modal open' : 'modal'}>
		<div className="modal_content">
			<h2 className="modal_title">{title}</h2>
			{children}
			<button className="modal_closeButton" onClick={onClose}>×</button>
		</div>
	</div>
);

export default Modal;