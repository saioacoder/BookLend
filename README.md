#BookLend

Proyecto para ayudar en la gestión de bibliotecas pequeñas que no se pueden permitir el desarrollo de una web propia con sistema de préstamos online. Tendrá un completo sistema de reservas, préstamos y catálogo de libros.

## Demo

https://booklend-app.web.app


## Programación usada

- Listas
- API
- Formularios / Validaciones
- Registro / Login
- CRUD (create, read, update, delete)
- Filtrar / Buscar
- Testing
- Responsive

## Estructura de datos

```jsx
const users = [
	{
		// id: '234324243523' // Firebase
		idLibrary: 'ramon-llul', // String
		isAdmin: false, // Boolean
		nameUser: 'Gemma', // String
		lastname: 'Sorento', // String
		email: 'gemma.sorento@gmail.com', // String
		address: 'Carrer Colón 34, 3A', // String (no admin)
		postalCode: '08990', // String (no admin)
		city: 'Sabadell', // String (no admin)
		province: 'Barcelona', // String (no admin)
		warningNum: 0, // Number (no admin)
	},
	...
];

const libraries = [
	{
		// id: 'ramon-llul' // Firebase
		nameLibrary: 'Biblioteca Ramon Llul', // String
		address: 'Carrer Sant Bartolin s/n', // String
		postalCode: '08900', // String
		city: 'Sabadell', // String
		province: 'Barcelona', // String
		categories: [ // Array strings
			'novelas',
			'infantil',
			'comics',
			'diccionarios',
			'educación',
			...
		],
		collection: [ // Subcollection
			{
				// id: '9783161484100' // Firebase
				idCategory: 2, // Number
				idBookCustom: 'NBE200', // String
				title: 'Las aventuras de Tintin', // String
				cover: 'http://........', // String
				purchaseDate: '2344234234', // Date
				reserveDate: '33242342333', // Date
				lendDate: '331231123123', // Date
				returnDate: '2342342343', // Date
				status: 'reserved', // String (lent | reserved | '')
				idUser: '32342342342344', // String
			},
			...
		]
	},
	...
];

const books = [
	{
		// id: '9783161484100' // Firebase
		title: 'Las aventuras de Tintin', // String
		author: 'Georges Remi', // String
		editorial: 'Editorial Juventud', // String
		publishDate: '1978', // String
		language: 'es', // String
		synopsis: 'El secreto del unicornio se centra en el misterio que esconde la maqueta de un barco que Tintín compra para regalársela a su amigo Haddock; tras el inusual interés de unos individuos por reproducir el navío, Tintín descubre que hay tres modelos iguales, ocultándose en ellos unos pergaminos.', // String
		cover: 'http://........jpg', // String
		pageNum: 56, // Number
	},
	...
];

const bookLogs = [
	{
		idBook: '9783161484100', // String
		idLibrary: 'ramon-llul', // String
		idUser: '33424234324323', // String
		reserveDate: '33242342333', // Date
		lendDate: '331231123123', // Date
		returnDate: '2342342343', // Date
	},
	...
];
```