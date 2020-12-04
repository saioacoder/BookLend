import { useSelector } from 'react-redux';

import { getBookStatus, reserveBook } from '../../logic/bookStatus';

import Button from '../button';

const ReservationBookForm = ({ idBook, onCancel, onSuccess }) => {

	const { idLibrary } = useSelector(state => state.library);
	const { idUser } = useSelector(state => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const books = getBookStatus(idBook);
		if(!books){
			console.log(books);
		// 	const result = reserveBook({
		// 		idBook,
		// 		idUser,
		// 		idLibrary,
		// 		reservationDate: Date.now(),
		// 		status: 'reserved'
		// 	});
		// 	if(result) {
		// 		onSuccess();
		// 	}
		// } else {
		// 	// No existen libros
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>¿Estas seguro que quieres reservar el libro?</p>
			<p>Una vez reservado podrás pasarte a buscarlo por la biblioteca directamente.</p>
			<div className="actionButtons">
				<Button className="button_transparent" onClick={onCancel}>Cancelar</Button>
				<Button>Aceptar</Button>
			</div>
		</form>
	);
};

export default ReservationBookForm;