import "../../../css/page-user/pagehome/home.css";
import useFetchReports from "../../../api/apifetch";
import { Link } from "react-router-dom";
const Home = () => {
  const { data, error, isLoading } = useFetchReports();
  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="home_cont">
      <div className="home_head ">
        <h1>Layanan Pengaduan Oneline Masyarakat</h1>
        <p>
          Sampaikan Laporan Anda Lansung Kepada <br></br> Instansi Pemerintah
          Yang berwenang
        </p>
      </div>
      <div className="p_terkini_cont container-sm">
        <h2>ADUAN TERKINI</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">No. Laporan</th>
                <th scope="col">Pelapor</th>
                <th scope="col">Laporan</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((report) => (
                <tr key={report.reportId}>
                  <td>{report.reportId}</td>
                  <td>{report.reportContent}</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Link to="report/det" className="btn btn-success">
                      {" "}
                      <i className="bi bi-info-circle-fill"></i> Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sop_cont">
        <h2>SOP LAPORAN</h2>
        <div className="list_sop">
          <ul className="container sop_menu">
            <li>
              <p className="sop_img">
                <i className="bi bi-pencil-square"></i>
              </p>
              <h3>Tulis Laporan</h3>
              <p className="sop_des">
                Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap
              </p>
            </li>
            <hr />
            <li>
              <p className="sop_img">
                <i className="bi bi-file-earmark-check"></i>
              </p>
              <h3>Proses Verifikasi</h3>
              <p className="sop_des">
                Dalam 3 hari, laporan Anda akan diverifikasi dan diteruskan
                kepada instansi berwenang
              </p>
            </li>
            <hr />
            <li>
              <p className="sop_img">
                <i className="bi bi-wechat"></i>
              </p>
              <h3>Proses Tindak Lanjut</h3>
              <p className="sop_des">
                Dalam 5 hari, instansi akan menindaklanjuti dan membalas laporan
                Anda
              </p>
            </li>
            <hr />
            <li>
              <p className="sop_img">
                <i className="bi bi-chat-dots"></i>
              </p>
              <h3>Beri Tanggapan</h3>
              <p className="sop_des">
                Anda dapat menanggapi kembali balasan yang diberikan oleh
                instansi dalam waktu 10 hari
              </p>
            </li>
            <hr />
            <li>
              <p className="sop_img">
                <i className="bi bi-chat-dots"></i>
              </p>
              <h3>Selesai</h3>
              <p className="sop_des">
                Laporan Anda akan terus ditindaklanjuti hingga terselesaikan
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="qount_cont">
        <h2>Jumlah Laporan Sekarang</h2>
        <p className="qount_lap">200</p>

        <div className="qount_instution">
          <h3>Instansi Yang Terhubung</h3>
          <ul className="qount_now">
            <li className="qount_now_item">
              <p className="qount_dis">10</p>
              <p className="dis_name">Kecamatan</p>
            </li>
            <li className="qount_now_item">
              <p className="qount_dis">10</p>
              <p className="dis_name">Kelurahan / Desa</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
