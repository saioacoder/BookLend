import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BookCardFull from '../components/bookCardFull';

const Book = () => {

	const { idLibrary } = useSelector(state => state.library);

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Ficha del libro</h1>
				</div>
				<Link to={`/${idLibrary}/`} className="button_inverse button__small"> Volver</Link>
			</header>

			<BookCardFull />
		</>
	);

}

export default Book;
