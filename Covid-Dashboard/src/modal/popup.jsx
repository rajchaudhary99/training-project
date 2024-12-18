import React, { useEffect, useState } from "react";
import "./popup.css";
import { createPortal } from "react-dom";


const Modal = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown during this session
    const hasSeenModal = sessionStorage.getItem("hasSeenModal");

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setOpen(true);
        setShow(true);
      }, 5000); // Show the modal after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("hasSeenModal", true);
    }, 100);
  };

  const handleVisitNow = () => {
    window.open("https://about-rajvardhan.netlify.app/", "_blank");
    handleClose();
  };

  const handleVisitLater = () => {
    handleClose();
  };

  return createPortal(
    <div>
      <div
        className={`modal-overlay ${open ? "fade-in" : ""}`}
        style={{ display: show ? "flex" : "none" }}
      >
        <div className={`modal-content ${open ? "slide-in" : ""}`}>
        
          <h2 className="modal-heading">Explore My Portfolio!</h2>
          <p className="modal-para">
            Thank you for checking out this site! If you'd like to see more of
            my work and explore my projects and skills, please visit my 
              portfolio website.
          </p>

          <div className="modal-buttons">
            <button className="button-9" onClick={handleVisitNow}>
              Visit Now
            </button>
            <button className="button-91" onClick={handleVisitLater}>
             Visit Later
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
