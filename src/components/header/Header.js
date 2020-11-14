import { Link } from "react-router-dom";

import Login from '../login';
import Modal from '../modal';
import Signup from '../signup';

import './Header.scss';

const menus = {
	default: [
		{ title: 'Registrarse', onClick: '' },
		{ title: 'Entrar', onClick: '' }
	],
	user: [
		{ title: 'Mis préstamos', onClick: '' },
		{ title: 'Mi perfil', onClick: '' },
		{ title: 'Salir', onClick: '' }
	],
	admin: [
		{ title: 'Colección', onClick: '' },
		{ title: 'Configuración', onClick: '' },
		{ title: 'Salir', onClick: '' }
	]
};

function getMenu(menuName) {
	console.log('1');
	const menuItems = menus[menuName];
	console.log(menuItems);
	menuItems.foreach(({ title, onClick }) => (
		<button onClick={onClick}>{title}</button>
	));
}

const Header = () => {
	const isAdmin = true;
	const isLogged = true;
	return (
		<>
			<header className="mainHeader">
				<Link to="/"><img src="" alt="BookLet" /></Link>
				<nav>
					{getMenu(isLogged ? (isAdmin ? 'admin' : 'user') : 'default')}
				</nav>
			</header>
			<Modal
				title="Registrar una biblioteca"
				isOpen={false}
			>
				{/* <Signup /> */}
			</Modal>
			<Modal
				title="Entrar"
				isOpen={false}
			>
				<Login />
			</Modal>
		</>
	);
};

export default Header;