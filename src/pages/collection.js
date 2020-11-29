import { useState } from 'react';

import AddBookForm from '../components/addBookForm';
import Button from '../components/button';
import CollectionList from '../components/collectionList';
//import InputSearch from '../components/inputSearch';
import Modal from '../components/modal';

const Collection = () => {

	const [modalAddBookIsOpen, setModalAddBookIsOpen] = useState(false);

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Colección de libros</h1>
				</div>
				<Button onClick={() => setModalAddBookIsOpen(true)}>Añadir libro</Button>
			</header>

			{/* <InputSearch
				id="search"
				label="Busca libros en la colección"
				value=""
				hasError=""
				onChange=""
			/> */}

			<CollectionList />

			<Modal
				title="Añadir libro a la colección"
				isOpen={modalAddBookIsOpen}
				onClose={() => setModalAddBookIsOpen(false)}
			>
				<AddBookForm
					isModalClosed={modalAddBookIsOpen}
					onCancel={() => setModalAddBookIsOpen(false)}
					onSuccess={() => setModalAddBookIsOpen(false)}
				/>
			</Modal>
		</>
	);

};

export default Collection;
