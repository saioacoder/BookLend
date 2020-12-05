import {
	addObjectWithId,
	getObjectById,
	addObjectToSubcollectionWithId, getObjectFromSubcollection, getObjectFromSubcollectionById, removeObjectFromSubcollectionWithId,
	updateObjectFromSubcollectionById
} from '../services/data';


// Añade una librería nueva con todos sus datos a la BBDD
export async function librarySignup(idLibrary, nameLibrary, address, postalCode, city, province, categories) {
	return await addObjectWithId('libraries', idLibrary, { nameLibrary, address, postalCode, city, province, categories });
}


// Añade un libro a la librería de la BBDD
export async function addBookToLibrary(idLibrary, idBook, book) {
	return await addObjectToSubcollectionWithId('libraries', idLibrary, 'collection', idBook, book);
}


// Borra un libro de la librería de la BBDD
export async function removeBookFromLibrary(idLibrary, idBook) {
	return await removeObjectFromSubcollectionWithId('libraries', idLibrary, 'collection', idBook);
}


// Devuelve todos los datos de una librería usando el ID desde la BBDD
export async function getLibraryById(id) {
	const library = await getObjectById('libraries', id);
	return library ? { ...library, idLibrary: library.id } : null;
}


// Devuelve todos los libros de una librería usando el ID desde la BBDD
export async function getLibraryCollectionById(id, orderByTerm='', orderBy='desc') {
	const collection = await getObjectFromSubcollection('libraries', id, 'collection', orderByTerm, orderBy);
	return collection ? collection : null;
}


// Devuelve un libro por ID de su librería
export async function getBookFromCollectionById(idLibrary, idBook) {
	const book = await getObjectFromSubcollectionById('libraries', idLibrary, 'collection', idBook);
	return book ? book : null;
}


// Devuelve una url válida
export function validateUrl(url) {
	const cleanUrl = url.replace(/[ ñ#!¡:.,_ç{}?¿+=$&%@!\\/()]/g, '');
	return cleanUrl.toLowerCase();
}


// Devuelve el string correcto para el estado
export function getStatus(status) {
	switch(status) {
		case 'reserved': return 'reservado';
		case 'lent': return 'prestado';
		case 'archived': return 'archivado';
		default: return '';
	}
}


// Reserva un libro en la BBDD
export async function reserveBook(idLibrary, idBook, bookData) {
	return await updateObjectFromSubcollectionById('libraries', idLibrary, 'collection', idBook, bookData);
}