import React, { useState, useContext } from "react";
import Dropzone from "react-dropzone";
import { UserContext } from "../UserContext";
import "/public/css/PostResultFormModal.css";
import "/public/css/Modal.css";

const PostResultFormModal = ({ reportId, onClose, setReload }) => {
  const [resultContent, setResultContent] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("resultContent", resultContent);
    formData.append("userId", userId);
    formData.append("reportId", reportId);
    if (resultImage) {
      formData.append("resultImage", resultImage);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportResults`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.message === "Data Failed to be Added") {
          setError("Failed to post result: " + data.message);
        } else {
          alert("Result posted successfully!");
          setReload((prev) => !prev); // Trigger reload
          onClose();
        }
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
                className="btn-close"
                onClick={onClose}
              ></button>
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
                  <Dropzone
                    onDrop={handleDrop}
                    maxFiles={1}
                    maxFilesize={2}
                    accept="image/*"
                    onDropRejected={() => {
                      alert("Only image files are allowed.");
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p style={{ marginBottom: "0" }}>
                          Drag & drop an image here, or click to select one (1MB
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
                    style={{ backgroundColor: "#343a40", borderStyle: "none" }}
                    disabled={loading}
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
