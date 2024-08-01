/** @format */

import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/Modal.css";

const InvestigationDetailsModal = ({
  responseDate,
  institutionDetails,
  onClose,
}) => {
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!institutionDetails) {
    return null;
  }

  const formattedResponseDate = new Date(responseDate).toLocaleString();
  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-header">
          <h5 className="modal-title">Investigation Details</h5>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Responded by:</strong>{" "}
            {institutionDetails.name || "No details available"}
          </p>
          <p>
            <strong>Response Date:</strong> {formattedResponseDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestigationDetailsModal;
