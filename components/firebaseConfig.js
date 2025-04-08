import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  firebase_apiKey,
  firebase_authDomain,
  firebase_projectId,
  firebase_storageBucket,
  firebase_messagingSenderId,
  firebase_appId,
} from "@env";

// Firebase configuration
const firebaseConfig = {
  apiKey: firebase_apiKey,
  authDomain: firebase_authDomain,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_messagingSenderId,
  appId: firebase_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable authentication persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export auth functions
export { auth, createUserWithEmailAndPassword };
