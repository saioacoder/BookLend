import { useState } from 'react';
import { Link } from "react-router-dom";

import Login from '../login';
import Modal from '../modal';
import Signup from '../signup';
import SignupLibrary from '../signupLibrary';

import './Header.scss';

// const onClick = "foo";
// const func = new Function(
//      "return function " + onClick + "(){ console.log('sweet!')}"
// )();

// //call it, to test it
// func();

const Header = () => {
	const [modalSignupLibraryIsOpen, setModalSignupLibraryIsOpen] = useState(false);
	const [modalSignupIsOpen, setModalSignupIsOpen] = useState(false);
	const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);

	const menus = {
		default: [
			{ title: 'Crear biblioteca', onClick: setModalSignupLibraryIsOpen },
			{ title: 'Regístrate', onClick: setModalSignupIsOpen },
			{ title: 'Iniciar sesión', onClick: setModalLoginIsOpen }
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
				<button
					key={i}
					onClick={() => onClick(true)}
					className="header_nav_item"
				>{title}</button>
			)
		);
	}

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
				title="Crear una biblioteca"
				isOpen={modalSignupLibraryIsOpen}
				onClose={() => setModalSignupLibraryIsOpen(false)}
			>
				<SignupLibrary />
			</Modal>
			<Modal
				title="Regístrate"
				isOpen={modalSignupIsOpen}
				onClose={() => setModalSignupIsOpen(false)}
			>
				<Signup />
			</Modal>
			<Modal
				title="Iniciar sesión"
				isOpen={modalLoginIsOpen}
				onClose={() => setModalLoginIsOpen(false)}
			>
				<Login />
			</Modal>
		</>
	);
};

export default Header;