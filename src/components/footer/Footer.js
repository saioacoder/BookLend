import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {

	const actualYear = () => {
		const now = new Date();
		return now.getFullYear();
	};

	return (
		<>
			<footer className="footer">
				<div className="container">
					<div className="footer_copyright">© {actualYear()} BookLend v1.0</div>
					<Link to="/">Sobre BookLend</Link>
					<Link to="/">Contacto</Link>
				</div>
			</footer>
		</>
	);
};

export default Footer;