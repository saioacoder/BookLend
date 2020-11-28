import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../components/button';
//import InputSearch from '../components/inputSearch';
import CollectionList from '../components/collectionList';
import AddBookForm from '../components/addBookForm';
import Modal from '../components/modal';

const Collection = () => {

	const [modalAddBookIsOpen, setModalAddBookIsOpen] = useState(false);
	const { nameLibrary } = useSelector(state => state.user);

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Colección de libros</h1>
					<h2 className="page_header_subtitle">Biblioteca: <strong>{nameLibrary}</strong></h2>
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
}

export default Collection;
