import firebase from 'firebase/app';
import firebaseConfig from '../config';

import { getBooksByTitle, getBookById, addBookById, formatData, getAuthors } from './book';

describe ('BookLend', () => {

	const idBookTest = '9700000000005';
	const idBookApi = '9788418260124';
	const bookData = {
		idCategory: 1,
		idBookCustom: 'book-prueba',
		title: 'Libro de prueba',
		purchaseDate: Date.now(),
		cover: '',
		status: ''
	};

	beforeEach(() => {
		if(!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
	});

	describe('Library testing', () => {

		test('Get books by Title from PI', async () => {
			const result = await getBooksByTitle('La vida secreta de los gatos', 1);
			expect(result[0].id).toBe('2OnzDwAAQBAJ');
		});

		test('Get book by ID from API', async () => {
			const result = await getBookById(idBookApi);
			expect(result.volumeInfo.title).toBe('La vida secreta de los gatos');
		});

		test('Add book by ID', async () => {
			const result = await addBookById(idBookTest, bookData);
			expect(result).toBe(true);
		});

		test('Format data', () => {
			const result = formatData(1607452842723);
			expect(result).toBe('8-12-2020');
		});

		test('Return all authors on one string', () => {
			const result = getAuthors(['Jane Austen', 'Saramago', 'Perez Reverte']);
			expect(result).toBe('Jane Austen, Saramago, Perez Reverte');
		});

	});

});