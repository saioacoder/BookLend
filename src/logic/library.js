import { addObjectWithId, getObjectById, addObjectToSubcollectionWithId, getObjectFromSubcollection } from '../services/data';


// Añade una librería nueva con todos sus datos a la BBDD
export async function librarySignup(idLibrary, name, address, postalCode, city, province, categories) {
	return await addObjectWithId('libraries', idLibrary, { name, address, postalCode, city, province, categories });
}


// Añade una librería con todos sus datos a la BBDD
export async function addBookToLibrary(idLibrary, idBook, book) {
	return await addObjectToSubcollectionWithId('libraries', idLibrary, 'collection', idBook, book);
}


// Devuelve todos los datos de una librería usando el ID desde la BBDD
export async function getLibraryById(id) {
	const library = await getObjectById('libraries', id);
	//return library ? library : null;
	return { ...library, idLibrary: library.id };
}


// Devuelve todos los libros de una librería usando el ID desde la BBDD
export async function getLibraryCollectionById(id, orderByTerm='', orderBy='desc') {
	const collection = await getObjectFromSubcollection('libraries', id, 'collection', orderByTerm, orderBy);
	return collection ? collection : null;
}


// Devuelve una url válida
export function validateUrl(url) {
	const cleanUrl = url.replace(/[ ñ#!¡:.,_ç{}?¿+=$&%@!\\/()]/g, '');
	return cleanUrl.toLowerCase();
}