import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA94G9XZSc2F-1LkdKnn48xD7RlIEeVx04",
  authDomain: "unsplash-2e150.firebaseapp.com",
  projectId: "unsplash-2e150",
  storageBucket: "unsplash-2e150.appspot.com",
  messagingSenderId: "745257135693",
  appId: "1:745257135693:web:30518186af12f5d5023604",
  measurementId: "G-J9B87RTB12",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// ✅ GOOGLE SIGN-IN
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in:", result.user);
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
  }
};

// ✅ ANONYMOUS SIGN-IN
const signInAsGuest = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log("User signed in as guest:", result.user);
  } catch (error) {
    console.error("Error during anonymous sign-in:", error.message);
  }
};

// ✅ EMAIL SIGN-UP
const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error during email sign-up:", error.message);
  }
};

// ✅ EMAIL SIGN-IN
const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error("Error during email sign-in:", error.message);
  }
};

// ✅ SIGN OUT
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error during sign out:", error.message);
  }
};

// ✅ CHECK AUTH STATE
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user is signed in");
  }
});

// ✅ FIRESTORE TEST FUNCTION
const checkFirestoreAccess = async (userId, postId) => {
  if (!userId || !postId) {
    console.warn("User ID and Post ID are required.");
    return;
  }
  try {
    const q = query(
      collection(db, "likes"),
      where("userId", "==", userId),
      where("postId", "==", postId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log("Like exists:", querySnapshot.docs.map(doc => doc.data()));
    } else {
      console.log("Like does not exist");
    }
  } catch (error) {
    console.error("Firestore query error:", error.message);
  }
};

export { auth, db, storage, signInWithGoogle, signInAsGuest, signUpWithEmail, signInWithEmail, logout, checkFirestoreAccess };
export default app;
