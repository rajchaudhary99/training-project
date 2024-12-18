import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import AuthModal from "../modal/Authmodal"; 

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const location = useLocation(); // Get the current location

  // If there's no user, show the modal to ask for sign in/signup
  if (!user && !showModal) {
    setRedirectTo(location.pathname); // Save the path the user tried to visit
    setShowModal(true); // Show the modal
  }

  // If there's a user, return the children
  if (user) {
    return children;
  }

  // Render the AuthModal when showModal is true
  return (
    <>
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        redirectTo={redirectTo} // Pass the redirectTo path to AuthModal
      />
    </>
  );
};

export default ProtectedRoute;
