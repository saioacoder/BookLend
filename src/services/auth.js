import firebase from 'firebase/app';
import 'firebase/auth';

export async function signup(email, password) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return { success: true, id: result.user.uid };

  } catch (error) {
    console.log("signup -> error", error);
    return { success: false, error: error.code };
  }
}

// 1. Add auth login function
//firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
