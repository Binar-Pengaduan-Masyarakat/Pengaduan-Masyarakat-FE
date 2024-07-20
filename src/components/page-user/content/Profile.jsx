import "../../../css/page-user/profil.css";
import Profileimg from "../../../assets/image/profile.jpeg";
const Profile = () => {
  return (
    <div className="profil_cont">
      <h1>PROFIL</h1>
      <div className="profil_content">
        <div className="profile_img">
          <img src={Profileimg} alt="profil" />
        </div>
        <div className="profile_value">
          <h2>
            JOHN SMITHMULLER <small>(Smith)</small>
          </h2>
          <p>johnsmitmuller@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
