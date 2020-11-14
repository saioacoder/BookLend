import { Link } from "react-router-dom";

import Login from '../login';
import Modal from '../modal';
//import Signup from '../signup';

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
	const menuItems = menus[menuName];
	return (
		menuItems.map(({ title, onClick }, i) =>
			<button key={i} onClick={onClick} className="header_nav_item">{title}</button>
		)
	);
}

const Header = () => {
	const isAdmin = true;
	const isLogged = false;
	const menuName = isLogged ? isAdmin ? 'admin' : 'user' : 'default';
	return (
		<>
			<header className="header">
				<div className="container">
					<Link to="/"><img src="" alt="BookLet" /></Link>
					<nav className="header_nav">
						{getMenu(menuName)}
					</nav>
				</div>
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