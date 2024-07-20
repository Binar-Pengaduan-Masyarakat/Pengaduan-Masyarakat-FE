import "../../../css/page-user/pagereport/detreport.css";
import Document from "../../../assets/image/doc.png";
const Detreport = () => {
  return (
    <div className="detreport_cont">
      <h1>Detail Report</h1>
      <div className="detreport_content">
        <div className="detcont_img">
          <img src={Document} alt="Doc"></img>
        </div>
        <div className="detcont_value">
          <h3>PENANGANAN JALAN DI KALIMANTAN BARAT</h3>
          <h4>Kerusakan Jalan</h4>
          <h5>Kecamatan / Kelurahan</h5>
          <h6>Alamat </h6>
          <p>12/12/2024</p>
        </div>
      </div>
    </div>
  );
};

export default Detreport;
