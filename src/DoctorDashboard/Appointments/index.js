import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { GrFormSchedule } from "react-icons/gr";
import Sidebar from "../../components/Dashboard/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "./index.scss";

function Appointments() {
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const currentEmail = localStorage.getItem("email");

  useEffect(() => {
    getDocs(collection(db, "appointments")).then((querySnapshot) => {
      const _data = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      const updatedData = _data.filter(
        ({ doctorEmail }) => doctorEmail === currentEmail
      );
      setList(updatedData);
    });
  }, [currentEmail]);

  return (
    <div className="admin-dashboard doctor-dashboard">
      <Sidebar title="Doctor" />
      <div className="admin-header">
        <DashboardHeader />
        <div className="content">
          <div className="heading doctors-heading">
            <h3>Current Appointments </h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Manage Doctor</span>{" "}
            </p>
          </div>
          <div className="manage_doc_container">
            <Table responsive stripedble="true">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {list && list.length > 0 ? (
                <tbody>
                  {list.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${value.userDetails.firstname} ${value.userDetails.lastname}`}</td>
                        <td>{value.userDetails.dob}</td>
                        <td>{value.userDetails.email}</td>
                        <td>{value.date}</td>
                        <td>{value.appointmentTime}</td>
                        <td>
                          <BsEyeFill
                            size="20"
                            color="green"
                            onClick={() =>
                              navigate("/doctor-dashboard/patients-details", {
                                state: {
                                  ...value
                                }
                              })
                            }
                          />
                          {"   "}
                          <GrFormSchedule
                            size="25"
                            color="blue"
                            onClick={() =>
                              navigate(
                                "/doctor-dashboard/reschedule-appointment",
                                {
                                  state: {
                                    ...value
                                  },
                                }
                              )
                            }
                          />
                        </td>
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

export default Appointments;
