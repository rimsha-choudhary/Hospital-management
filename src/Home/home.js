import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "../Slider";
import slides from "../mock.json";
import ECG from "../images/ecg.png";
import ArrowUp from '../images/arrow-up.svg';
import { useWindowScroll } from 'react-use';
import DOC1 from "../images/Doctor3.jpeg";
import DOC2 from "../images/Doctor2.jpeg";
import DOC3 from "../images/Doctor1.jpeg";
import DOC4 from "../images/Doctor4.jpeg";
import DOC5 from "../images/Doctor5.jpeg";
import DOC6 from "../images/Doctor6.jpeg";
import Header from "../components/Header";
import DEPARTMENT1 from "../images/Eye.jpeg";
import DEPARTMENT2 from "../images/Skin.jpeg";
import ABOUTIMG1 from "../images/About1.jpeg";
import ABOUTIMG2 from "../images/About2.jpeg";
import DEPARTMENT5 from "../images/Dental.jpeg";
import DEPARTMENT4 from "../images/Medical.jpeg";
import DEPARTMENT3 from "../images/Pathology.jpeg";
import DEPARTMENT6 from "../images/Diagnostic.jpeg";
import neelImg from "../images/neel.jpg";
import teshaImg from "../images/tesha.jpg";
import PrajuImg from "../images/praju.jpg";
import rimshaImg from "../images/rimsha.jpeg";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./home.scss";

function Home() {
  const { y: pageYOffset } = useWindowScroll();
  const [scrollBtnVisible, setVisibility] = useState(false);

  useEffect(() => {
    if (pageYOffset > 200) {
      setVisibility(true)
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);


  function onScrollTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <div className="main">
      <div className="home-container">
        <Header />
        <div>
          {/* <SliderPage /> */}
          <div className="sliderHolder">
            <Slider slides={slides} />
            <div className="sub-holder">
              <h2>Health care</h2>
              <h5>for whole family </h5>
              <br></br>
              <div className="btn top-btn">
                <a href="/">Check Our Services</a>
              </div>
            </div>
          </div>
        </div>

        {/* slider section */}
        <div className="ogbg">
          <div className="container">
            <div className="img-holder">
              <img src={ECG} alt="ecg" />
            </div>
            <h2>Hospitality</h2>
            <p>
              Clinical excellence must be the priority for any health care
              service provider.
            </p>
            <a href="/">Apply for A Bed</a>
          </div>
          <div className="container">
            <div className="img-holder">
              <img src={ECG} alt="" />
            </div>
            <h2>Emergency Care</h2>
            <p>
              Clinical excellence must be the priority for any health care
              service provider.
            </p>
            <a href="/">+10 238 4473 477</a>
          </div>
          <div className="container">
            <div className="img-holder">
              <img src={ECG} alt="" />
            </div>
            <h2>Chamber Service</h2>
            <p>
              Clinical excellence must be the priority for any health care
              service provider.
            </p>
            <a href="/">Make An Appointment</a>
          </div>
        </div>

        {/* about us */}
        <div className="about-us" id="about">
          <div className="left-container">
            <img src={ABOUTIMG1} alt="" />
            <img src={ABOUTIMG2} alt="" />
          </div>
          <div className="right-container">
            <p className="welcom-about-us">
              Welcome to Hospital Management System
            </p>
            <p>
              Hospital history and mission statement Profiles of key staff
              members, including doctors, nurses, and administrative leaders
              Overview of hospital accreditation and quality ratings Information
              on hospital policies and procedures, including patient privacy and
              safety
            </p>
            <a href="/">Learn More</a>
          </div>
        </div>

        <div className="team-members">
          <h1> Meet our Team </h1>
          <div className="image-div">
            <div>
              <img src={neelImg} alt="neel-pic" />
              <h3>Neel Gajera </h3>
            </div>
            <div>
            <img src={teshaImg} alt="tesha-pic" />
              <h3>Tesha Patel </h3>
            </div>
            <div>
            <img src={PrajuImg} alt="praju-pic" />
              <h3>Prajakta Limje </h3>
            </div>
            <div>
            <img src={rimshaImg} alt="rimsha-pic" />
              <h3>Rimsha Choudhary </h3>
            </div>
          </div>
        </div>

        {/* Department */}
        <div className="department" id="departments">
          <div>
            <div className="top-namee">
              <h3>Our Departments</h3>
            </div>

            <div className="department-card">
              <div className="department-box-container">
                <div className="img-container-department">
                  <img src={DEPARTMENT1} alt="" />
                </div>
                <div>
                  <div className="lefttt">
                    <h3>Eye Care</h3>
                    <p>
                      Esteem spirit temper too say adieus who direct esteem.
                    </p>
                    <a href="/">Learn More</a>
                  </div>
                </div>
              </div>

              <div className="department-box-container">
                <div className="img-container-department">
                  <img src={DEPARTMENT2} alt="" />
                </div>
                <div className="lefttt">
                  <h3>Skin Care</h3>
                  <p>Esteem spirit temper too say adieus who direct esteem.</p>
                  <a href="/">Learn More</a>
                </div>
              </div>

              <div className="department-box-container">
                <div className="img-container-department">
                  <img src={DEPARTMENT3} alt="" />
                </div>
                <div className="lefttt">
                  <h3>Pathology</h3>
                  <p>Esteem spirit temper too say adieus who direct esteem.</p>
                  <a href="/">Learn More</a>
                </div>
              </div>

              <div className="department-box-container">
                <div className="img-container-department">
                  <img src={DEPARTMENT4} alt="" />
                </div>
                <div className="lefttt">
                  <h3>Medicine</h3>
                  <p>Esteem spirit temper too say adieus who direct esteem.</p>
                  <a href="/">Learn More</a>
                </div>
              </div>

              <div className="department-box-container">
                <div className="img-container-department">
                  <img src={DEPARTMENT5} alt="" />
                </div>
                <div className="lefttt">
                  <h3>Dental</h3>
                  <p>Esteem spirit temper too say adieus who direct esteem.</p>
                  <a href="/">Learn More</a>
                </div>
              </div>

              <div className="department-box-container">
                <div className="img-container-department">
                  <img src={DEPARTMENT6} alt="" />
                </div>
                <div className="lefttt">
                  <h3>Diagnostic Test</h3>
                  <p>Esteem spirit temper too say adieus who direct esteem.</p>
                  <a href="/">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1>Testimonials </h1>
        <div className="testimonialContainer">
          <span>James Anderson</span>
          <p>Dr. Kiera Patel is a hard working and comitted individual.</p>
        </div>
        <div className="testimonialContainer">
          <span>Steve Boulder</span>
          <p>
            Dr. Leilani Kim treated me well and the pain was gone within a week.
          </p>
        </div>

        {/* doctors */}
        <div id="doctors">
          <div className="header-doc-container">
            <h3>Expert Doctors</h3>
          </div>
          <div className="doctor-card-container">
            <div className="doc-card">
              <img src={DOC1} alt="" />
              <div className="name-doc-holder">
                <p>Kiera Patel</p>
                <p>Neurology</p>
              </div>
            </div>
            <div className="doc-card">
              <img src={DOC2} alt="" />
              <div className="name-doc-holder">
                <p>Ezra Marshall</p>
                <p>Dermatology</p>
              </div>
            </div>
            <div className="doc-card">
              <img src={DOC3} alt="" />
              <div className="name-doc-holder">
                <p>Leilani Kim</p>
                <p>Cardiology</p>
              </div>
            </div>
            <div className="doc-card">
              <img src={DOC4} alt="" />
              <div className="name-doc-holder">
                <p>Victor Nguyen</p>
                <p>Pediatrics</p>
              </div>
            </div>
            <div className="doc-card">
              <img src={DOC5} alt="" />
              <div className="name-doc-holder">
                <p>Camilla Rivera</p>
                <p>Gastroenterology</p>
              </div>
            </div>
            <div className="doc-card">
              <img src={DOC6} alt="" />
              <div className="name-doc-holder">
                <p>Caleb Morgan</p>
                <p>Oncology</p>
              </div>
            </div>
          </div>
        </div>

        {/* emergency */}
        <div className="emrgy-main">
          <div className="left-emrgy">
            <div className="emrgy-holder">
              <div className="jg-holder">
                <p>For Any Emergency Contact</p>
              </div>
              <div className="gg-btn">
                <a href="/">+10 238 4473 477</a>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="footer-main">
          <div className="footer-mm">
            <div className="left-footer">
              <div className="">
                <h3>Departments</h3>
              </div>
              <div className="namee-con">
                <p>Eye Care</p>
                <p>Skin Care</p>
                <p>Pathology</p>
                <p>Medicine</p>
                <p>Dental</p>
              </div>
            </div>
            <div className="left-footer">
              <div className="">
                <h3>Useful Links</h3>
              </div>
              <div className="namee-con">
                <p>Doctors</p>
                <p>About</p>
                <p>Contact</p>
                <p>Appointment</p>
              </div>
            </div>
            <div className="left-footer">
              <div className="">
                <h3>Address</h3>
              </div>
              <div className="namee-con">
                <p>
                  1200, A-block, Back lane UK +10 238 4473 477 hms@contact.com
                </p>
              </div>

              <div className="socialMedia">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-last">
          <p>Copyright ©2023 All rights reserved</p>
        </div>
      </div>
      {
        scrollBtnVisible && (
          <div className="scroll-up" onClick={_ => onScrollTop()}>
            <img src={ArrowUp} alt="scroll-up" />
          </div>
        )
      }
    </div>
  );
}

export default Home;
