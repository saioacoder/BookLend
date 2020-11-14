import firebase from 'firebase/app';
import 'firebase/firestore';

export async function addObjectWithId(collection, id, obj) {
  try {
    await firebase.firestore().collection(collection).doc(id).set(obj);
    return true;
  } catch (error) {
    console.log("addObjectWithId -> error", error);
    return false;
  }
}

export async function addObject(collection, obj) {
  try {
    const result = await firebase.firestore().collection(collection).add(obj);
    return result.id;
  } catch (error) {
    console.log("addObject -> error", error);
    return null;
  }
}