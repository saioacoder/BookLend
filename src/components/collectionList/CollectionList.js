import { useSelector } from 'react-redux';

const CollectionList = () => {
	const idLibrary = useSelector(state => state.user.idLibrary);

	return (
		<div className="CollectionList">
			Listado de libros de la colección
		</div>
	);
};

export default CollectionList;