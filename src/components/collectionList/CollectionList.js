import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '../button';
import { getLibraryCollectionById } from '../../logic/library';

import './CollectionList.scss';

const CollectionList = () => {
	const library = useSelector(state => state.library);
	const { idLibrary, categoriesLibrary } = library;
	const [books, setBooks] = useState([]);
	console.log(library);

	const getLibraryCollection = async (id, orderByTerm) => {
		const collection = await getLibraryCollectionById(id, orderByTerm);
		if(collection !== null) {
			setBooks(collection);
		}
	};
	useEffect(() => {
		if(idLibrary)
			getLibraryCollection(idLibrary, 'purchaseDate');
	}, [idLibrary, books]);

	return (
		<div className="collection">
			<header className="collection_header">
				<div className="header_primaryData">Libro</div>
				<div className="header_categories">Categoría</div>
				<div className="header_status">Estado</div>
				<div className="header_actions">Acciones</div>
			</header>
			{books.map(({ id, categoryId, idBookCustom, purchaseDate, title, units, unitsNow, cover }) => {
				return (
					<div key={id} className="collection_book">
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
						<div className="book_status">
							<span>Unidades › {unitsNow} / {units}</span>
						</div>
						<div className="book_actions">
							<Button className="button_inverse button__small">Prestar</Button>
							<Button className="button_inverse button__small">Borrar</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CollectionList;