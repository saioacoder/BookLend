import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getRandomColor } from '../../logic/book';
import { getLibraryCollectionById, getStatus } from '../../logic/library';

import './BookList.scss';

const BookList = ({ filter = '' }) => {

	const { idLibrary, categories } = useSelector(state => state.library);
	const [books, setBooks] = useState([]);

	const history = useHistory();

	const getLibraryCollection = async (id, orderByTerm) => {
		const collection = await getLibraryCollectionById(id, orderByTerm);
		if(collection !== null) {
			if(filter === 'myBooks'){
				const newCollection = collection.filter(item => item.status !== '');
				setBooks(newCollection);
			} else {
				setBooks(collection);
			}
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
			{books.map(({ id, idCategory, title, cover, status }) => {
				let newStatus = '';
				if(filter === 'myBooks') {
					newStatus = getStatus(status);
				} else if(status === '') {
					newStatus = status;
				} else {
					newStatus = 'No disponible';
				}
				return (
					<article key={id} className={filter === 'myBooks' ? 'bookList_book bookList_book__disabled' : 'bookList_book'} onClick={() => openBook(id)}>
						<div className="book_cover" style={{backgroundColor: getRandomColor()}}>
							{cover && <img src={cover} alt="" />}
							{categories && <div className="book_category">{categories[idCategory]}</div>}
							{newStatus !== '' && <span className="book_status">{newStatus}</span>}
						</div>
						<h3 className="book_title">{title}</h3>
					</article>
				);
			})}
		</section>
	);

};

export default BookList;