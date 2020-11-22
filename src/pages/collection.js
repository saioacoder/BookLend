import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLibraryById } from '../logic/library';

import Button from '../components/button';
import SearchBox from '../components/searchBox';
import CollectionList from '../components/collectionList';
import Modal from '../components/modal';

const Collection = () => {
	const [library, setLibrary] = useState({});
	const idLibrary = useSelector(state => state.user.idLibrary);
	const {name} = library;

	async function getLibraryName(id) {
		const lib = await getLibraryById(id);
		if(lib)
			setLibrary(lib);
	}

	useEffect(() => {
		getLibraryName(idLibrary);
	}, [idLibrary]);

	return (
		<>
			<header className="page_header">
				<div>
					<h1 className="page_header_title">Colección de libros</h1>
					<h2 className="page_header_subtitle">Biblioteca: <strong>{name}</strong></h2>
				</div>
				<Button>Nuevo libro</Button>
			</header>
			<SearchBox />
			<CollectionList />
			<Modal
				title="Nuevo libro"
				isOpen={false}
			>
				Formulario nuevo libro
			</Modal>
		</>
	);
}

export default Collection;
