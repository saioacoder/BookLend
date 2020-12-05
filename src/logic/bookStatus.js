import { addObject, getDataByConditions } from '../services/data';


// Reserva un libro en la BBDD
export async function reserveBook(book) {
	return await addObject('booksStatus', book);
}


// Comprueba si el libro está disponible para reservar
export async function isBookAvailable(idBook) {
	const { result, error } = await getDataByConditions('booksStatus', [
		{
			field: 'idBook',
			condition: '==',
			value: idBook
		},
		{
			field: 'status',
			condition: 'not-in',
			value: ['archived']
		}
	]);
	return result === null && !error ? true : false;
}


// Devuelve todos los libros con estado "reserved" o "lent"
export async function getBooksWithStatus() {
	const { result, error } = await getDataByConditions('booksStatus', [
		{
			field: 'status',
			condition: 'not-in',
			value: ['archived']
		}
	]);
	return result !== null && !error ? result : null;
}


// Se utiliza ??
// Devuelve el status de un libro en activo (no tiene en cuenta los archivados)
export async function getActiveBookStatus(idBook) {
	const { result, error } = await getDataByConditions('booksStatus', [
		{
			field: 'idBook',
			condition: '==',
			value: idBook
		},
		{
			field: 'status',
			condition: 'not-in',
			value: ['archived']
		}
	]);
	//console.log(result);
	return result !== null && !error ? result[0] : null;
}