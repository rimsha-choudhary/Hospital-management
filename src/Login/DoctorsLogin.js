import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import "./login.scss";

function DoctorsLogin() {
  return (
    <div>
      <Header />
      <LoginForm role="doctor" title="Doctor's Login"/>
    </div>
  );
}

export default DoctorsLogin;
