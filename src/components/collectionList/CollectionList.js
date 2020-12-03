import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '../button';
import Modal from '../modal';
import RemoveBookForm from '../removeBookForm';
import { getRandomColor } from '../../logic/book';
import { getLibraryCollectionById } from '../../logic/library';

import './CollectionList.scss';

const CollectionList = ({ onRefreshCollection, onGetRemoveBookTitle, onEndRefresh }) => {
	const { idLibrary, categoriesLibrary } = useSelector(state => state.library);
	const [books, setBooks] = useState([]);
	const [idBookSel, setIdBookSel] = useState('');
	const [bookTitleSel, setBookTitleSel] = useState('');
	const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);

	const refreshLibraryCollection = async (id, orderByTerm) => {
		const collection = await getLibraryCollectionById(id, orderByTerm);
		if(collection !== null) {
			setBooks(collection);
		}
	};

	const handleOnRemoveBook = (id, title) => {
		setModalRemoveIsOpen(true);
		setIdBookSel(id);
		setBookTitleSel(title);
	};

	const handleOnSuccessRemoveBook = () => {
		setModalRemoveIsOpen(false);
		refreshLibraryCollection(idLibrary, 'purchaseDate');
		onEndRefresh();
	};

	useEffect(() => {
		if(idLibrary) {
			refreshLibraryCollection(idLibrary, 'purchaseDate');
			onEndRefresh();
		}
	}, [idLibrary, onRefreshCollection]);

	return (
		<>
			<div className="collection">
				<header className="collection_header">
					<div className="header_primaryData">Libro</div>
					<div className="header_categories">Categoría</div>
					<div className="header_units">Unidades</div>
					<div className="header_actions">Acciones</div>
				</header>
				{books.map(({ id, categoryId, idBookCustom, title, units, unitsNow, cover }) => {
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
							<div className="book_category"><span>{categoriesLibrary[categoryId]}</span></div>
							<div className="book_units">{unitsNow}<span> / {units}</span></div>
							<div className="book_actions">
								<Button className="button__small">Prestar</Button>
								<Button onClick={() => handleOnRemoveBook(id, title)} className="button_inverse button__small">Borrar</Button>
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
		</>
	);
};

export default CollectionList;