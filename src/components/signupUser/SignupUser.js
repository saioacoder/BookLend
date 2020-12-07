import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../input';
import Button from '../button';
import getLiteral from '../literals';
import { userSignup } from '../../logic/user';
import { getLibraryById } from '../../logic/library';
import { setLibrary } from '../../redux/actions/libraryActions';
import { setUser } from '../../redux/actions/userActions';

const SignupUser = ({ isModalClosed, onCancel, onSuccess }) => {
	const dispatch = useDispatch();

	const [idLibrary, setIdLibrary] = useState('');
	const [nameLibrary, setNameLibrary] = useState('');
	const [categories, setCategories] = useState([]);
	const [nameUser, setNameUser] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');

	const [idLibraryError, setIdLibraryError] = useState(false);
	const [nameUserError, setNameUserError] = useState(false);
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
		setNameUserError(false);
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
			const libraryFound = await getLibraryById(idLibrary);
			if(libraryFound === null) {
				error = true;
				setSignupError(getLiteral('error-library-not-found'));
			}
		}
		if(!nameUser) {
			error = true;
			setNameUserError(true);
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
			const libraryFound = await getLibraryById(idLibrary);
			if(libraryFound !== null && libraryFound.city !== city) {
				error = true;
				setSignupError(getLiteral('error-library-not-on-your-city'));
			} else {
				setNameLibrary(libraryFound.nameLibrary);
				setCategories(libraryFound.categories);
			}
		}
		if(!province) {
			error = true;
			setProvinceError(true);
		}
		if(!error) {
			setSignupError('');

			const { success, error, id, user } = await userSignup(nameUser, lastname, email, password, address, postalCode, city, province, idLibrary);
			if(!success) {
				setSignupError(getLiteral(error));
			} else {
				dispatch(setUser({
					idUser: id,
					nameUser,
					isAdmin: user.isAdmin
				}));
				dispatch(setLibrary({
					idLibrary: user.idLibrary,
					nameLibrary,
					categories
				}));
				handleReset();
				onSuccess();
			}
		}
	}

	const handleReset = (e) => {
		e && e.preventDefault();

		setNameUser('');
		setLastname('');
		setEmail('');
		setPassword('');
		setAddress('');
		setPostalCode('');
		setCity('');
		setProvince('');
		setIdLibrary('');

		setNameUserError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);
		setIdLibraryError(false);
		setSignupError('');

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<form onSubmit={handleSubmit} className="form">
			<p className="form_description">Rellena los datos para registrarte y poder acceder a la biblioteca de tu ciudad.</p>
			<Input
				id="idLibraryUser"
				label="Id biblioteca"
				value={idLibrary}
				hasError={idLibraryError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setIdLibrary(value)}
				className="wFull"
			/>
			<Input
				id="nameUser"
				label="Nombre"
				value={nameUser}
				hasError={nameUserError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setNameUser(value)}
				className="wHalf"
			/>
			<Input
				id="lastnameUser"
				label="Apellido"
				value={lastname}
				hasError={lastnameError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setLastname(value)}
				className="wHalf"
			/>
			<Input
				id="emailUser"
				label="Email"
				value={email}
				hasError={emailError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setEmail(value)}
				className="wFull"
				type="email"
			/>
			<Input
				id="passwordUser"
				label="Contraseña"
				value={password}
				hasError={passwordError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setPassword(value)}
				className="wFull"
				type="password"
			/>
			<Input
				id="addressUser"
				label="Dirección"
				value={address}
				hasError={addressError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setAddress(value)}
				className="wHalf"
			/>
			<Input
				id="postalCodeUser"
				label="Código postal"
				value={postalCode}
				hasError={postalCodeError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setPostalCode(value)}
				className="wHalf"
			/>
			<Input
				id="cityUser"
				label="Ciudad"
				value={city}
				hasError={cityError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setCity(value)}
				className="wHalf"
			/>
			<Input
				id="provinceUser"
				label="Provincia"
				value={province}
				hasError={provinceError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setProvince(value)}
				className="wHalf"
			/>

			{signupError && <p className="form_error">{signupError}</p>}

			<div className="actionButtons">
				<Button className="button_transparent" onClick={handleReset}>Cancelar</Button>
				<Button>Enviar</Button>
			</div>
		</form>
	);
};

export default SignupUser;