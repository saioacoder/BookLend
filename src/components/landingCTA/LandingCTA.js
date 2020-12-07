import bgLanding from '../../img/bg_landing.jpg';
import logoImg from '../../img/logo.svg';
import Button from '../button';

import './LandingCTA.scss';

const LandingCTA = ({ onClickButton }) => {

	return (
		<section className="landingCTA">
			<div className="landingCTA_content">
				<img src={logoImg} alt="" className="landingCTA_logo" />
				<h1><strong>Crea una biblioteca online completamente gratis</strong> y permite a tus usuarios reservar y tomar prestados libros de forma sencilla y cómoda.</h1>
				<Button onClick={onClickButton}>Crea tu biblioteca gratis</Button>
				<Button className="button_inverse">Ver demo</Button>
			</div>
			<img src={bgLanding} alt="" className="landingCTA_img" />
		</section>
	);

};

export default LandingCTA;