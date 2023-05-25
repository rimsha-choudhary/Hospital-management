import React, { useState } from "react";
import { auth, db } from "../../firebase";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../index.scss";

function AddDoctor() {
  const navigate = useNavigate();
  const [fees, setFees] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [docname, setDocname] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctor = {
      name: docname,
      address,
      email,
      phone,
      fees,
      speciality,
    };
    if (password === confirmpassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Your account has been created");
          addDoc(collection(db, "doctors"), {
            doctor: doctor,
          }).then(() => {
            alert("Your data has been added");
            navigate("/admin/doctors");
          });
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            alert("Email address already exists.");
          }
        });
    } else {
      alert("Password does not match");
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <div className="content">
          <div className="heading doctors-heading">
            <h3>Add Doctor</h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Add Doctor</span>{" "}
            </p>
          </div>
          <div className="add_doc_container">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>Name:</label>
              <br />
              <input
                className="form-control"
                type="text"
                value={docname}
                required
                placeholder="Enter Doctor's Name"
                onChange={(e) => setDocname(e.target.value)}
              />
              <br />

              <label>Speciality:</label>
              <br />
              <select
                required
                value={speciality}
                className="form-control"
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option>Select an Option</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Pathology"> Pathology</option>
              </select>
              <br />

              <label>Email:</label>
              <br />
              <input
                className="form-control"
                type="email"
                value={email}
                required
                placeholder="Enter Doctor's Email:"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <label>Phone:</label>
              <br />
              <input
                className="form-control"
                type="tel"
                value={phone}
                required
                maxLength={10}
                placeholder="Enter Doctor's Contact No:"
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />

              <label>Clinic Address:</label>
              <br />
              <textarea
                className="form-control"
                value={address}
                required
                placeholder="Enter Doctor's Clinic Address:"
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />

              <label>Consultancy Fees:</label>
              <input
                className="form-control"
                type="text"
                value={fees}
                required
                placeholder="Enter Consultancy Fees:"
                onChange={(e) => setFees(e.target.value)}
              />
              <br />
              <label>Password:</label>
              <input
                className="form-control"
                type="password"
                value={password}
                required
                placeholder="Enter Your Password:"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <label>Confirm Password::</label>
              <input
                className="form-control"
                type="password"
                value={confirmpassword}
                required
                placeholder="Confirm Password:"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
