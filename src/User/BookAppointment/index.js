import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "./index.scss";

function BookAppointment() {
  const navigate = useNavigate();
  const [fees, setFees] = useState("");
  const [date, setDate] = useState("");
  const [doctorEmail, setDocEmail] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [doctors_list, setDoctorsList] = useState("");
  const [selectedSpeciality, setSpeciality] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctors, setSelectedDoctorsList] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "doctors")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => doc.data().doctor);
      setDoctorsList(newData);
    });
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data().user);
      const _data = data.find(
        ({ email }) => email === localStorage.getItem("email")
      );
      setUserDetails(_data);
    });
  }, []);

  useEffect(() => {
    if (doctors_list && doctors_list.length > 0) {
      const selected_doctors = doctors_list.filter(
        ({ speciality }) => speciality === selectedSpeciality
      );
      setSelectedDoctorsList(selected_doctors);
    }
  }, [doctors_list, selectedSpeciality]);

  const onSelectDoctorName = (e) => {
    setDoctorName(e.target.value);
    const data =
      doctors_list && doctors_list.find(({ name }) => name === e.target.value);
    if (data) {
      setFees(data.fees);
      setDocEmail(data.email);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const _details = {
      fees,
      date,
      doctorName,
      appointmentTime,
      doctorEmail: doctorEmail,
      speciality: selectedSpeciality,
      userDetails: userDetails
    }

    if (!selectedSpeciality && !doctorName && !fees) {
      alert("All fields are required.");
    } else {
      navigate("/book-appointment/payment", {
        state: _details
      });
    }

    
   
  };

  return (
    <div className="admin-dashboard user-dashboard">
      <Sidebar />
      <div className="admin-header">
        <DashboardHeader />

        <div className="content appointment-form">
          <div className="row appointment-form">
            <div className="col-sm-12 col-lg-10 p-0">
              <div className="appointment-form-holder">
                <form name="appointment-form" onSubmit={handleSubmit}>
                  <h3>Book Appointment</h3>

                  <label> Doctor Specialization: </label>
                  <br />
                  <select
                    required
                    value={selectedSpeciality}
                    className="form-control selected-div"
                    onChange={(e) => setSpeciality(e.target.value)}
                  >
                    <option>Select an option</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Pathology"> Pathology</option>
                  </select>
                  <br />

                  <label>Doctor Name:</label>
                  <br />
                  <select
                    required
                    value={doctorName}
                    className="form-control selected-div"
                    onChange={(e) => onSelectDoctorName(e)}
                  >
                    <option>Select an option</option>
                    {selectedDoctors &&
                      selectedDoctors.map((value, index) => {
                        return (
                          <option value={value.name} key={index}>
                            {value.name}
                          </option>
                        );
                      })}
                  </select>
                  <br />

                  <label>Consultancy Fees:</label>
                  <br />
                  <input
                    className="form-control selected-div"
                    type="text"
                    value={fees}
                    required
                    disabled
                    placeholder="Consultancy fees"
                    onChange={(e) => setFees(e.target.value)}
                  />
                  <br />

                  <label>Date:</label>
                  <br />
                  <input
                    className="form-control"
                    type="date"
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <br />

                  <label>Appointment Time:</label>
                  <br />
                  <input
                    className="form-control"
                    type="time"
                    required
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                  <br />

                  <br />
                  <button type="submit" className="login-btn">
                    Proceed to Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
