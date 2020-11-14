import Modal from '../modal';

import './Header.scss';

const Header = () => {
	return (
		<>
			<header>
				<a href="/"><img src="" alt="BookLet" /></a>
				<nav>
					<a href="#1">Register</a>
					<a href="#1">Login</a>
				</nav>
			</header>
			<Modal
				title="Registrar una biblioteca"
				isOpen={true}
			>
				Contenido
			</Modal>
			<Modal
				title="Entrar"
				isOpen={false}
			>
				Contenid
			</Modal>
		</>
	);
};

export default Header;