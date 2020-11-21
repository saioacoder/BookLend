import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userLogin } from '../../logic/user';
import { setUser } from '../../redux/actions/userActions';
import Input from '../input';
import Button from '../button';
import getLiteral from '../literals';

import './Login.scss';

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
				dispatch(setUser({
					idUser: id,
					name: user.name,
					isAdmin: user.isAdmin,
					idLibrary: user.idLibrary
				}));
				handleReset();
				onSuccess();
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
		<form onSubmit={handleSubmit} className="signup">
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

			{loginError && <p className="signup_error">{loginError}</p>}

			<Button className="button_transparent" onClick={handleReset}>Cancelar</Button>
			<Button>Entrar</Button>
		</form>
	)
}

export default Login;