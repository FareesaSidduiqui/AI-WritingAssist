// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Import Auth

const firebaseConfig = {
  apiKey: "AIzaSyDjHuovxEybcpEBAsTruT4fXBBO_6CpPFM",
  authDomain: "ai-writing-assistant-471c6.firebaseapp.com",
  projectId: "ai-writing-assistant-471c6",
  storageBucket: "ai-writing-assistant-471c6.appspot.com",
  messagingSenderId: "1040634520980",
  appId: "1:1040634520980:web:6ad478dcb9410851ea5b81",
  measurementId: "G-3DFVS7F87X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

// 🔽 Force popup to always ask account selection
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// ✅ Export both app and auth so you can use them in components
export { app, auth , googleProvider };
