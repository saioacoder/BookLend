import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getRandomColor } from '../../logic/book';
import { getLibraryCollectionById } from '../../logic/library';

import './BookList.scss';

const BookList = () => {
	const { idLibrary, categoriesLibrary } = useSelector(state => state.library);
	const [books, setBooks] = useState([]);

	const history = useHistory();

	const getLibraryCollection = async (id, orderByTerm) => {
		const collection = await getLibraryCollectionById(id, orderByTerm);
		if(collection !== null) {
			setBooks(collection);
		}
	};

	const openBook = (id) => {
		history.push(`/${idLibrary}/libro/${id}`);
	};

	useEffect(() => {
		if(idLibrary) {
			getLibraryCollection(idLibrary, 'purchaseDate');
		}
	}, [idLibrary]);

	return (
		<section className="bookList">
			{books.map(({ id, categoryId, title, cover }) => {
				return (
					<article key={id} className="bookList_book" onClick={() => openBook(id)}>
						<div className="book_cover" style={{backgroundColor: getRandomColor()}}>
							{cover && <img src={cover} alt="" />}
							{categoriesLibrary && <div className="book_category">{categoriesLibrary[categoryId]}</div>}
						</div>
						<h3 className="book_title">{title}</h3>
					</article>
				);
			})}
		</section>
	);
};

export default BookList;