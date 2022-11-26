import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
}

export async function registerUserWithEmailPassword({
  email,
  password,
  displayName,
}) {
  try {
    const response = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = response.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
}

export async function loginWithEmailPassword({ userEmail, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(FirebaseAuth, userEmail, password);
    return {
        ok: true,
        ...user
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
}

export async function logoutFirebase() {
  return await FirebaseAuth.signOut()
}