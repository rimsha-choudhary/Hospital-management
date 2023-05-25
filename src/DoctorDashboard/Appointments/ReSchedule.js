import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "../index.scss";

function ReScheduleAppointment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState(state.date);
  const [time, setAppointmentTime] = useState(state.appointmentTime);

  const rescheduleAppt = (e) => {
    e.preventDefault();
    const _appointmentId = doc(db, "appointments/", `${state?.id}`);
    const updatedData = {
      ...state,
      date: date,
      appointmentTime: time,
    };

    updateDoc(_appointmentId, {
      ...updatedData,
    }).then(() => {
      alert("Data has been updated");
      navigate("/doctor-dashboard/appointments");
    });
  };

  return (
    <div className="admin-dashboard doctor-dashboard">
      <Sidebar title="Doctor" />
      <div className="admin-header">
        <DashboardHeader />
        <div className="content">
          <form
            name="appointment-form reschedule-form"
            onSubmit={(e) => rescheduleAppt(e)}
          >
            <h3>Reschedule Appointment </h3>

            <label> Name: </label>
            <br />
            <input
              type="text"
              disabled
              className="form-control"
              value={`${state.userDetails.firstname} ${state.userDetails.lastname}`}
            />
            <br />

            <label> Email: </label>
            <br />
            <input
              type="text"
              disabled
              className="form-control"
              value={state.userDetails.email}
            />
            <br />

            <label> Date of Birth: </label>
            <br />
            <input
              type="text"
              disabled
              className="form-control"
              value={state.userDetails.dob}
            />
            <br />

            <label> Address: </label>
            <br />
            <input
              type="text"
              disabled
              className="form-control"
              value={state.userDetails.address}
            />
            <br />

            <label>Consultancy Fees:</label>
            <br />
            <input
              disabled
              value={state.fees}
              className="form-control selected-div"
            />
            <br />

            <label>Date:</label>
            <br />
            <input
              type="date"
              required
              value={date}
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <br />

            <label>Appointment Time:</label>
            <br />
            <input
              required
              type="time"
              value={time}
              className="form-control"
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
            <br />

            <br />
            <button type="button" onClick={(_) => navigate("/doctor-dashboard/appointments")}>
              Go Back
            </button> 
            <button type="submit" className="mx-4">Reschedule</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReScheduleAppointment;
