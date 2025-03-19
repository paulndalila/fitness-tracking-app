import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA5f2JTl3FO89L14uUyPs2r7SSw1asfcs",
  authDomain: "fitness-app-87031.firebaseapp.com",
  projectId: "fitness-app-87031",
  storageBucket: "fitness-app-87031.appspot.com",
  messagingSenderId: "1038081644719",
  appId: "fitness-app-87031",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable authentication persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export auth functions
export { auth, createUserWithEmailAndPassword };
