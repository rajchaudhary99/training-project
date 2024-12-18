import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './LogOut.css';

const LogOut = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });


    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
    {isLoggedIn && (
      <div className="logout-botton">
        <div className="tooltip">
          <i
            onClick={handleLogout}
            className="fa fa-sign-out"
            aria-hidden="true"
          ></i>
          <span className="tooltip-text">Log Out</span>
        </div>
      </div>
    )}
  </>

  );
};

export default LogOut;
