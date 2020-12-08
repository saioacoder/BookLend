import firebase from 'firebase/app';
import App from '.';

import firebaseConfig from './config';

import { addBookToLibrary, librarySignup, getStatus, validateUrl } from './logic/library';

describe ('BookLend', () => {

	const idLibrary = 'resso';
	const idUser = 'UUvyHNYrP5VPvr88WZq6yfqNgau1';
	const idUserAdmin = 'ItvDDZAWd6gmakX2WJo93mVrjlp1';

   beforeEach(() => {
		//firebase.initializeApp(firebaseConfig);
   })

   describe('Library testing', () => {

		test('Get status print name of "reserved"', () => {
			const result = getStatus('reserved');
			expect(result).toBe('reservado');
		});

		test('Clean a piece of a URL to be valid', () => {
			const result = validateUrl('perro flaco y famelico (sin hambre)');
			expect(result).toBe('perroflacoyfamelicosinhambre');
		});

      test('Add book to a library', async () => {
			const idBook = '9788466667037';
			const book = {
				idCategory: 1,
				idBookCustom: 'malditas2',
				title: 'Las malditas',
				purchaseDate: Date.now(),
				cover: 'http://books.google.com/books/content?id=zPm7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
				status: ''
			};
			const result = await addBookToLibrary(idLibrary, idBook, book);
			//console.log(result);
			expect(result).toBe(true);
		});

		// test('Create a new library', async () => {
		// 	const libraryData = {
		// 		nameLibrary: 'Biblioteca del valle',
		// 		address: 'Avenida Parral 3',
		// 		postalCode: 990044,
		// 		city: 'Barcelona',
		// 		province: 'Barcelona',
		// 		categories: ['novela', 'poesía']
		// 	};
		// 	const result = await librarySignup(idLibrary, libraryData);
		// 	expect(result).toBe(true);
      // });

   });

});