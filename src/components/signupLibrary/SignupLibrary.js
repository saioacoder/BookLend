import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../input';
import InputUrl from '../inputUrl';
import Button from '../button';
import getLiteral from '../literals';
import { adminSignup } from '../../logic/user';
import { librarySignup, getLibraryById, validateUrl } from '../../logic/library';
import { setLibrary } from '../../redux/actions/libraryActions';
import { setUser } from '../../redux/actions/userActions';

const SignupLibrary = ({ isModalClosed, onCancel, onSuccess }) => {
	const dispatch = useDispatch();

	const [nameUser, setNameUser] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [idLibrary, setIdLibrary] = useState('');
	const [nameLibrary, setNameLibrary] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [categories, setCategories] = useState('');

	const [nameUserError, setNameUserError] = useState(false);
	const [lastnameError, setLastnameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [idLibraryError, setIdLibraryError] = useState(false);
	const [nameLibraryError, setNameLibraryError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [postalCodeError, setPostalCodeError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [provinceError, setProvinceError] = useState(false);
	const [categoriesError, setCategoriesError] = useState(false);
	const [signupError, setSignupError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		setNameUserError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setIdLibraryError(false);
		setNameLibraryError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);
		setCategoriesError(false);
		setSignupError('');

		let error = false;
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
		if(!idLibrary) {
			error = true;
			setIdLibraryError(true);
		} else {
			const libraryFound = await getLibraryById(idLibrary);
			if(libraryFound !== null) {
				error = true;
				setSignupError(getLiteral('error-library-exists'));
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
		if(!categories) {
			error = true;
			setCategoriesError(true);
		}
		if(!error) {
			setSignupError('');

			const { success, error, id, user } = await adminSignup(nameUser, lastname, email, password, idLibrary);
			if(!success) {
				setSignupError(getLiteral(error));
			} else {
				const splitCategories = categories.split(',');
				await librarySignup(idLibrary, nameLibrary, address, postalCode, city, province, splitCategories);
				dispatch(setUser({
					idUser: id,
					nameUser: nameUser,
					isAdmin: user.isAdmin
				}));
				dispatch(setLibrary({
					idLibrary: idLibrary,
					nameLibrary: nameLibrary,
					categories: splitCategories
				}));
				handleReset();
				onSuccess();
			}
		}
	};

	const handleReset = (e) => {
		e && e.preventDefault();

		setNameUser('');
		setLastname('');
		setEmail('');
		setPassword('');
		setIdLibrary('');
		setNameLibrary('');
		setAddress('');
		setPostalCode('');
		setCity('');
		setProvince('');
		setCategories('');

		setNameUserError(false);
		setLastnameError(false);
		setEmailError(false);
		setPasswordError(false);
		setIdLibraryError(false);
		setNameLibraryError(false);
		setAddressError(false);
		setPostalCodeError(false);
		setCityError(false);
		setProvinceError(false);
		setCategoriesError(false);
		setSignupError('');

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<form onSubmit={handleSubmit} className="form signup">
			<p className="form_description">Rellena los datos para dar de alta una biblioteca y poder empezar a ofrecer los servicios de préstamo a tus usuarios.</p>
			<h2>Datos del administrador</h2>
			<Input
				id="nameAdmin"
				label="Nombre"
				value={nameUser}
				hasError={nameUserError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setNameUser(value)}
				className="wHalf"
			/>
			<Input
				id="lastnameAdmin"
				label="Apellido"
				value={lastname}
				hasError={lastnameError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setLastname(value)}
				className="wHalf"
			/>
			<Input
				id="emailAdmin"
				label="Email"
				value={email}
				hasError={emailError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setEmail(value)}
				className="wFull"
			/>
			<Input
				id="passwordAdmin"
				label="Contraseña"
				value={password}
				hasError={passwordError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setPassword(value)}
				className="wFull"
				type="password"
			/>
			<h2>Datos de la biblioteca</h2>
			<Input
				id="nameLibrary"
				label="Nombre biblioteca"
				value={nameLibrary}
				hasError={nameLibraryError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setNameLibrary(value)}
				className="wFull"
			/>
			<InputUrl
				id="idLibrary"
				label="URL biblioteca"
				value={idLibrary}
				hasError={idLibraryError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setIdLibrary(validateUrl(value))}
				className="wFull"
				url="https://www.booklet.com/"
			/>
			<Input
				id="addressLibrary"
				label="Dirección"
				value={address}
				hasError={addressError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setAddress(value)}
				className="wHalf"
			/>
			<Input
				id="postalCodeLibrary"
				label="Código postal"
				value={postalCode}
				hasError={postalCodeError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setPostalCode(value)}
				className="wHalf"
			/>
			<Input
				id="cityLibrary"
				label="Ciudad"
				value={city}
				hasError={cityError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setCity(value)}
				className="wHalf"
			/>
			<Input
				id="provinceLibrary"
				label="Provincia"
				value={province}
				hasError={provinceError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setProvince(value)}
				className="wHalf"
			/>
			<Input
				id="categories"
				label="Categorías"
				value={categories}
				hasError={categoriesError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setCategories(value)}
				className="wFull"
			/>

			{signupError && <p className="form_error">{signupError}</p>}

			<div className="actionButtons">
				<Button className="button_transparent" onClick={handleReset}>Cancelar</Button>
				<Button>Enviar</Button>
			</div>
		</form>
	);
};

export default SignupLibrary;