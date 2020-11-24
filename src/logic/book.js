import { getObjectsFromApi } from '../services/api';

const APIKEY = 'AIzaSyB9_QP9nNFBh57Sd2tbLB-k6ZD_FqTB1zc';

export async function getBooksByTitle(searchTerm, maxResults) {
	const result = await getObjectsFromApi(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&key=${APIKEY}`);
	return result !== null ? result.data.items : null;
}