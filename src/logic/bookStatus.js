


// Comprueba si el libro está disponible para reservar
// export async function isBookAvailable(idBook) {
// 	const { result, error } = await getDataByConditions('booksStatus', [
// 		{
// 			field: 'idBook',
// 			condition: '==',
// 			value: idBook
// 		},
// 		{
// 			field: 'status',
// 			condition: 'not-in',
// 			value: ['archived']
// 		}
// 	]);
// 	return result === null && !error ? true : false;
// }