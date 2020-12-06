import { useSelector } from 'react-redux';

import { updateBook, getBookFromCollectionById } from '../../logic/library';
import { addBookLog } from '../../logic/bookLogs';

import Button from '../button';

const ReturnBookForm = ({ idBook, bookTitle, onCancel, onSuccess }) => {

	const { idLibrary } = useSelector(state => state.library);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const book = await getBookFromCollectionById(idLibrary, idBook);
		if(book) {
			const newBookData = {
				idUser: '',
				email: '',
				reserveDate: null,
				lendDate: null,
				status: ''
			};
			const result = await updateBook(idLibrary, idBook, newBookData);
			if(result) {
				const newReserveDate = book.reserveDate === undefined ? '' : book.reserveDate;
				const bookLog = {
					idLibrary,
					idBook,
					idUser: book.idUser,
					reserveDate: newReserveDate,
					lendDate: book.lendDate,
					returnDate: Date.now(),
				};
				await addBookLog(bookLog);
				onSuccess();
			}
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>¿Estas seguro que quieres devolver el libro <strong>"{bookTitle}"</strong>?</p>
			<div className="actionButtons">
				<Button className="button_transparent" onClick={onCancel}>Cancelar</Button>
				<Button>Aceptar</Button>
			</div>
		</form>
	);
};

export default ReturnBookForm;