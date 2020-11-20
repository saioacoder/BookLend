import { getObjectById } from '../services/data';

export async function checkLibraryExists(id) {
	const result = await getObjectById('libraries', id);
	return result ? result : null;
}

export function validateUrl(url) {
	const cleanUrl = url.replace(/[ ñ#!¡:.,_ç{}?¿+=$&%@!\\/()]/g, '');
	return cleanUrl.toLowerCase();
}