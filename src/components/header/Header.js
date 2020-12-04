import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//import Loading from '../loading';
import logoImg from '../../img/logo.svg';
import Login from '../login';
import Modal from '../modal';
import SignupLibrary from '../signupLibrary';
import SignupUser from '../signupUser';
import { userLogout } from '../../logic/user';

import './Header.scss';

const Header = () => {

	const { idUser, nameUser, isAdmin } = useSelector(state => state.user);
	const { idLibrary, nameLibrary } = useSelector(state => state.library);
	const menuName = idUser ? (isAdmin ? 'admin' : 'user') : 'default';

	//const [showLoading, setShowLoading] = useState(false);
	const [logoLink, setLogoLink] = useState('/');
	const [modalSignupLibraryIsOpen, setModalSignupLibraryIsOpen] = useState(false);
	const [modalSignupIsOpen, setModalSignupIsOpen] = useState(false);
	const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
	const [formSuccess, setFormSuccess] = useState('');

	const history = useHistory();

	const handleLogout = () => {
		history.push(`/`);
		userLogout();
	};

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
				action: `/${idLibrary}/mis-prestamos/`,
				actionType: 'url'
			},
			{
				title: 'Mi perfil',
				action: '',
				actionType: 'function'
			},
			{
				title: 'Salir',
				action: handleLogout,
				actionType: 'function'
			}
		],
		admin: [
			{
				title: 'Colección',
				action: `/${idLibrary}/admin/coleccion/`,
				actionType: 'url'
			},
			{
				title: 'Configuración',
				action: '',
				actionType: 'function'
			},
			{
				title: 'Salir',
				action: handleLogout,
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
					return (<Link key={i} to={action} className="header_nav_item">{title}</Link>);
				}
			})
		);
	}

	useEffect(() => {
		// if(!idUser) {
		// 	setShowLoading(true);
		// } else {
		// 	setShowLoading(false);
		// }
		if(formSuccess === 'admin'){
			history.push(`/${idLibrary}/admin/`);
			setFormSuccess('');
		} else if(formSuccess === 'user'){
			history.push(`/${idLibrary}/`);
			setFormSuccess('');
		} else if(formSuccess === 'login') {
			if(isAdmin) {
				history.push(`/${idLibrary}/admin/`);
			} else {
				history.push(`/${idLibrary}/`);
			}
			setFormSuccess('');
		}
		if(isAdmin !== undefined) {
			if(isAdmin) {
				setLogoLink(`/${idLibrary}/admin/`);
			} else {
				setLogoLink(`/${idLibrary}/`);
			}
		} else {
			setLogoLink(`/`);
		}
	}, [history, formSuccess, idLibrary, isAdmin]);

	return (
		<>
			<header className="header">
				<div className="container">
					<Link to={logoLink} className="header_logo">
						<img src={logoImg} alt="" />
						<span>Book<span>Lend</span></span>
					</Link>
					{nameLibrary && <span className="header_library">/ {nameLibrary}</span>}
					{nameUser && <button className="header_user">¡Hola <strong>{nameUser}</strong>! <span className="header_user_icon">›</span></button>}
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
			{/* <Loading show={showLoading} /> */}
		</>
	);

};

export default Header;