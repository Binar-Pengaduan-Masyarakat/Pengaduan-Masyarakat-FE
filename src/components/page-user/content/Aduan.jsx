import "../../../css/page-user/aduan.css";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Report from "../../../api/repots.API";

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
  // Fetch Api Category
  const { data, error, isLoading } = Report.useCombineData();

  // Setting Selection Option
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [desaList, setDesaList] = useState([]);

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleSelectKecamatan = (kecamatan) => {
    setSelectedKecamatan(kecamatan);
    // Simulasi fetch desa berdasarkan kecamatan yang dipilih
    // Misalnya, data desa yang diambil dari server/API
    if (kecamatan === "Malinau Kota") {
      setDesaList([
        "Desa Malinau Kota",
        "Desa Malinau Hulu",
        "Desa Malinau Hilir",
      ]);
    } else if (kecamatan === "Malinau Utara") {
      setDesaList(["Desa Malinau Seberang", "Desa Respen Tubu", "Desa Salap"]);
    } else {
      setDesaList([]);
    }
  };

  const kecamatanList = ["Malinau Kota", "Malinau Utara"];

  // Ngiput Data

  const [reportContent, setreportContent] = useState(""),
    [reportImage, setreportImage] = useState(""),
    [categoryId, setcategoryId] = useState(""),
    [userId, setUserId] = useState(""),
    [distric, setDistrict] = useState(""),
    [subdistrict, setSubdistrict] = useState(""),
    [address, setAddress] = useState("");

  const hendlingSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        reportContent: reportContent,
        reportImage: reportImage,
        categoryId: categoryId,
        userId: userId,
        district: distric,
        subdistrict: subdistrict,
        address: address,
      };
      await Report.postData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="aduan_cont">
      <div className="form_cont container-sm">
        <h2 className="headatas">Kirim Laporan</h2>
        <form className="container" onSubmit={hendlingSubmit}>
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
              {data &&
                data.categories &&
                data.categories.map((c) => (
                  <option key={c.categoryId} value={c.categoryName}>
                    {c.categoryName}
                  </option>
                ))}
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
                onChange={(e) => handleSelectKecamatan(e.target.value)}
              >
                <option value="">Pilih Kecamatan</option>
                {kecamatanList.map((kecamatan, index) => (
                  <option key={index} value={kecamatan}>
                    {kecamatan}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select form-select-sm"
                aria-label="Small select example"
              >
                <option value="">Pilih Desa</option>
                {desaList.map((desa, index) => (
                  <option key={index} value={desa}>
                    {desa}
                  </option>
                ))}
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
