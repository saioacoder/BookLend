import firebase from 'firebase/app';
import 'firebase/auth';

export async function signup(email, password) {
	try {
		const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
		return {
			success: true,
			id: result.user.uid
		};

	} catch (error) {
		console.log("Signup Error:", error);
		return {
			success: false,
			error: error.code
		};
	}
}

export async function login(email, password) {
	try {
		const result = await firebase.auth().signInWithEmailAndPassword(email, password);
		return {
			success: true,
			id: result.user.uid,
		};
	} catch (error) {
		console.log("Signup Error:", error);
		return {
			success: false,
			error: error.code
		};
	}
}

export function logout() {
	try {
		firebase.auth().signOut();
	} catch(error) {
		console.log("logout Error:", error)
	}
}

export function registerAuthObserver(callback) {
	firebase.auth().onAuthStateChanged(callback);
}
