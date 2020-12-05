import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../button';
import Modal from '../modal';
import ReservationBookForm from '../reservationBookForm';
import { getBookById, getBookFormated, getRandomColor } from '../../logic/book';
import { isBookAvailable } from '../../logic/bookStatus';

import './BookCardFull.scss';

const BookCardFull = () => {

	const { idBook } = useParams();
	const [book, setBook] = useState({});
	const [bookAvailable, setBookAvailable] = useState(false);
	const [modalReservationIsOpen, setModalReservationIsOpen] = useState(false);

	const { idLibrary } = useSelector(state => state.library);

	const history = useHistory();

	const getBook = async (id) => {
		const bookResult = await getBookById(id);
		if(bookResult !== null) {
			setBook(getBookFormated(bookResult));
		}
	};

	const bookAvailability = async (id) => {
		const result = await isBookAvailable(id);
		if(result) {
			setBookAvailable(result);
		}
	};

	const handleSuccess = () => {
		setModalReservationIsOpen(false);
		history.push(`/${idLibrary}/`);
	};

	useEffect(() => {
		if(idBook) {
			getBook(idBook);
			bookAvailability(idBook);
		}
	}, [idBook]);

	return (
		<>
			<article className="bookCardFull" style={{backgroundColor: getRandomColor()}}>
				<div className="bookCardFull_cover">
					{book.cover && <img src={book.cover} alt="" />}
				</div>
				<div className="bookCardFull_content">
					<h3 className="bookCardFull_title">{book.title}</h3>
					<ul className="bookCardFull_data">
						{book.autor && <p><strong>Autores ›</strong> {book.author}</p>}
						{book.editorial && <p><strong>Editorial ›</strong> {book.editorial}</p>}
						{book.language && <p><strong>Idioma ›</strong> {book.language}</p>}
						{book.pageNum && <p><strong>Páginas ›</strong> {book.pageNum}</p>}
						{book.publishDate && <p><strong>Fecha de publicación ›</strong> {book.publishDate}</p>}
						<p><strong>ISBN ›</strong> {idBook}</p>
					</ul>
					<div className="bookCardFull_description">{book.synopsis}</div>
					<div className="bookCardFull_action">
						{bookAvailable ?
							<Button onClick={() => setModalReservationIsOpen(true)}>Reservar</Button> :
							<Button disabled={true}>No disponible</Button>
						}
					</div>
				</div>
			</article>
			<Modal
				title="Reservar libro"
				isOpen={modalReservationIsOpen}
				onClose={() => setModalReservationIsOpen(false)}
			>
				<ReservationBookForm
					idBook={idBook}
					onCancel={() => setModalReservationIsOpen(false)}
					onSuccess={() => handleSuccess()}
				/>
			</Modal>
		</>
	);

};

export default BookCardFull;