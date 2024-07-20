import "../../css/page-user/userpage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "../../assets/image/background2.png";
import { Outlet } from "react-router-dom";

const Userpage = () => {
  return (
    <>
      <Navbar />
      <main className="main_cont">
        <img className="main_img" src={Background} alt="" />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Userpage;
