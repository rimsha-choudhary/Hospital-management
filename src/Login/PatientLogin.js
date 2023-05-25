import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

function PatientLogin() {
  return (
    <div className="patient-login">
      <Header />
      <LoginForm role="user" title="User Login" />
    </div>
  );
}

export default PatientLogin;
