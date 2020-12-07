import { getBookFormated } from '../../../logic/book';

import './BookCard.scss';

const BookCard = ({ book }) => {
	const { idBook, title, author, editorial, publishDate, language, synopsis, cover, pageNum } = getBookFormated(book);
	const shortSynopis = synopsis ? `${synopsis.slice(0, 300)}...` : '';

	return (
		<div className="bookCard">
			<img src={cover} className="bookCard_image" alt="" />
			<div>
				<h3 className="bookCard_title">{title}</h3>
				<ul className="bookCard_data">
					<p><strong>Autores ›</strong> {author}</p>
					<p><strong>Editorial ›</strong> {editorial}</p>
					<p><strong>Idioma ›</strong> {language}</p>
					<p><strong>Páginas ›</strong> {pageNum}</p>
					<p><strong>Fecha de publicación ›</strong> {publishDate}</p>
					<p><strong>ISBN ›</strong> {idBook}</p>
				</ul>
				<div className="bookCard_description">{shortSynopis}</div>
			</div>
		</div>
	);
};

export default BookCard;