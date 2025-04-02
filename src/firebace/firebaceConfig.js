import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInAnonymously, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA94G9XZSc2F-1LkdKnn48xD7RlIEeVx04",
  authDomain: "unsplash-2e150.firebaseapp.com",
  projectId: "unsplash-2e150",
  storageBucket: "unsplash-2e150.appspot.com",
  messagingSenderId: "745257135693",
  appId: "1:745257135693:web:30518186af12f5d5023604",
  measurementId: "G-J9B87RTB12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
const signInAsGuest = () => signInAnonymously(auth);
const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
const logout = () => signOut(auth);

export { auth, db, storage, signInWithGoogle, signInAsGuest, signUpWithEmail, signInWithEmail, logout };
export default app;
