import { useState, useEffect } from 'react';

import Input from '../input';
import Button from '../button';
import { userSignup } from '../../logic/signup';
import { checkLibraryExists } from '../../logic/library';

import './SignupUser.scss';

const SignupUser = ({ isModalClosed, onCancel, onSuccess }) => {
	const [idLibrary, setIdLibrary] = useState('');
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');

	const [idLibraryError, setIdLibraryError] = useState(false);
	const [nameError, setNameError] = useState(false);
	const [lastnameError, setLastnameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [postalCodeError, setPostalCodeError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [provinceError, setProvinceError] = useState(false);
	const [signupError, setSignupError] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIdLibraryError(false);
		setNameError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);
		setSignupError('');

		let error = false;
		if(!idLibrary) {
			error = true;
			setIdLibraryError(true);
		} else {
			const libraryFound = await checkLibraryExists(idLibrary);
			if(libraryFound === null) {
				error = true;
				setSignupError('¡La biblioteca no existe! Prueba de nuevo.');
			}
		}
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
		} else {
			const libraryFound = await checkLibraryExists(idLibrary);
			if(libraryFound !== null && libraryFound.city !== city) {
				error = true;
				setSignupError('¡No puedes registrarte en esa biblioteca! No está en tu misma ciudad.');
			}
		}
		if(!province) {
			error = true;
			setProvinceError(true);
		}
		if(!error) {
			setSignupError('');

			const { success, error } = await userSignup(name, lastname, email, password, address, postalCode, city, province, idLibrary);
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
				handleReset();
				onSuccess();
			}
		}
	}

	const handleReset = (event) => {
		event && event.preventDefault();

		setName('');
		setLastname('');
		setEmail('');
		setPassword('');
		setAddress('');
		setPostalCode('');
		setCity('');
		setProvince('');
		setIdLibrary('');

		setNameError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);
		setIdLibraryError(false);

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<form onSubmit={handleSubmit} className="signup">
			<Input
				id="idLibraryUser"
				label="Id biblioteca"
				value={idLibrary}
				hasError={idLibraryError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setIdLibrary(value)}
				className="signup_field_full"
			/>
			<Input
				id="nameUser"
				label="Nombre"
				value={name}
				hasError={nameError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setName(value)}
				className="signup_field_half"
			/>
			<Input
				id="lastnameUser"
				label="Apellido"
				value={lastname}
				hasError={lastnameError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setLastname(value)}
				className="signup_field_half"
			/>
			<Input
				id="emailUser"
				label="Email"
				value={email}
				hasError={emailError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setEmail(value)}
				className="signup_field_full"
			/>
			<Input
				id="passwordUser"
				label="Contraseña"
				value={password}
				hasError={passwordError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setPassword(value)}
				className="signup_field_full"
				type="password"
			/>
			<Input
				id="addressUser"
				label="Dirección"
				value={address}
				hasError={addressError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setAddress(value)}
				className="signup_field_half"
			/>
			<Input
				id="postalCodeUser"
				label="Código postal"
				value={postalCode}
				hasError={postalCodeError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setPostalCode(value)}
				className="signup_field_half"
			/>
			<Input
				id="cityUser"
				label="Ciudad"
				value={city}
				hasError={cityError}
				errorMessage="Campo obligatorio"
				onChange={({target: { value }}) => setCity(value)}
				className="signup_field_half"
			/>
			<Input
				id="provinceUser"
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

export default SignupUser;