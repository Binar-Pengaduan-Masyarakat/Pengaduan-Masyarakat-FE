import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/Modal.css";

const ReportResultModal = ({ result, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Result Details</h5>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{result.resultContent}</p>
          <p>{new Date(result.resultDate).toLocaleString()}</p>
          {result.resultImage && (
            <img src={result.resultImage} alt="Result" className="img-fluid" />
          )}
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

export default ReportResultModal;
