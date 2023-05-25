import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import adminLogo from "../images/admin.png";
import patientLogo from "../images/patient.png";
import doctorLogo from "../images/department1.jpg";
import "./login.scss";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <Header />
      <h1 className="title"> Login </h1>
      <div className="logins">
        <div className="logins-div" onClick={_ => navigate("/patient-login")}>
          <div>
            <img src={patientLogo} alt="patients-logo" />
          </div>
          <div className="login-text patient-bg"> Patient Login</div>
        </div>
        <div className="logins-div" onClick={_ => navigate("/doctor-login")}>
          <div>
            <img src={doctorLogo} alt="patients-logo" />
          </div>
          <div className="login-text doctor-bg">Doctor Login</div>
        </div>
        <div className="logins-div" onClick={_ => navigate("/admin-login")}>
          <div>
            <img src={adminLogo} alt="patients-logo" />
          </div>
          <div className="login-text admin-bg">Admin Login</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
