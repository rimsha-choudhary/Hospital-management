import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

function AdminAppointments() {
  const appointments_list = useSelector((state) => state.appointments);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <div className="content">
          <div className="heading doctors-heading">
            <h3>Appointments List </h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Manage Doctor</span>{" "}
            </p>
          </div>
          <div className="manage_doc_container">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Doctor Specialization</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                </tr>
              </thead>
              {appointments_list && appointments_list.length > 0 ? (
                <tbody>
                  {appointments_list.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${value.userDetails.firstname} ${value.userDetails.lastname}`}</td>
                        <td>{value.doctorName}</td>
                        <td>{value.speciality}</td>
                        <td>{value.date}</td>
                        <td>{value.appointmentTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAppointments;
