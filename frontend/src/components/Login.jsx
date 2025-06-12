import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const formatFirebaseError = (code) => {
  switch (code) {
    case "auth/invalid-credential":
        return "Enter correct credentials Or Signup ";
    case "auth/wrong-password":
        return "Invalid email or password.";
    case "auth/user-not-found":
        return "User not found.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "An unexpected error occurred.";
  }
};

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setEmail("");
    setPassword("");
    setAuthError("");
  };

const handleEmailAuth = async (e) => {
  e.preventDefault();
  setAuthError("");

  try {
    let userCredential;
    let isNewUser = false;

    if (isSignUp) {
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters.");
        return;
      }
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      isNewUser = true;
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }

    const user = userCredential.user;
    const tokenID = await user.getIdToken();

    localStorage.setItem("accessToken", tokenID);
    localStorage.setItem("displayName", user.displayName || user.email);

    if (isNewUser) {
      await axios.post(
        "http://localhost:8000/api/auth/reg",
        { token: tokenID },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // 👇 Go to registration flow, not /write
      navigate("/register");
    } else {
      // ✅ For existing users
      navigate("/write");
    }
  } catch (error) {
    console.error("Email Auth Error:", error.code, error.message);
    setAuthError(formatFirebaseError(error.code));
  }
};

 
const handleGoogleLogin = async () => {
  setAuthError("");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const additionalInfo = getAdditionalUserInfo(result);
    const isNewUser = additionalInfo?.isNewUser;

    const tokenID = await user.getIdToken();

    localStorage.setItem("accessToken", tokenID);
    localStorage.setItem("displayName", user.displayName || user.email);

    if (isNewUser) {
      await axios.post(
        "http://localhost:8000/api/auth/reg",
        { token: tokenID },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // 👇 Redirect new Google users to /register
      navigate("/register");
    } else {
      navigate("/write");
    }
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    setAuthError(formatFirebaseError(error.code));
  }
};


  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>

      <form onSubmit={handleEmailAuth}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {authError && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {authError}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={toggleForm}
          style={{
            marginLeft: "5px",
            color: "#007BFF",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
