import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Table } from "react-bootstrap";
import Sidebar from "../../components/Dashboard/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "./index.scss";

function Appointments() {
  const [appointments, setAppointments] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "appointments")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setAppointments(data);
    });
  }, []);

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      const list = appointments.reduce((accum, value, index) => {
        if(value.userDetails.email === localStorage.getItem("email")) {
          accum.push(value);
        }
        return accum;
      }, []);
      setList(list)
    }
  }, [appointments]);

  return (
    <div className="admin-dashboard user-dashboard">
      <Sidebar />
      <div className="admin-header">
        <DashboardHeader />
        <div className="content">
          <div className="heading">
            <h3> Appointments </h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Patient's</span>{" "}
            </p>
          </div>
          <div>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor Name</th>
                  <th>Speciality</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody>
                {list?.length > 0 &&
                  list.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.doctorName}</td>
                        <td>{value.speciality}</td>
                        <td>{value.date}</td>
                        <td>{value.appointmentTime}</td>
                        <td>${value.fees}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
