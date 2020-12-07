import BookList from '../components/bookList';

const MyBooks = () => {
	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Mis libros</h1>
				</div>
			</header>
			<p className="page_header_description">Recuerda pasar a buscar, lo antes posible, por tu biblioteca los libros que tengas <strong>Reservados</strong>. Y no olvides devolver a tiempo los libros que tengas <strong>En préstamo</strong> para que otros usuarios puedan disfrutar de ellos también.</p>

			<BookList filter="myBooks" />
		</>
	);
}

export default MyBooks;
