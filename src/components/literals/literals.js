const LITERALS = {
	'error-required-field': 'Campo obligatorio',

	'error-library-not-found': '¡La biblioteca no existe! Prueba de nuevo.',
	'error-library-not-on-your-city': '¡No puedes registrarte en esa biblioteca! No está en tu misma ciudad.',
	'error-library-exists': '¡La biblioteca ya existe! Prueba con otra Url.',

	'auth/invalid-email': '¡El email no tiene el formato correcto! Revísalo.',
	'auth/email-already-in-use': '¡El email ya existe! Prueba con otro diferente.',
	'auth/wrong-password': '¡Contraseña incorrecta! Vuelve a probar.',
	'auth/weak-password': '¡La contraseña es muy débil! Prueba con otra diferente.',
	'auth/user-not-found': '¡Usuario no encontrado! Vuelve a intentarlo.',
 };

 const getLiteral = (tag) => {
	return LITERALS[tag];
 }

 export default getLiteral;