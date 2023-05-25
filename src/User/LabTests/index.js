import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../../components/Dashboard/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "./index.scss";

function LabTests() {
  const navigate = useNavigate();
  let today = new Date();
  let date =
    today.getDate() +
    "/" +
    parseInt(today.getMonth() + 1) +
    "/" +
    today.getFullYear();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const res = querySnapshot.docs
        .find((doc) => doc.data().user.email === localStorage.getItem("email"))
        ?.data()?.user;
      setUserDetails(res);
    });
  }, []);

  const onShowReport = (selectedMedicalReport) => {
    // setModalValue(false);
    navigate("/download-pdf", {
      state: {
        details: userDetails,
        date,
        medicalReport: selectedMedicalReport
      },
    });
  };

  return (
    <div className="admin-dashboard user-dashboard">
      <Sidebar />
      <div className="admin-header">
        <DashboardHeader />
        <h2 className="my-3">Lab Tests</h2>
        <div className="content">
          {userDetails &&
          userDetails.medicalReports &&
          userDetails.medicalReports.length > 0 ? (
            <Table responsive stripedble="true">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Lab Test Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userDetails &&
                  userDetails.medicalReports &&
                  userDetails.medicalReports.map((value, index) => {
                    if (value.labTestName) {
                      return (
                        <tr key={index}>
                          <td>*</td>
                          <td>{value.labTestName}</td>
                          <td>Completed</td>
                          <td>
                            <button className="btn btn-primary" onClick={_ => onShowReport(value)}>
                              Show report
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return "";
                  })}
              </tbody>
            </Table>
          ) : (
            <h5 className="d-flex justify-content-center pt-5">
              No Lab Tests are assigned at the moment
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default LabTests;

//
