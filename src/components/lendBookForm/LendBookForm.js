import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../button';
import Input from '../input';
import getLiteral from '../literals';
import { getUserByEmail } from '../../logic/user';
import { updateBook } from '../../logic/library';

const LendBookForm = ({ idBook, bookTitle, onCancel, onSuccess }) => {

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [signupError, setSignupError] = useState('');

	const { idLibrary } = useSelector(state => state.library);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setEmailError(false);
		setSignupError('');

		if(!email) {
			setEmailError(true);
		} else {
			const userFound = await getUserByEmail(email);
			if(userFound === null) {
				setSignupError(getLiteral('error-user-not-found'));
			} else {
				const newBookData = {
					idUser: userFound.idUser,
					email: userFound.email,
					lendDate: Date.now(),
					status: 'lent'
				};
				const result = await updateBook(idLibrary, idBook, newBookData);
				if(result) {
				 	onSuccess();
				}
			}
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				id="title"
				label="Título del libro a prestar"
				value={bookTitle}
				className="wFull"
				disabled={true}
			/>
			<Input
				id="email"
				label="Email del usuario"
				value={email}
				hasError={emailError}
				errorMessage={getLiteral('error-required-field')}
				onChange={({target: { value }}) => setEmail(value)}
				className="wFull"
			/>

			{signupError && <p className="form_error">{signupError}</p>}

			<div className="actionButtons">
				<Button className="button_transparent" onClick={onCancel}>Cancelar</Button>
				<Button>Aceptar</Button>
			</div>
		</form>
	);
};

export default LendBookForm;