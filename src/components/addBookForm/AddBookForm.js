import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Input from '../input';
import InputSearch from '../inputSearch';
import Select from '../select';
import Button from '../button';
import ListBooks from '../listBooks';
import BookCard from '../bookCard';
import getLiteral from '../literals';
import { getLibraryById, addBookToLibrary } from '../../logic/library';
import { getBooksByTitle, getBookById, getBookFormated, addBookById, formatData } from '../../logic/book';

const AddBookForm = ({ isModalClosed, onCancel, onSuccess }) => {
	const { idLibrary } = useSelector(state => state.library);
	const [categories, setCategories] = useState([]);

	const [searchTerm, setSearchTerm] = useState('');
	const [books, setBooks] = useState([]);
	const [bookSelId, setBookSelId] = useState('');
	const [bookSel, setBookSel] = useState(null);

	const [idBookCustom, setIdBookCustom] = useState('');
	const [units, setUnits] = useState(1);
	const [categoryId, setCategoryId] = useState(0);
	const [purchaseDate, setPurchaseDate] = useState('');

	const [idBookCustomError, setIdBookCustomError] = useState(false);
	const [unitsError, setUnitsError] = useState(false);
	const [categoryIdError, setCategoryIdError] = useState(false);
	const [purchaseDateError, setPurchaseDateError] = useState(false);

	const [searchTermError, setSearchTermError] = useState(false);
	const [searchSubmitError, setSearchSubmitError] = useState(false);
	const [submitAddBookError, setSubmitAddBookError] = useState(false);

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
		console.log(books);
		e.preventDefault();
		if(bookSelId) {
			const bookResult = await getBookById(bookSelId);
			if(bookResult !== null) {
				setBookSel(bookResult);
				setPurchaseDate(formatData(Date.now()));

				document.getElementById('searchForm').classList.add('hide');
				document.getElementById('bookSelForm').classList.add('hide');
				document.getElementById('addBookForm').classList.remove('hide');

				const libraryFound = await getLibraryById(idLibrary);
				if(libraryFound !== null) {
					setCategories(libraryFound.categories);
				}
			}
		}
	}

	const handleSubmitAddBook = async (e) => {
		e.preventDefault();

		let error = false;
		if(!idBookCustom) {
			error = true;
			setIdBookCustomError(true);
		}
		if(!units) {
			error = true;
			setUnitsError(true);
		}
		if(!categoryId) {
			error = true;
			setCategoryIdError(true);
		}
		if(!purchaseDate) {
			error = true;
			setPurchaseDateError(true);
		}
		if(!error) {
			const addBookToBooksObj = getBookFormated(bookSel);
			const { idBook } = addBookToBooksObj;
			delete addBookToBooksObj.idBook;
			const resultBooks = await addBookById(idBook, addBookToBooksObj);
			if(!resultBooks) {
				setSubmitAddBookError(true);
			} else {
				const { title, cover } = getBookFormated(bookSel);
				const addBookToLibraryObj = {
					categoryId,
					idBookCustom,
					title,
					units,
					unitsNow: units,
					purchaseDate,
					cover
				};
				const resultLibrary = await addBookToLibrary(idLibrary, idBook, addBookToLibraryObj);
				if(!resultLibrary) {
					setSubmitAddBookError(true);
				} else {
					setSubmitAddBookError(false);
					handleReset();
					onSuccess();
				}
			}
		} else {
			setSubmitAddBookError(true);
		}
	}

	const handleReset = (e) => {
		e && e.preventDefault();

		setSearchTerm('');
		setBooks([]);
		setBookSelId('');
		setBookSel(null);
		setIdBookCustom('');
		setUnits(1);
		setCategoryId(0);
		setPurchaseDate('');

		setIdBookCustomError(false);
		setUnitsError(false);
		setCategoryIdError(false);
		setPurchaseDateError(false);
		setSearchTermError(false);
		setSearchSubmitError(false);
		setSubmitAddBookError(false);

		document.getElementById('searchForm').classList.remove('hide');
		document.getElementById('bookSelForm').classList.remove('hide');
		document.getElementById('addBookForm').classList.add('hide');

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed){
			handleReset();
		}
	}, [isModalClosed]);

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
						<Button className="button_transparent" onClick={handleReset}>Cancelar</Button>
						<Button>Importar datos libro</Button>
					</div>
				}
			</form>

			<form onSubmit={handleSubmitAddBook} id="addBookForm" className="form hide">
				<p>Rellena el resto de datos del libro que has seleccionado antes de añadirlo a tu colección.</p>
				{bookSel !== null && <BookCard book={bookSel} />}
				<Input
					id="idBookCustom"
					label="Identificativo libro en tu biblioteca"
					value={idBookCustom}
					hasError={idBookCustomError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setIdBookCustom(value)}
					className="wHalf"
				/>
				<Select
					id="categoriesLibrary"
					label="Categorías"
					placeholder="Elige una categoría"
					hasError={categoryIdError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setCategoryId(value)}
					options={categories}
					className="wHalf"
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
					id="purchaseDate"
					label="Fecha adquisición"
					value={purchaseDate}
					hasError={purchaseDateError}
					errorMessage={getLiteral('error-required-field')}
					onChange={({target: { value }}) => setPurchaseDate(value)}
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