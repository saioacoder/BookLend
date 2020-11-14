import { useState } from 'react';

import Input from '../input';
import Button from '../button';
import { userSignup } from '../../logic/user';

import './Signup.scss';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setSignupError('');

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
      // const { success, error } = await userSignup(name, email, password);
      // if(!success){
      //   setSignupError(error);
      // } else {
      //   setSignupSuccess(true);
      // }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <Input
        id="login_email"
        label="GENERIC_EMAIL"
        value={email}
        hasError={emailError}
        errorMessage="ERROR_REQUIRED"
        onChange={({target: { value }}) => setEmail(value)}
      />
      <Input
        id="login_password"
        label="GENERIC_PASSWORD"
        type="password"
        value={password}
        hasError={passwordError}
        errorMessage="ERROR_REQUIRED"
        onChange={({target: { value }}) => setPassword(value)}
      />
      {signupError && <p className="signupForm_error">{signupError}</p>}
      <Button>Enviar</Button>
    </form>
  );
};

export default Signup;