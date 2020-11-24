import { getAuthors } from '../../logic/book';

import './BookCard.scss';

const BookCard = ({ book }) => {
	console.log(book);
	const { title, imageLinks, authors, publishedDate, industryIdentifiers, language, pageCount, description, publisher } = book.volumeInfo;
	const thumbnail = imageLinks ? imageLinks.thumbnail : '';
	const cleanTitle = title.replace(/\u00a0/g, ' ');
	const authorsList = getAuthors(authors);
	const publishedYear = publishedDate ? publishedDate.slice(0, 4) : '';
	const isbn = industryIdentifiers ? industryIdentifiers[0].identifier : '';
	const shortDescription = `${description.slice(0, 300)}...`;
	return (
		<div className="bookCard">
			<img src={thumbnail} className="bookCard_image" alt="" />
			<div>
				<h3 className="bookCard_title">{cleanTitle}</h3>
				<ul className="bookCard_data">
					<p><strong>Autores ›</strong> {authorsList}</p>
					<p><strong>Editorial ›</strong> {publisher}</p>
					<p><strong>Idioma ›</strong> {language}</p>
					<p><strong>Páginas ›</strong> {pageCount}</p>
					<p><strong>Fecha de publicación ›</strong> {publishedYear}</p>
					<p><strong>ISBN ›</strong> {isbn}</p>
				</ul>
				<div className="bookCard_description">{shortDescription}</div>
			</div>
		</div>
	);
};

export default BookCard;