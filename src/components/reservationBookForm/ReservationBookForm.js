import { useSelector } from 'react-redux';

import Button from '../button';
import { getUserById } from '../../logic/user';
import { updateBook } from '../../logic/library';

const ReservationBookForm = ({ idBook, onCancel, onSuccess }) => {

	const { idLibrary } = useSelector(state => state.library);
	const { idUser } = useSelector(state => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = await getUserById(idUser);
		if(user) {
			const newBookData = {
				idUser,
				email: user.email,
				reserveDate: Date.now(),
				status: 'reserved'
			};
			const result = await updateBook(idLibrary, idBook, newBookData);
			if(result) {
				onSuccess();
			}
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