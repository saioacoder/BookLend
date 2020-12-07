import { addObject } from '../services/data';

// Añade un registro al historial de libros
export async function addBookLog(log) {
	await addObject('bookLogs', log);
}