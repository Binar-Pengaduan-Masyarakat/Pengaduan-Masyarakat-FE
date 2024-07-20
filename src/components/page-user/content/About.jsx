import "../../../css/page-user/about.css";
// Main About
const About = () => {
  return (
    <>
      <div className="about_cont">
        <Abouthead />
      </div>
    </>
  );
};

// SubComponent About
const Abouthead = () => {
  return (
    <div className="about_head">
      <h1 className="mb-3">Tentang Halaman</h1>
      <div className="youtube_cont">
        <iframe
          src="https://www.youtube.com/embed/o2OQ188CqhM"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default About;
