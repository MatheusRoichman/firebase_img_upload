import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const storage: FirebaseStorage = getStorage(app);