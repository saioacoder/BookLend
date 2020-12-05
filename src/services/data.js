import firebase from 'firebase/app';
import 'firebase/firestore';


export async function addObject(collection, obj) {
	try {
		const result = await firebase.firestore().collection(collection).add(obj);
		return result.id;
	} catch (error) {
		console.log("addObject Error:", error);
		return null;
	}
}


export async function addObjectWithId(collection, id, obj) {
	try {
		await firebase.firestore().collection(collection).doc(id).set(obj);
		return true;
	} catch (error) {
		console.log("addObjectWithId Error:", error);
		return false;
	}
}


export async function addObjectToSubcolecction(collection, idCollection, subcollection, obj) {
	try {
		const result = await firebase.firestore().collection(collection).doc(idCollection).collection(subcollection).add(obj);
		return result.id;
	} catch (error) {
		console.log("addObjectToSubcolecction Error:", error);
		return null;
	}
}


export async function addObjectToSubcollectionWithId(collection, idCollection, subcollection, id, obj) {
	try {
		await firebase.firestore().collection(collection).doc(idCollection).collection(subcollection).doc(id).set(obj);
		return true;
	} catch (error) {
		console.log("addObjectToSubcollectionWithId Error:", error);
		return false;
	}
}


// Se usa ??
export async function removeObjectWithId(collection, id) {
	try {
		await firebase.firestore().collection(collection).doc(id).delete();
		return true;
	} catch (error) {
		console.log("removeObjectWithId Error:", error);
		return null;
	}
}


export async function removeObjectFromSubcollectionWithId(collection, idCollection, subcollection, id) {
	try {
		await firebase.firestore().collection(collection).doc(idCollection).collection(subcollection).doc(id).delete();
		return true;
	} catch (error) {
		console.log("removeObjectFromSubcollectionWithId Error:", error);
		return false;
	}
}


export async function getObjectById(collection, id) {
	try {
		const doc = await firebase.firestore().collection(collection).doc(id).get();
		return doc.exists ? parseDocument(doc) : null;
	} catch (error) {
		//console.log("getObjectById Error: ", error);
		return null;
	}
}


export async function getObjectFromSubcollection(collection, idCollection, subcollection, orderByTerm, orderBy) {
	try {
		let allDocs;
		if(orderByTerm) {
			allDocs = await firebase.firestore().collection(collection).doc(idCollection).collection(subcollection).orderBy(orderByTerm, orderBy).get();
		} else {
			allDocs = await firebase.firestore().collection(collection).doc(idCollection).collection(subcollection).get();
		}
		return allDocs.docs.map(doc => parseDocument(doc));
	} catch (error) {
		console.log("getObjectFromSubcollectionById Error: ", error);
		return null;
	}
}


export async function getDataByConditions(collection, conditions) {
	try {
		let allDocs = firebase.firestore().collection(collection);
		conditions.forEach(({ field, condition, value }) => {
		 	allDocs = allDocs.where(field, condition, value);
		});
		allDocs = await allDocs.get();
		if(allDocs.docs !== undefined && allDocs.docs.length > 0){
			return {
				result: allDocs.docs.map(doc => parseDocument(doc)),
				error: false
			}
		} else {
			return {
				result: null,
				error: false
			};
		}
	} catch (error) {
		console.log("getDataByConditions Error: ", error);
		return {
			result: null,
			error: true
		};;
	}
}


// Se usa ??
export async function getObjectFromSubcollectionById(collection, idCollection, subcollection, id) {
	try {
		const doc = await firebase.firestore().collection(collection).doc(idCollection).collection(subcollection).doc(id).get();
		return doc.exists ? parseDocument(doc) : null;
	} catch (error) {
		console.log("getObjectFromSubcollectionById Error: ", error);
		return null;
	}
}


function parseDocument(doc) {
	return {
		id: doc.id,
		...doc.data()
	}
}


// Se usa??
export async function changeObjectById(collection, id, change) {
	try {
		await firebase.firestore().collection(collection).doc(id).update(change);
		return true;
	} catch (error) {
		console.log("changeObjectById Error: ", error);
		return false;
	}
}


// Se usa??
export async function getAllData(collection) {
	try {
		const allDocs = await firebase.firestore().collection(collection).get();
    	return allDocs.docs.map(doc => parseDocument(doc));
	} catch (error) {
		console.log("getAllData Error:", error);
		return null;
	}
}