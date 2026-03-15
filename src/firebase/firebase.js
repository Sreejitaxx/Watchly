import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDYtQtA_X9Km6QeQ1ssv35xd1mONVJXa3E",
  authDomain: "watchly-13cd9.firebaseapp.com",
  projectId: "watchly-13cd9",
  storageBucket: "watchly-13cd9.firebasestorage.app",
  messagingSenderId: "764620344016",
  appId: "1:764620344016:web:548f5b7ad39a865163acd5",
  measurementId: "G-DP0PYL99C3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);