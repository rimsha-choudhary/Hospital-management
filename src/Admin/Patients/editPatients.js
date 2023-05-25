import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import "../../Login/login.scss";

function EditPatient() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [patient, setPatients] = useState();
  // const [userId, setUserId] = useState(null);
  const _userId = doc(db, "users/", `${state?.id}`);
  
  useEffect(() => {
    if (state) {
      setEmail(state.email);
      setFirstname(state.firstname);
      setLastName(state.lastname);
      setDateOfBirth(state.dob);
      setAddress(state.address);
      // setUserId(state.id);
    }
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => doc.data().user);
      setPatients(newData);
    });
  }, [state]);

  async function onSubmit(e) {
    e.preventDefault();
    updateDoc(_userId, {
      user: {
        firstname,
        lastname,
        email,
        dob,
        address,
      },
    }).then(() => navigate("/admin/patients"));
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <div className="row login-form register-form edit-form">
          <h3>Edit Patient</h3>
          <div className="col-sm-10 col-lg-6 col-xl-6 col-md-8 p-0 login-form-container">
            <div className="login-form-holder">
              <form onSubmit={onSubmit} name="registerform">
                <label>First Name:</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  value={firstname}
                  required
                  placeholder="Enter your First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <label>Last Name:</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  value={lastname}
                  required
                  placeholder="Enter your Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />{" "}
                <label>Email:</label>
                <br />
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Address:</label>
                <br />
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  required
                  placeholder="Enter your Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label>Date Of Birth:</label>
                <br />
                <input
                  className="form-control"
                  type="date"
                  value={dob}
                  required
                  placeholder="Enter your Date Of Birth"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <button type="submit" className="login-btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPatient;
