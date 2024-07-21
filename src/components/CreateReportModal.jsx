import React, { useState, useEffect, useContext } from "react";
import Dropzone from "react-dropzone";
import "/public/css/CreateReportModal.css";
import "/public/css/Modal.css";

const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser);

const CreateReportModal = ({ onClose, onReportCreated }) => {
  const [categories, setCategories] = useState([]);
  const [reportContent, setReportContent] = useState("");
  const [reportImage, setReportImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = storedUser.id;
  console.log(userId);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://backend.pengaduanmasyarakat.blog/api/categories`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("reportContent", reportContent);
    formData.append("categoryId", categoryId);
    formData.append("userId", userId);
    formData.append("district", district);
    formData.append("subdistrict", subdistrict);
    formData.append("address", address);
    if (reportImage) {
      formData.append("reportImage", reportImage);
    }

    try {
      const response = await fetch(
        `https://backend.pengaduanmasyarakat.blog/api/reports`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create report");
      }

      setTimeout(() => {
        setLoading(false);
        onReportCreated();
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error creating report:", error);
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setReportImage(file);
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
              <h5 className="modal-title">Create Report</h5>
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
                    htmlFor="reportContent"
                    style={{ marginBottom: "5px" }}
                  >
                    Report Content
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="reportContent"
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                    maxLength="255"
                    required
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="categoryId" style={{ marginBottom: "5px" }}>
                    Report Category
                  </label>
                  <select
                    className="form-control"
                    id="categoryId"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading categories...</option>
                    )}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="district" style={{ marginBottom: "5px" }}>
                    District
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    maxLength="255"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="subdistrict" style={{ marginBottom: "5px" }}>
                    Subdistrict
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subdistrict"
                    value={subdistrict}
                    onChange={(e) => setSubdistrict(e.target.value)}
                    maxLength="255"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="address" style={{ marginBottom: "5px" }}>
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    maxLength="255"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <Dropzone
                    onDrop={handleDrop}
                    maxFiles={1}
                    onDropAccepted={(files) => {
                      setReportImage(files[0]);
                    }}
                    onDropRejected={(files) => {
                      console.error("Only one file can be uploaded");
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p style={{ marginBottom: "0" }}>
                          You can upload your Report Image here (1 max)
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {reportImage && (
                    <div className="mt-2">
                      <strong>Selected File:</strong> {reportImage.name}
                    </div>
                  )}
                </div>
                <div className="submit-container">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{ backgroundColor: "#343a40", borderStyle: "none" }}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReportModal;
