import firebase from 'firebase/app';
import 'firebase/firestore';

export async function addObjectWithId(collection, id, obj) {
	try {
		await firebase.firestore().collection(collection).doc(id).set(obj);
		return true;
	} catch (error) {
		console.log("addObjectWithId Error:", error);
		return false;
	}
}

export async function addObject(collection, obj) {
	try {
		const result = await firebase.firestore().collection(collection).add(obj);
		return result.id;
	} catch (error) {
		console.log("addObject Error:", error);
		return null;
	}
}

export async function removeObjectWithId(collection, id) {
	try {
		await firebase.firestore().collection(collection).doc(id).remove();
		return true;
	} catch (error) {
		console.log("removeObjectWithId Error:", error);
		return null;
	}
}

export async function getObjectById(collection, id) {
	try {
		const doc = await firebase.firestore().collection(collection).doc(id).get();
		return doc.exists ? doc.data() : null;
	} catch (error) {
		console.log("getObjectById Error: ", error);
		return null;
	}
}

// Se usa??
export async function getAllData(collection) {
	try {
		const allDocs = await firebase.firestore().collection(collection).get();
    	return allDocs.docs.map(doc => doc.data());
	} catch (error) {
		console.log("getAllData Error:", error);
		return null;
	}
}

// Se usa???
export async function getDataByCondition(collection, field, condition, value) {
	try {
		const allDocs = await firebase.firestore().collection(collection).where(field, condition, value).get();
		return allDocs.docs.map(doc => doc.data());
	} catch (error) {
		console.log("getDataByCondition Error: ", error);
		return null;
	}
}