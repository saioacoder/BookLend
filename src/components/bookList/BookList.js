import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getRandomColor } from '../../logic/book';
import { getBooksWithStatus } from '../../logic/bookStatus';
import { getLibraryCollectionById } from '../../logic/library';

import './BookList.scss';

const BookList = () => {

	const { idLibrary, categories } = useSelector(state => state.library);
	const [books, setBooks] = useState([]);

	const history = useHistory();

	const getLibraryCollection = async (id, orderByTerm) => {
		const collection = await getLibraryCollectionById(id, orderByTerm);
		const statuses = await getBooksWithStatus();
		if(collection !== null) {
			if(statuses !== null) {
				collection.map(book => {
					const status = statuses.filter(item => item.idBook === book.id);
					if(status.length > 0) {
						book.status  = status[0].status === 'reserved' ? 'reservado' : 'prestado';
					}
					return book;
				});
				setBooks(collection);
			}
		}
	};

	// const getBookStatus = async (id) => {
	// 	const result = await getActiveBookStatus(id);
	// 	return result && result.status;
	// };

	// const addStatusToBooks = bookList => {
	// 	if(bookList.length > 0) {
	// 		bookList.map( async (item) => {
	// 			const bookStatus = await getBookStatus(item.id);
	// 			if(bookStatus) {
	// 				console.log(item);
	// 				item.status = bookStatus;
	// 			}
	// 			return item;
	// 		});
	// 	}
	// };

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
			{books.map(({ id, idCategory, title, cover, status }) => {
				return (
					<article key={id} className="bookList_book" onClick={() => openBook(id)}>
						<div className="book_cover" style={{backgroundColor: getRandomColor()}}>
							{cover && <img src={cover} alt="" />}
							{categories && <div className="book_category">{categories[idCategory]}</div>}
							{status && <span className="book_status">{status}</span>}
						</div>
						<h3 className="book_title">{title}</h3>
					</article>
				);
			})}
		</section>
	);

};

export default BookList;