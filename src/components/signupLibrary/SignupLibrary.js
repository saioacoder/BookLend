import { useState, useEffect } from 'react';

import Input from '../input';
import InputUrl from '../inputUrl';
import Button from '../button';
import { adminSignup, librarySignup } from '../../logic/signup';
import { checkLibraryExists, validateUrl } from '../../logic/library';

import './SignupLibrary.scss';

const SignupLibrary = ({ isModalClosed, onCancel, onSuccess }) => {
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [idLibrary, setIdLibrary] = useState('');
	const [nameLibrary, setNameLibrary] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');

	const [nameError, setNameError] = useState(false);
	const [lastnameError, setLastnameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [idLibraryError, setIdLibraryError] = useState(false);
	const [nameLibraryError, setNameLibraryError] = useState(false);
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
		setIdLibraryError(false);
		setNameLibraryError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);
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
		if(!idLibrary) {
			error = true;
			setIdLibraryError(true);
		} else {
			const libraryFound = await checkLibraryExists(idLibrary);
			if(libraryFound !== null) {
				error = true;
				setSignupError('¡La biblioteca ya existe! Prueba con otra Url.');
			}
		}
		if(!nameLibrary) {
			error = true;
			setNameLibraryError(true);
		}
		if(!address) {
			error = true;
			setAddressError(true);
		}
		if(!postalCode) {
			error = true;
			setPostalCodeError(true);
		}
		if(!city) {
			error = true;
			setCityError(true);
		}
		if(!province) {
			error = true;
			setProvinceError(true);
		}
		if(!error) {
			setSignupError('');

			const { success, error } = await adminSignup(name, lastname, email, password, idLibrary);
			if(!success) {
				let errorMessage = error;
				switch(error) {
					case 'auth/invalid-email':
						errorMessage = '¡El email no tiene el formato correcto! Revísalo.';
						break;
					case 'auth/email-already-in-use':
						errorMessage = '¡El email ya existe! Prueba con otro diferente.';
						break;
					case 'auth/weak-password':
						errorMessage = '¡La contraseña es muy débil! Prueba con otra diferente.';
						break;
				}
				setSignupError(errorMessage);
			} else {
				await librarySignup(idLibrary, nameLibrary, address, postalCode, city, province);
				handleReset();
				onSuccess();
			}
		}
	};

	const handleReset = (event) => {
		event && event.preventDefault();

		setName('');
		setLastname('');
		setEmail('');
		setPassword('');
		setIdLibrary('');
		setNameLibrary('');
		setAddress('');
		setPostalCode('');
		setCity('');
		setProvince('');

		setNameError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setIdLibraryError(false);
		setNameLibraryError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<form onSubmit={handleSubmit} className="signup">
			<h2>Datos del administrador</h2>
			<Input
				id="nameAdmin"
				label="Nombre"
				value={name}
				hasError={nameError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setName(value)}
				className="signup_field_half"
			/>
			<Input
				id="lastnameAdmin"
				label="Apellido"
				value={lastname}
				hasError={lastnameError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setLastname(value)}
				className="signup_field_half"
			/>
			<Input
				id="emailAdmin"
				label="Email"
				value={email}
				hasError={emailError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setEmail(value)}
				className="signup_field_full"
			/>
			<Input
				id="passwordAdmin"
				label="Contraseña"
				value={password}
				hasError={passwordError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setPassword(value)}
				className="signup_field_full"
				type="password"
			/>
			<h2>Datos de la biblioteca</h2>
			<Input
				id="nameLibrary"
				label="Nombre biblioteca"
				value={nameLibrary}
				hasError={nameLibraryError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setNameLibrary(value)}
				className="signup_field_full"
			/>
			<InputUrl
				id="idLibrary"
				label="URL biblioteca"
				value={idLibrary}
				hasError={idLibraryError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setIdLibrary(validateUrl(value))}
				className="signup_field_full"
			/>
			<Input
				id="addressLibrary"
				label="Dirección"
				value={address}
				hasError={addressError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setAddress(value)}
				className="signup_field_half"
			/>
			<Input
				id="postalCodeLibrary"
				label="Código postal"
				value={postalCode}
				hasError={postalCodeError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setPostalCode(value)}
				className="signup_field_half"
			/>
			<Input
				id="cityLibrary"
				label="Ciudad"
				value={city}
				hasError={cityError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setCity(value)}
				className="signup_field_half"
			/>
			<Input
				id="provinceLibrary"
				label="Provincia"
				value={province}
				hasError={provinceError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setProvince(value)}
				className="signup_field_half"
			/>

			{signupError && <p className="signup_error">{signupError}</p>}
			<Button className="button_transparent" onClick={handleReset}>Cancelar</Button>
			<Button>Enviar</Button>
		</form>
	);
};

export default SignupLibrary;