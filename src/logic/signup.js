import { signup } from '../services/auth';
import { addObjectWithId } from '../services/data';

export async function userSignup(name, lastname, email, password, birthdate, address, postalCode, city, province, idLibrary) {
	const { success, error, id } = await signup(email, password);
	const warningNum = 0;
	const isAdmin = false;
	if(success) {
		await addObjectWithId('users', id, { name, lastname, email, birthdate, address, postalCode, city, province, warningNum, idLibrary, isAdmin });
		return { success: true };
	}
	return { success: false, error };
}

export async function adminSignup(name, lastname, email, password, idLibrary) {
	const { success, error, id } = await signup(email, password);
	const isAdmin = true;
	if(success) {
		await addObjectWithId('users', id, { name, lastname, email, idLibrary, isAdmin });
		return { success: true };
	}
	return { success: false, error };
}

export async function librarySignup(idLibrary, name, address, postalCode, city, province) {
	return await addObjectWithId('libraries', idLibrary, { name, address, postalCode, city, province });
}