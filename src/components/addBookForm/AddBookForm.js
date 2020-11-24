import { useState, useEffect } from 'react';
//import { useDispatch } from 'react-redux';

import Input from '../input';
import InputSearch from '../inputSearch';
import Button from '../button';
import ListBooks from '../listBooks';
import getLiteral from '../literals';
import { getBooksByTitle } from '../../logic/book';

import './AddBookForm.scss';

const AddBookForm = ({ isModalClosed, onCancel, onSuccess }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTermError, setSearchTermError] = useState(false);
	const [books, setBooks] = useState([]);
	const [bookSelId, setBookSelId] = useState('');
	const [isbn, setIsbn] = useState('');
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [editorial, setEditorial] = useState('');
	const [publishDate, setPublishDate] = useState('');

	const [isbnError, setIsbnError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [authorError, setAuthorError] = useState(false);
	const [editorialError, setEditorialError] = useState(false);
	const [publishDateError, setPublishDateError] = useState(false);

	const handleSubmitSearch = async (e) => {
		e.preventDefault();

		setSearchTermError(false);
		if(!searchTerm) {
			setSearchTermError(true);
		} else {
			const booksResult = await getBooksByTitle(searchTerm, 40);
			if(booksResult !== null) {
				setBooks(booksResult);
				setSearchTerm('');
				setSearchTermError(false);
			}
		}
	}

	const handleSubmitBookSel = async (e) => {
		e.preventDefault();
		if(bookSelId) {
			console.log(bookSelId);
		}
	}

	const handleReset = (e) => {
		e && e.preventDefault();

		setIsbn('');
		setTitle('');
		setAuthor('');
		setEditorial('');
		setPublishDate('');

		setIsbnError(false);
		setTitleError(false);
		setAuthorError(false);
		setEditorialError(false);
		setPublishDateError(false);

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<>
			<form onSubmit={handleSubmitSearch}>
				<p>Busca un libro en la base de datos de <strong>Google Book</strong> y después añade sus datos a tu colección.</p>
				<InputSearch
					id="search-google-api"
					label="Busca por título"
					value={searchTerm}
					hasError={searchTermError}
					onChange={({target: { value }}) => setSearchTerm(value)}
				/>
			</form>
			<form onSubmit={handleSubmitBookSel}>
				<ListBooks list={books} updateBookSel={setBookSelId} />
				{books.length > 0 &&
					<div className="actionButtons">
						<Button className="button_transparent">Cancelar</Button>
						<Button>Seleccionar libro</Button>
					</div>
				}
			</form>
			<form>
				<p>Revisa que todos los datos del libro sean correctos y añade el libro a tu colección.</p>
				<Input
					id="isbn"
					label="ISBN"
					value={isbn}
					hasError={isbnError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setIsbn(value)}
					className="wFull"
				/>
				<Input
					id="title"
					label="Título"
					value={title}
					hasError={titleError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setTitle(value)}
					className="wFull"
				/>
				<Input
					id="author"
					label="Autor"
					value={author}
					hasError={authorError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setAuthor(value)}
					className="wFull"
				/>
				<Input
					id="editorial"
					label="Editorial"
					value={editorial}
					hasError={editorialError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setEditorial(value)}
					className="wHalf"
				/>
				<Input
					id="publishDate"
					label="Fecha de publicación"
					value={publishDate}
					hasError={publishDateError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setPublishDate(value)}
					className="wHalf"
				/>
				<div className="actionButtons">
					<Button onClick={handleReset} className="button_transparent">Cancelar</Button>
					<Button>Añadir libro</Button>
				</div>
			</form>
		</>
	);
};

export default AddBookForm;