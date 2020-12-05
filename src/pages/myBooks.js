import BookList from '../components/bookList';

const MyBooks = () => {
	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Mis libros</h1>
				</div>
			</header>

			<BookList filter="myBooks" />
		</>
	);
}

export default MyBooks;
