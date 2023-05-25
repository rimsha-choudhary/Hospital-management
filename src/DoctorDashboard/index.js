import React from "react";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import "./index.scss";

function DoctorDashboard() {
  return (
    <div className="admin-dashboard doctor-dashboard">
      <Sidebar title="Doctor" />
      <div className="admin-header">
        <DashboardHeader />
        <Dashboard title="Doctor" />
      </div>
    </div>
  );
}

export default DoctorDashboard;
