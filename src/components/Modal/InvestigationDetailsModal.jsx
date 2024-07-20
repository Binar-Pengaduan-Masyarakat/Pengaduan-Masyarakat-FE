import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/Modal.css";

const InvestigationDetailsModal = ({
  responseDate,
  institutionDetails,
  onClose,
}) => {
  if (!institutionDetails) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Investigation Details</h5>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Details:</strong>{" "}
            {institutionDetails.name || "No details available"}
          </p>
          <p>
            <strong>Date:</strong> {new Date(responseDate).toLocaleString()}
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestigationDetailsModal;
