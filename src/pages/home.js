import BookList from '../components/bookList';

const Home = () => {

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Colleción de libros</h1>
				</div>
			</header>

			<BookList />
		</>
	);
}

export default Home;
