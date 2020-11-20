import { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";

import Login from '../login';
import Modal from '../modal';
import SignupLibrary from '../signupLibrary';
import SignupUser from '../signupUser';

import './Header.scss';

const Header = () => {

	// Quitar estos ??
	const isAdmin = true;
	const isLogged = false;
	const idLibrary = 'saibiblio';
	const menuName = isLogged ? isAdmin ? 'admin' : 'user' : 'default';

	const [modalSignupLibraryIsOpen, setModalSignupLibraryIsOpen] = useState(false);
	const [modalSignupIsOpen, setModalSignupIsOpen] = useState(false);
	const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
	const [formSuccess, setFormSuccess] = useState('');

	const history = useHistory();

	const menus = {
		default: [
			{
				title: 'Crear biblioteca',
				action: setModalSignupLibraryIsOpen,
				actionType: 'function'
			},
			{
				title: 'Regístrate',
				action: setModalSignupIsOpen,
				actionType: 'function'
			},
			{
				title: 'Iniciar sesión',
				action: setModalLoginIsOpen,
				actionType: 'function'
			}
		],
		user: [
			{
				title: 'Mis préstamos',
				action: '/:idLibrary/mis-prestamos/',
				actionType: 'url'
			},
			{
				title: 'Mi perfil',
				action: '',
				actionType: 'function'
			},
			{
				title: 'Salir',
				action: '',
				actionType: 'function'
			}
		],
		admin: [
			{
				title: 'Colección',
				action: '/:idLibrary/admin/coleccion/',
				actionType: 'url'
			},
			{
				title: 'Configuración',
				action: '',
				actionType: 'function'
			},
			{
				title: 'Salir',
				action: '',
				actionType: 'function'
			}
		]
	};

	function getMenu(menuName) {
		const menuItems = menus[menuName];
		return (
			menuItems.map(({ title, action, actionType }, i) => {
				if(actionType === 'function'){
					return (<button key={i} onClick={() => action(true)} className="header_nav_item">{title}</button>);
				} else {
					return (<Link to={action} className="header_nav_item">{title}</Link>);
				}
			})
		);
	}

	useEffect(() => {
		if(formSuccess === 'admin'){
			history.push(`/${idLibrary}/admin/inicio/`);
			setFormSuccess('');
		} else if(formSuccess === 'user'){
			history.push(`/${idLibrary}/inicio/`);
			setFormSuccess('');
		}
	}, [history, formSuccess]);

	return (
		<>
			<header className="header">
				<div className="container">
					<Link to="/" className="header_logo">Book<span>Lend</span></Link>
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
				<SignupLibrary
					isModalClosed={modalSignupLibraryIsOpen}
					onCancel={() => setModalSignupLibraryIsOpen(false)}
					onSuccess={() => setFormSuccess('admin')}
				/>
			</Modal>
			<Modal
				title="Regístrate"
				isOpen={modalSignupIsOpen}
				onClose={() => setModalSignupIsOpen(false)}
			>
				<SignupUser
					isModalClosed={modalSignupIsOpen}
					onCancel={() => setModalSignupIsOpen(false)}
					onSuccess={() => setFormSuccess('user')}
				/>
			</Modal>
			<Modal
				title="Iniciar sesión"
				isOpen={modalLoginIsOpen}
				onClose={() => setModalLoginIsOpen(false)}
			>
				<Login
					isModalClosed={modalLoginIsOpen}
					onCancel={() => setModalLoginIsOpen(false)}
					onSuccess={() => setFormSuccess('login')}
				/>
			</Modal>
		</>
	);
};

export default Header;