import { useState, useEffect } from 'react';

import Input from '../input';
import Button from '../button';
import { userSignup } from '../../logic/signup';

import './SignupUser.scss';

const SignupUser = ({ isModalClosed, onCancel, onSuccess }) => {
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	//const [birthdate, setBirthdate] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');

	const [nameError, setNameError] = useState(false);
	const [lastnameError, setLastnameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	//const [birthdateError, setBirthdateError] = useState('');
	const [addressError, setAddressError] = useState(false);
	const [postalCodeError, setPostalCodeError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [provinceError, setProvinceError] = useState(false);
	const [signupError, setSignupError] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		setNameError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setSignupError('');

		let error = false;
		if(!name) {
			error = true;
			setNameError(true);
		}
		if(!lastname) {
			error = true;
			setLastnameError(true);
		}
		if(!email) {
			error = true;
			setEmailError(true);
		}
		if(!password) {
			error = true;
			setPasswordError(true);
		}
		if(!error) {
			setSignupError('');
			const { success, error } = await userSignup(name, lastname, email, password, isAdmin, idLibrary);
			if(!success) {
				setSignupError(error);
			} else {
			 	setName('');
			 	setLastname('');
			 	setEmail('');
			 	setPassword('');
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className={isVisible ?`signup` : 'signup hide'}>
			{isAdmin && <p className="modal_description">Introduce los datos de la persona que va a gestionar la biblioteca.</p>}
			<Input
				id="name"
				label="Nombre"
				value={name}
				hasError={nameError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setName(value)}
				className="signup_field_half"
			/>
			<Input
				id="lastname"
				label="Apellido"
				value={lastname}
				hasError={lastnameError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setLastname(value)}
				className="signup_field_half"
			/>
			<Input
				id="email"
				label="Email"
				value={email}
				hasError={emailError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setEmail(value)}
				className="signup_field_full"
			/>
			<Input
				id="password"
				label="Contraseña"
				value={password}
				hasError={passwordError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setPassword(value)}
				className="signup_field_full"
				type="password"
			/>
			{signupError && <p className="signup_error">{signupError}</p>}
			<Button className="button_inverse" onClick={onGoBack}>Atras</Button>
			<Button className="button_transparent" onClick={onCancel}>Cancelar</Button>
			<Button>Enviar</Button>
		</form>
	);
};

export default SignupUser;