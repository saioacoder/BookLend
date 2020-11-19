import { getObjectById } from '../services/data';

export async function checkLibraryExists(id) {
	const result = await getObjectById('libraries', id);
	return result ? true : false;
}