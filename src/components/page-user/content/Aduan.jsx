import "../../../css/page-user/aduan.css";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const PhotoDropzone = ({ onDrop }) => {
  const onDropCallback = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: "image/*", // Hanya menerima file gambar
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
};

const Aduan = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  return (
    <div className="aduan_cont">
      <div className="form_cont container-sm">
        <h2 className="headatas">Kirim Laporan</h2>
        <form className="container">
          {/* Judul */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="judul"
              aria-describedby="emailHelp"
              placeholder="Judul Laporan *"
            ></input>
          </div>
          <div className="mb-3">
            <select
              className="form-select form-select-sm"
              aria-label="Small select example"
            >
              <option selected>Kategori</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          {/* Drag Photo */}
          <div className="mb-3">
            <PhotoDropzone onDrop={handleDrop} />
            <div>
              <h2>Uploaded Files</h2>
              <ul>
                {files.map((file) => (
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Distrik */}
          <div className="mb-3 district_cont">
            <div className="mb-3">
              <select
                className="form-select form-select-sm"
                aria-label="Small select example"
              >
                <option selected>Kecamatan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select form-select-sm"
                aria-label="Small select example"
              >
                <option selected>Kelurahan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="judul"
              aria-describedby="emailHelp"
              placeholder="Alamat *"
            ></input>
          </div>
          <div className="mb-3 btn_custom">
            <button type="submit" className="btn btn-primary">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Aduan;
