
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hireox-2a852.firebaseapp.com",
  projectId: "hireox-2a852",
  storageBucket: "hireox-2a852.firebasestorage.app",
  messagingSenderId: "1055372020034",
  appId: "1:1055372020034:web:f5c5f71a318cfda26760db",
  measurementId: "G-CE7PYP2Y3H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, analytics };