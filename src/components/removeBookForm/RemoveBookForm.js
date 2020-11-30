import { useSelector } from 'react-redux';

import { removeBookFromLibrary } from '../../logic/library';

import Button from '../button';

const RemoveBookForm = ({ idBook, bookTitle, onCancel, onSuccess }) => {

	const { idLibrary } = useSelector(state => state.library);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = removeBookFromLibrary(idLibrary, idBook);
		if(result) {
			onSuccess();
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>¿Estas seguro que quieres borrar el libro <strong>"{bookTitle}"</strong> de la colección?</p>
			<div className="actionButtons">
				<Button className="button_transparent" onClick={onCancel}>Cancelar</Button>
				<Button>Aceptar</Button>
			</div>
		</form>
	);
};

export default RemoveBookForm;