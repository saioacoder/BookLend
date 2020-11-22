import { addObjectWithId, getObjectById } from '../services/data';

export async function librarySignup(idLibrary, name, address, postalCode, city, province, categories) {
	return await addObjectWithId('libraries', idLibrary, { name, address, postalCode, city, province, categories });
}

export async function getLibraryById(id) {
	const library = await getObjectById('libraries', id);
	return library ? library : null;
}

export function validateUrl(url) {
	const cleanUrl = url.replace(/[ ñ#!¡:.,_ç{}?¿+=$&%@!\\/()]/g, '');
	return cleanUrl.toLowerCase();
}