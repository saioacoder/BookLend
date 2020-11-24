import { useState, useEffect } from 'react';
//import { useDispatch } from 'react-redux';

import Input from '../input';
import InputSearch from '../inputSearch';
import Button from '../button';
import ListBooks from '../listBooks';
import BookCard from '../bookCard';
import getLiteral from '../literals';
import { getBooksByTitle, getBookById, formatData } from '../../logic/book';

const AddBookForm = ({ isModalClosed, onCancel, onSuccess }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [books, setBooks] = useState([]);
	const [bookSelId, setBookSelId] = useState('');
	const [bookSel, setBookSel] = useState(null);

	const [idBookCustom, setIdBookCustom] = useState('');
	const [units, setUnits] = useState(1);
	const [unitsNow, setUnitsNow] = useState(1);
	const [purchaseDate, setPurchaseDate] = useState('');

	const [searchTermError, setSearchTermError] = useState(false);
	const [searchSubmitError, setSearchSubmitError] = useState(false);

	const [idBookCustomError, setIdBookCustomError] = useState(false);
	const [unitsError, setUnitsError] = useState(false);
	const [unitsNowError, setUnitsNowError] = useState(false);
	const [purchaseDateError, setPurchaseDateError] = useState(false);

	const handleSubmitSearch = async (e) => {
		e.preventDefault();

		setSearchTermError(false);
		if(!searchTerm) {
			setSearchTermError(true);
		} else {
			const optimizedSearchTerm = searchTerm.replace(' ', '+');
			const booksResult = await getBooksByTitle(optimizedSearchTerm, 40);
			if(booksResult !== null && booksResult !== undefined) {
				setBooks(booksResult);
				setSearchTerm('');
				setSearchTermError(false);
				setSearchSubmitError(false);
			} else {
				setSearchSubmitError(true);
			}
		}
	}

	const handleSubmitBookSel = async (e) => {
		e.preventDefault();
		if(bookSelId) {
			const bookResult = await getBookById(bookSelId);
			if(bookResult !== null) {
				setBookSel(bookResult);
				setPurchaseDate(formatData(Date.now()));
				document.getElementById('addBookForm').classList.remove('hide');
				document.getElementById('searchForm').classList.add('hide');
				document.getElementById('bookSelForm').classList.add('hide');
			}
		}
	}

	const handleSubmitAddBook = async (e) => {
		e.preventDefault();

	}

	const handleReset = (e) => {
		e && e.preventDefault();

		setIdBookCustom('');
		setUnits(1);
		setUnitsNow(1);
		setPurchaseDate('');

		setIdBookCustomError(false);
		setUnitsError(false);
		setUnitsNowError(false);
		setPurchaseDateError(false);

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<>
			<form onSubmit={handleSubmitSearch} id="searchForm">
				<p>Busca el libro que quieras en la base de datos de <strong>Google Book</strong>, selecciona el correcto y después añade sus datos a tu colección.</p>
				<InputSearch
					id="searchTerm"
					label="Busca por título"
					value={searchTerm}
					hasError={searchTermError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setSearchTerm(value)}
				/>
			</form>

			<form onSubmit={handleSubmitBookSel} id="bookSelForm">
				<ListBooks list={books} updateBookSel={setBookSelId} noResults={searchSubmitError} />
				{(books.length > 0 && !searchSubmitError) &&
					<div className="actionButtons">
						<Button className="button_transparent">Cancelar</Button>
						<Button>Importar datos libro</Button>
					</div>
				}
			</form>

			<form onSubmit={handleSubmitAddBook} id="addBookForm" className="form hide">
				<p>Rellena el resto de datos del libro que has seleccionado antes de añadirlo a tu colección.</p>
				{bookSel !== null && <BookCard book={bookSel} />}
				<p>Category</p>
				<Input
					id="idBookCustom"
					label="Identificativo libro en tu biblioteca"
					value={idBookCustom}
					hasError={idBookCustomError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setIdBookCustom(value)}
					className="wFull"
				/>
				<Input
					id="units"
					label="Unidades disponibles"
					value={units}
					hasError={unitsError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setUnits(value)}
					className="wHalf"
					type="number"
				/>
				<Input
					id="unitsNow"
					label="Uds. disponibles actualmente"
					value={unitsNow}
					hasError={unitsNowError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setUnitsNow(value)}
					className="wHalf"
					type="number"
				/>
				<Input
					id="purchaseDate"
					label="Fecha adquisición"
					value={purchaseDate}
					hasError={purchaseDateError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setPurchaseDate(value)}
					className="wFull"
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