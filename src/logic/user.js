import { signup } from '../services/auth';
import { addObjectWithId } from '../services/data';

export async function userSignup(name, email, password) {
  const { success, id, error } = await signup(email, password);
  if(success) {
    await addObjectWithId('profiles', id, { name, email });
    return { success: true };
  }
  return { success: false, error };
}