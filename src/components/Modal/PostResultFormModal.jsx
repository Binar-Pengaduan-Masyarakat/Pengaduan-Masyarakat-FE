import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/PostResultFormModal.css";
import "/public/css/Modal.css";

const PostResultFormModal = ({ reportId, userId, onClose }) => {
  const [resultContent, setResultContent] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resultContent", resultContent);
      if (resultImage) {
        formData.append("resultImage", resultImage);
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportResults/${reportId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Result posted successfully!");
        onClose();
      } else {
        setError(data.message || "Error posting result");
      }
    } catch (err) {
      setError(err.message || "Failed to post result.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setResultImage(acceptedFiles[0]);
    }
  };

  const handleClose = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={handleClose}></div>
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Post Result</h5>
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label
                    htmlFor="resultContent"
                    style={{ marginBottom: "5px" }}
                  >
                    Result Content
                  </label>
                  <textarea
                    id="resultContent"
                    className="form-control"
                    value={resultContent}
                    onChange={(e) => setResultContent(e.target.value)}
                    required
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="resultImage" style={{ marginBottom: "5px" }}>
                    Result Image
                  </label>
                  <Dropzone
                    onDrop={handleDrop}
                    maxFiles={1}
                    accept="image/*"
                    onDropRejected={() => {
                      alert("Only image files are allowed.");
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} id="resultImage" />
                        <p style={{ marginBottom: "0" }}>
                          Drag & drop an image here, or click to select one (1
                          max)
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {resultImage && (
                    <div className="mt-2">
                      <strong>Selected File:</strong> {resultImage.name}
                    </div>
                  )}
                </div>
                <div className="submit-container">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                      backgroundColor: "#343a40",
                    }}
                  >
                    {loading ? "Posting..." : "Post Result"}
                  </button>
                </div>
                {error && (
                  <div className="error-message mt-2">Error: {error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostResultFormModal;
