import BookList from '../components/bookList';

const Home = () => {

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Colleción de libros</h1>
				</div>
			</header>
			<p className="page_header_description">Disfruta de nuestra <strong>increible colección de libros</strong>. Vamos añadiendo regularmente nuevos ejemplares, así que no dudes en pasarte por aquí cada cierto tiempo.</p>

			<BookList />
		</>
	);
}

export default Home;
