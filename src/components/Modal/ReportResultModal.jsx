import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalImage from "react-modal-image";
import "/public/css/Modal.css";

const ReportResultModal = ({ result, onClose }) => {
  const [userName, setUserName] = useState("");
  const [resultImage, setResultImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${result.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserName(data.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchResultImage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/reportResults/${
            result.resultImage
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch result image");
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setResultImage(imageUrl);
      } catch (error) {
        console.error("Error fetching result image:", error);
      }
    };

    if (result.userId) {
      fetchUserData();
    }
    if (result.resultImage) {
      fetchResultImage();
    }
  }, [result]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
          <p>
            <strong>Responded By:</strong> {userName || "Loading..."}
          </p>
          <p>
            <strong>Content:</strong> {result.resultContent}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(result.resultDate).toLocaleString()}
          </p>
          {resultImage ? (
            <ModalImage
              small={resultImage}
              large={resultImage}
              alt="Result"
              className="img-fluid"
              showRotate={false}
              hideDownload={true}
              styles={{ borderRadius: "5px" }}
            />
          ) : (
            <div className="placeholder-image">
              <p>No image available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportResultModal;
