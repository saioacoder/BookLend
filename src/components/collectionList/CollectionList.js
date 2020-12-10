import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '../button';
import Modal from '../modal';
import Loading from '../loading';
import RemoveBookForm from '../removeBookForm';
import LendBookForm from '../lendBookForm';
import ReturnBookForm from '../returnBookForm';
import { getRandomColor } from '../../logic/book';
import { getLibraryCollectionById, getStatus } from '../../logic/library';

import './CollectionList.scss';

const CollectionList = ({ filter, onRefreshCollection, onEndRefresh }) => {
	const { idLibrary, categories } = useSelector(state => state.library);
	const [books, setBooks] = useState([]);
	const [filterBooks, setFilterBooks] = useState([]);
	const [idBookSel, setIdBookSel] = useState('');
	const [bookTitleSel, setBookTitleSel] = useState('');
	const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
	const [modalLendIsOpen, setModalLendIsOpen] = useState(false);
	const [modalReturnIsOpen, setModalReturnIsOpen] = useState(false);

	const refreshLibraryCollection = async (id, orderByTerm) => {
		const collection = await getLibraryCollectionById(id, orderByTerm);
		if(collection !== null) {
			setBooks(collection);
			setFilterBooks(collection);
		}
		if(filter !== '') {
			const newBooks = books.filter(item => item.status === filter);
			setFilterBooks(newBooks);
		}
	};

	const handleOnRemoveBook = (id, title) => {
		setModalRemoveIsOpen(true);
		setIdBookSel(id);
		setBookTitleSel(title);
	};

	const handleOnLendBook = (id, title) => {
		setModalLendIsOpen(true);
		setIdBookSel(id);
		setBookTitleSel(title);
	};

	const handleOnReturnBook = (id, title) => {
		setModalReturnIsOpen(true);
		setIdBookSel(id);
		setBookTitleSel(title);
	};

	const handleOnSuccessRemoveBook = () => {
		setModalRemoveIsOpen(false);
		refreshLibraryCollection(idLibrary, 'purchaseDate');
		onEndRefresh();
	};

	const handleOnSuccessLendBook = () => {
		setModalLendIsOpen(false);
		refreshLibraryCollection(idLibrary, 'purchaseDate');
		onEndRefresh();
	};

	const handleOnSuccessReturnBook = () => {
		setModalReturnIsOpen(false);
		refreshLibraryCollection(idLibrary, 'purchaseDate');
		onEndRefresh();
	};

	useEffect(() => {
		if(idLibrary) {
			refreshLibraryCollection(idLibrary, 'purchaseDate');
			onEndRefresh();
		}
	}, [idLibrary, filter, onRefreshCollection]);

	if(filter !== '' && filterBooks.length <= 0) {
	  	return (
		  <div className="noData">¡No hay libros <strong>{filter === 'reserved' ? `${getStatus(filter)}s` : getStatus(filter)}</strong>!</div>
		);
	} else if(filter === '' && filterBooks.length <= 0) {
		return (
			<div className="noData"><strong>¡No hay libros diponibles!</strong><br />Añade alguno a la colección</div>
		);
	}

	if(!idLibrary) {
		return <Loading />
	}

	return (
		<>
			<div className="collection">
				<header className="collection_header">
					<div className="header_primaryData">Libro</div>
					<div className="header_categories">Categoría</div>
					<div className="header_status">Estado</div>
					<div className="header_actions">Acciones</div>
				</header>
				{filterBooks.map(({ id, idCategory, idBookCustom, title, cover, status, email }) => {
					return (
						<div key={id} className="collection_book" style={{backgroundColor: getRandomColor()}}>
							<div className="book_primaryData">
								<div className="book_cover">
									{cover && <img src={cover} alt="" />}
								</div>
								<div className="book_content">
									<h3 className="book_title">{title}</h3>
									<p className="book_isbn"><span>ISBN ›</span>{id}</p>
									<p className="book_idCustom"><span>ID ›</span>{idBookCustom}</p>
								</div>
							</div>
							<div className="book_category"><span>{categories[idCategory]}</span></div>
							<div className="book_status">
								{status &&
									<span className="tooltip">
										{getStatus(status)}
										<span>{email}</span>
									</span>
								}
							</div>
							<div className="book_actions">
								{(status === '' || status === 'reserved') && <Button className="button__small" onClick={() => handleOnLendBook(id, title)}>Prestar</Button>}
								{status === 'lent' && <Button className="button_inverse button__small" onClick={() => handleOnReturnBook(id, title)}>Devolver</Button>}
								<Button
									onClick={() => handleOnRemoveBook(id, title)}
									className="button_inverse button__small"
								>Borrar</Button>
							</div>
						</div>
					);
				})}
			</div>

			<Modal
				title="Borrar libro"
				isOpen={modalRemoveIsOpen}
				onClose={() => setModalRemoveIsOpen(false)}
			>
				<RemoveBookForm
					idBook={idBookSel}
					bookTitle={bookTitleSel}
					onCancel={() => setModalRemoveIsOpen(false)}
					onSuccess={handleOnSuccessRemoveBook}
				/>
			</Modal>

			<Modal
				title="Prestar libro"
				isOpen={modalLendIsOpen}
				onClose={() => setModalLendIsOpen(false)}
			>
				<LendBookForm
					idBook={idBookSel}
					bookTitle={bookTitleSel}
					onCancel={() => setModalLendIsOpen(false)}
					onSuccess={handleOnSuccessLendBook}
				/>
			</Modal>

			<Modal
				title="Devolver libro"
				isOpen={modalReturnIsOpen}
				onClose={() => setModalReturnIsOpen(false)}
			>
				<ReturnBookForm
					idBook={idBookSel}
					bookTitle={bookTitleSel}
					onCancel={() => setModalReturnIsOpen(false)}
					onSuccess={handleOnSuccessReturnBook}
				/>
			</Modal>
		</>
	);
};

export default CollectionList;