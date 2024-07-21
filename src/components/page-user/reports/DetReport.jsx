import "../../../css/page-user/pagereport/detreport.css";
import Document from "../../../assets/image/doc.png";
import Reports from "../../../api/repots.API";
import { useParams } from "react-router-dom";
const Detreport = () => {
  const { reportId } = useParams();
  const { data, error, isLoading } = Reports.useFetchReportById(`${reportId}`);
  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;
  const report = data.data;
  return (
    <div className="detreport_cont">
      <h1>Detail Report</h1>
      <div className="detreport_content" key={report.id}>
        <div className="detcont_img">
          <img src={report.reportImage} alt="Doc"></img>
        </div>
        <div className="detcont_value">
          <h3>{report.reportContent}</h3>
          <h4>{report.reportId}</h4>
          <h5>
            {report.district} / {report.subdistrict}
          </h5>
          <h6>{report.address} </h6>
          <p>{report.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default Detreport;
