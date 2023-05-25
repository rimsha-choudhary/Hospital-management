import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import "./login.scss";


function AdminLogin() {
  return (
    <div>
      <Header />
      <LoginForm role="admin" title="Admin Login"/>
    </div>
  );
}

export default AdminLogin;
