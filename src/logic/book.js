import { getObjectsFromApi } from '../services/api';

const APIKEY = 'AIzaSyB9_QP9nNFBh57Sd2tbLB-k6ZD_FqTB1zc';

export async function getBooksByTitle(searchTerm, maxResults) {
	const result = await getObjectsFromApi(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&printType=BOOKS&orderBy=relevance&key=${APIKEY}`);
	return result !== null ? result.data.items : null;
}

export async function getBookById(id) {
	const result = await getObjectsFromApi(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}&printType=BOOKS&orderBy=relevance&key=${APIKEY}`);
	if(result !== null && result !== undefined) {
		const resultItems = result.data.items;
		return resultItems[0];
	}
	return null;
}

export function formatData(date) {
	const dateFormated = new Date(date);
	const year = dateFormated.getFullYear();
	const month = dateFormated.getMonth() + 1;
	const day = dateFormated.getDate();
	return `${day}-${month}-${year}`;
}

export function getAuthors(authors) {
	if(authors) {
		return authors.map((item, i) => {
			if(i !== authors.length - 1 && authors.length > 1) {
				return `${item}, `;
			}
			return item;
		});
	} else {
		return '';
	}
}