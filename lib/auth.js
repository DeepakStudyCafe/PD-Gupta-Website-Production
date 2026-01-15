// lib/auth.js
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from './firebase';

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const isAdminEmail = (email) => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  return email === adminEmail;
};
