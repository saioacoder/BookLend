import { useState } from 'react';

import AddBookForm from '../components/addBookForm';
import Button from '../components/button';
import CollectionList from '../components/collectionList';
import Modal from '../components/modal';
import Tabs from '../components/tabs';

const Collection = () => {

	const [collectionFilter, setCollectionFilter] = useState('');
	const [modalAddBookIsOpen, setModalAddBookIsOpen] = useState(false);
	const [refreshCollection, setRefreshCollection] = useState(false);

	const handleOnSuccessAddBook = () => {
		setModalAddBookIsOpen(false);
		setRefreshCollection(true);
	};

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Colección de libros</h1>
				</div>
				<Button onClick={() => setModalAddBookIsOpen(true)}>Añadir libro</Button>
			</header>

			<Tabs changeFilter={setCollectionFilter} />

			<CollectionList
				filter={collectionFilter}
				onRefreshCollection={refreshCollection}
				onEndRefresh={() => setRefreshCollection(false)}
			/>

			<Modal
				title="Añadir libro a la colección"
				isOpen={modalAddBookIsOpen}
				onClose={() => setModalAddBookIsOpen(false)}
			>
				<AddBookForm
					isModalClosed={modalAddBookIsOpen}
					onCancel={() => setModalAddBookIsOpen(false)}
					onSuccess={handleOnSuccessAddBook}
				/>
			</Modal>
		</>
	);

};

export default Collection;
