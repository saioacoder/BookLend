import { useSelector } from 'react-redux';

import { reserveBook } from '../../logic/bookStatus';

import Button from '../button';

const ReservationBookForm = ({ idBook, onCancel, onSuccess }) => {

	const { idLibrary } = useSelector(state => state.library);
	const { idUser } = useSelector(state => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = reserveBook({
			idBook,
			idUser,
			idLibrary,
			reserveDate: Date.now(),
			lendDate: null,
			returnDate: null,
			status: 'reserved'
		});
		if(result) {
			onSuccess();
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>¿Estas seguro que quieres <strong>reservar el libro</strong>? Una vez reservado podrás pasarte a buscarlo por la biblioteca directamente.</p>
			<div className="actionButtons">
				<Button className="button_transparent" onClick={onCancel}>Cancelar</Button>
				<Button>Aceptar</Button>
			</div>
		</form>
	);
};

export default ReservationBookForm;