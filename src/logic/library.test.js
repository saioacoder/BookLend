import firebase from 'firebase/app';
import firebaseConfig from '../config';

import { addBookToLibrary, librarySignup, getStatus, validateUrl, removeBookFromLibrary, getLibraryById, getLibraryCollectionById, getBookFromCollectionById, updateBook } from './library';

//import { getObjectById } from '../services/data';

describe ('BookLend', () => {

	const idLibrary = 'test-library';
	const libraryData = {
		nameLibrary: 'Biblioteca del valle',
		address: 'Avenida Parral 3',
		postalCode: 990044,
		city: 'Barcelona',
		province: 'Barcelona',
		categories: ['novela', 'poesía']
	};
	const idBook = '9788466667036';
	const bookData = {
		idCategory: 1,
		idBookCustom: 'malditas2',
		title: 'Las malditas',
		purchaseDate: Date.now(),
		cover: 'http://books.google.com/books/content?id=zPm7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
		status: ''
	};

   beforeEach(() => {
		if(!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
   });

   describe('Library testing', () => {

		test('Create a new library', async () => {
			try {
				const result = await librarySignup('valle-biblio', libraryData);
				expect(result).toBe(true);
			} catch (error) {
				console.log('Error "Create a new library"');
			}
			// No está completo, hay que verificar que haya un item más en las librerías
		});

      test('Add book to a library', async () => {
			try {
				const result = await addBookToLibrary(idLibrary, idBook, bookData);
				expect(result).toBe(true);
			} catch (error) {
				console.log('Error "Add book to a library"');
			}
		});

		test('Remove a book from a library', async () => {
			try {
				const result = await removeBookFromLibrary(idLibrary, idBook);
				expect(result).toBe(true);
			} catch (error) {
				console.log('Error "Remove a book from a library"');
			}
		});

		// test('Get all data from a library by ID', async () => {
		// 	try {
		// 		const result = await getLibraryById(idLibrary);
		// 		expect(result).toBe(true);
		// 	} catch(error) {
		// 		//expect(result).toBe(false);
		// 	}
		// });

		// test('Get library collection by ID', async () => {
		//  	try {
		//  		const result = await getLibraryCollectionById(idLibrary);
		// 		expect(result.length).toBe(1);
		//  	} catch (error) {
		//  		console.log('Error "Get library collection by ID"');
		//  	}
		// 	// Hay que añadir un libro nuevo antes de hacer este test, porque el anterior se borra
		// });

		// test('Get book from a Library by ID', async () => {
		// 	try {
		// 		const newBook = await addBookToLibrary(idLibrary, idBook, bookData);
		// 		if(newBook) {
		// 			const result = await getBookFromCollectionById(idLibrary, idBook);
		// 			expect(result).toBe(bookData);
		// 		}
		// 	} catch (error) {
		// 		console.log('Error "Get a book from a Library by ID"');
		// 	}
		// });

		test('Update book data', async () => {
		 	try {
				const newBook = await addBookToLibrary(idLibrary, idBook, bookData);
				if(newBook) {
					const bookDataNew = bookData;
					bookDataNew.title = 'Manolitas';
					const result = await updateBook(idLibrary, idBook, bookDataNew);
					expect(result).toBe(true);
				}
		 	} catch (error) {
		 		console.log('Error "Update book data"');
			}
		});

		test('Get status print name of "reserved"', () => {
			const result = getStatus('reserved');
			expect(result).toBe('reservado');
		});

		test('Clean a piece of a URL to be valid', () => {
			const result = validateUrl('perro flaco y famelico (sin hambre)');
			expect(result).toBe('perroflacoyfamelicosinhambre');
		});

   });

});