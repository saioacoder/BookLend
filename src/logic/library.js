import {
	addObjectWithId,
	getObjectById,
	addObjectToSubcollectionWithId, getObjectFromSubcollection, getObjectFromSubcollectionById, removeObjectFromSubcollectionWithId,
	updateObjectFromSubcollectionById
} from '../services/data';


// Añade una librería nueva con todos sus datos a la BBDD
export async function librarySignup(idLibrary, libraryData) {
	try {
		const result = await addObjectWithId('libraries', idLibrary, libraryData);
		return result;
	} catch (error) {
		console.log("librarySignup Error:", error);
		return false;
	}
}


// Añade un libro a la librería de la BBDD
export async function addBookToLibrary(idLibrary, idBook, book) {
	try {
		return await addObjectToSubcollectionWithId('libraries', idLibrary, 'collection', idBook, book);
	} catch (error) {
		console.log("addBookToLibrary Error:", error);
		return false;
	}
}


// Borra un libro de la librería de la BBDD
export async function removeBookFromLibrary(idLibrary, idBook) {
	try {
		return await removeObjectFromSubcollectionWithId('libraries', idLibrary, 'collection', idBook);
	} catch (error) {
		console.log("removeBookFromLibrary Error:", error);
		return false;
	}
}


// Devuelve todos los datos de una librería usando el ID desde la BBDD
export async function getLibraryById(id) {
	try {
		const library = await getObjectById('libraries', id);
		return library !== null ? { ...library, idLibrary: library.id } : null;
	} catch (error) {
		console.log("getLibraryById Error:", error);
	}
}


// Devuelve todos los libros de una librería usando el ID desde la BBDD
export async function getLibraryCollectionById(id, orderByTerm='', orderBy='desc') {
	try {
		const collection = await getObjectFromSubcollection('libraries', id, 'collection', orderByTerm, orderBy);
		return collection ? collection : null;
	} catch (error) {
		console.log("getLibraryCollectionById Error:", error);
	}
}


// Devuelve un libro por ID de su librería
export async function getBookFromCollectionById(idLibrary, idBook) {
	try {
		const book = await getObjectFromSubcollectionById('libraries', idLibrary, 'collection', idBook);
		return book ? book : null;
	} catch (error) {
		console.log("getBookFromCollectionById Error:", error);
	}
}


// Actualizar los datos de un libro en la BBDD
export async function updateBook(idLibrary, idBook, bookData) {
	try {
		return await updateObjectFromSubcollectionById('libraries', idLibrary, 'collection', idBook, bookData);
	} catch (error) {
		console.log("updateBook Error:", error);
	}
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
		case 'lent': return 'en préstamo';
		case 'archived': return 'archivado';
		default: return '';
	}
}