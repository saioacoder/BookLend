import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../button';
import getLiteral from '../literals';
import Input from '../input';

import { getLibraryById } from '../../logic/library';
import { userLogin } from '../../logic/user';
import { setLibrary } from '../../redux/actions/libraryActions';
import { setUser } from '../../redux/actions/userActions';

const Login = ({ isModalClosed, onCancel, onSuccess }) => {

	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [loginError, setLoginError] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		setEmailError(false);
		setPasswordError(false);

		let error = false;
		if(!email) {
			error = true;
			setEmailError(true);
		}
		if(!password) {
			error = true;
			setPasswordError(true);
		}
		if(!error) {
			setLoginError('');
			const { success, error, id, user } = await userLogin(email, password);
			if(!success) {
				setLoginError(getLiteral(error));
			} else {
				const libraryFound = await getLibraryById(user.idLibrary);
				if(libraryFound !== null) {
					dispatch(setUser({
						idUser: id,
						nameUser: user.nameUser,
						isAdmin: user.isAdmin,
						idLibrary: user.idLibrary,
						nameLibrary: libraryFound.nameLibrary,
						categories: libraryFound.categories
					}));
					dispatch(setLibrary({
						idLibrary: user.idLibrary,
						nameLibrary: libraryFound.nameLibrary,
						categories: libraryFound.categories
					}));
					handleReset();
					onSuccess();
				}
			}
		}
	};

	const handleReset = (event) => {
		event && event.preventDefault();

		setEmail('');
		setPassword('');
		setEmailError(false);
		setPasswordError(false);
		setLoginError('');

		onCancel();
	};

	useEffect(() => {
		if(!isModalClosed)
			handleReset();
	});

	return (
		<form onSubmit={handleSubmit} className="form">
			<p className="form_description">Rellena los datos para poder acceder a tu cuenta, ya seas usuario o administrador de una biblioteca.</p>
			<Input
				id="emailUserLogin"
				label="Email"
				value={email}
				hasError={emailError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setEmail(value)}
				className="wFull"
			/>
			<Input
				id="passwordUserLogin"
				label="Contraseña"
				value={password}
				hasError={passwordError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setPassword(value)}
				className="wFull"
				type="password"
			/>

			{loginError && <p className="form_error">{loginError}</p>}

			<div className="actionButtons">
				<Button className="button_transparent" onClick={handleReset}>Cancelar</Button>
				<Button>Entrar</Button>
			</div>
		</form>
	)

};

export default Login;