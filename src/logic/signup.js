import { signup, login } from '../services/auth';
import { addObjectWithId } from '../services/data';

export async function userSignup(name, lastname, email, password, address, postalCode, city, province, idLibrary) {
	const { success, error, id } = await signup(email, password);
	const warningNum = 0;
	const isAdmin = false;
	if(success) {
		await addObjectWithId('users', id, { name, lastname, email, address, postalCode, city, province, warningNum, idLibrary, isAdmin });
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

export async function librarySignup(idLibrary, name, address, postalCode, city, province, categories) {
	return await addObjectWithId('libraries', idLibrary, { name, address, postalCode, city, province, categories });
}

export async function userLogin(email, password) {
	const { success, error, id } = await login(email, password);
	if(success) {

		return { success: true };
	}
	return { success: false, error };
}