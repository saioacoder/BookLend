import { getObjectsFromApi } from '../services/api';
import { addObjectWithId } from '../services/data';

const APIKEY = 'AIzaSyB9_QP9nNFBh57Sd2tbLB-k6ZD_FqTB1zc';


// Devuelve todos los libros que corresponden a una palabra clave de la API de Google
export async function getBooksByTitle(searchTerm, maxResults) {
	const result = await getObjectsFromApi(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&orderBy=relevance&key=${APIKEY}`);
	return result !== null ? result.data.items : null;
}


// Devuelve un libro con todos sus datos que corresponde a un id de la API de Google
export async function getBookById(id) {
	const result = await getObjectsFromApi(`https://www.googleapis.com/books/v1/volumes/?q=${id}&key=${APIKEY}`);
	if(result !== null && result !== undefined) {
		const resultItems = result.data.items;
		return resultItems[0];
	}
	return null;
}


// Añade un libro usando su id a la BBDD
export async function addBookById(idBook, book) {
	return await addObjectWithId('books', idBook, book);
}


// Formatea una fecha (dd-mm-aaaa)
export function formatData(date) {
	const dateFormated = new Date(date);
	const year = dateFormated.getFullYear();
	const month = dateFormated.getMonth() + 1;
	const day = dateFormated.getDate();
	return `${day}-${month}-${year}`;
}


// Devuelve un string con todos los autores de un libro encadenados
export function getAuthors(authors) {
	if(authors) {
		const authorArray = authors.map((item, i) => {
			if(i !== authors.length - 1 && authors.length > 1) {
				return `${item}, `;
			}
			return item;
		});
		return authorArray[0];
	} else {
		return '';
	}
}


// Devuelve un libro ya formateado (objeto)
export function getBookFormated(book) {
	const { title, imageLinks, authors, publishedDate, industryIdentifiers, language, pageCount, description, publisher } = book.volumeInfo;

	const isbn13Item = industryIdentifiers.filter(item => item.type === 'ISBN_13');
	const isbnNew = isbn13Item ? isbn13Item[0].identifier : '';
	const titleNew = title.replace(/\u00a0/g, ' ');
	const authorNew = getAuthors(authors);
	const publisherNew = publisher ? publisher : '';
	const publishedYearNew = publishedDate ? publishedDate.slice(0, 4) : '';
	const languageNew = language ? language : '';
	const descriptionNew = description ? description : '';
	const thumbnailNew = imageLinks ? imageLinks.thumbnail : '';
	const pageCountNew = pageCount ? pageCount : '';

	return {
		idBook: isbnNew,
		title: titleNew,
		author: authorNew,
		editorial: publisherNew,
		publishDate: publishedYearNew,
		language: languageNew,
		synopsis: descriptionNew,
		cover: thumbnailNew,
		pageNum: pageCountNew
	}
}

export function getRandomColor() {
	const randomColor = Math.random() * 360;
	return `hsl(${randomColor}, 33%, 95%)`;
}