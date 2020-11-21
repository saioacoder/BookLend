import { signup, login, logout, registerAuthObserver } from '../services/auth';
import { addObjectWithId, getObjectById } from '../services/data';

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
		const user = await getObjectById('users', id);
		return { success: true, id, user };
	}
	return { success: false, error };
}

export function registerAuthStateChangeHandler(callback) {
	registerAuthObserver(callback);
}

export async function getUserById(id) {
	const user = await getObjectById('users', id);
	return { ...user, idUser: user.id };
}

export function userLogout() {
	logout();
}