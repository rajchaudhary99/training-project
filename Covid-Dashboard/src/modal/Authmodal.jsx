import React, { useState } from "react";
import ReactDOM from "react-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Authmodal.css"; // Styling for the modal

const AuthModal = ({ isOpen, onClose, redirectTo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  if (!isOpen) return null; // Don't render the modal if isOpen is false

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
      onClose(); // Close the modal on success
      if (redirectTo) {
        navigate(redirectTo); // Redirect to the page the user was trying to access
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signed up successfully!");
      onClose(); // Close the modal on success
      if (redirectTo) {
        navigate(redirectTo); // Redirect to the page the user was trying to access
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert("Signed in with Google!");
      onClose();
      if (redirectTo) {
        navigate(redirectTo); 
      }
    } catch (error) {
      alert(error.message);
    }
  };
 

  return ReactDOM.createPortal(
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal-input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal-input-field"
          />
          <button type="submit" className="modal-submit-button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
        <div className="google">
        <i className="fa-brands fa-google"></i>
        <button onClick={handleGoogleSignIn} className="google-signin-button">
         Sign in with Google
        </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

// Main component where you manage the modal visibility
const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/users"); // Adjust the path you want to redirect to after login/signup

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="auth-outer-container">
    <h1 className="auth-heading">Welcome to Our Platform</h1>
    <p className="auth-message">
      Access premium content, exclusive features, and more! Sign in or sign up to get started.
    </p>
    <button onClick={handleOpenModal} className="open-close-modal-button">Sign In / Sign Up</button>
  
    <AuthModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      redirectTo={redirectPath} // Pass the redirect path as prop
    />
  </div>
  
  );
};

export default MainPage;
