import { addObject, getDataByConditions } from '../services/data';


// Reserva un libro en la BBDD
export async function reserveBook(book) {
	return await addObject('booksStatus', book);
}


// Reserva un libro en la BBDD
export async function getBookStatus(idBook) {
	return await getDataByConditions('booksStatus', [
		{
			field: 'idBook',
			condition: '==',
			value: idBook
		},
		{
			field: 'status',
			condition: '>',
			value: 'archived'
		},
		{
			field: 'status',
			condition: '<',
			value: 'archived'
		},
	]);
}