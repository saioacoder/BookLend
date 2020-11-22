import Input from '../input';
import Button from '../button';

import './SearchBox.scss';

const SearchBox = () => {
	return (
		<div className="searchBox">
			<Input
				id="search"
				placeholder="Busca libros en la colección"
			/>
			<Button className="button_neutral">Buscar</Button>
		</div>
	);
};

export default SearchBox;