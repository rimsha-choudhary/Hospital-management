import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import { doc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.scss";

function EditDoctors() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [fees, setFees] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [docname, setDocname] = useState("");
  const [address, setAddress] = useState("");
  const [speciality, setSpeciality] = useState("");
  const _doctorId = doc(db, "doctors/", `${state?.id}`);

  useEffect(() => {
    if (state) {
      setFees(state.fees);
      setEmail(state.email);
      setDocname(state.name);
      setPhone(state.phone);
      setAddress(state.address);
      setSpeciality(state.speciality);
    }
  }, [state]);

  async function onSubmit(e) {
    e.preventDefault();
    updateDoc(_doctorId, {
      doctor: {
        name: docname,
        email,
        phone,
        address,
        fees,
        speciality,
      },
    }).then(() => {
      alert("Data has been updated");
      navigate("/admin/doctors");
    });
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <div className="content">
          <div className="heading doctors-heading">
            <h3>Edit Doctor</h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Edit Doctor</span>{" "}
            </p>
          </div>
          <div className="add_doc_container">
            <form onSubmit={(e) => onSubmit(e)}>
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

              <label>Email:</label>
              <br />
              <input
                className="form-control"
                type="email"
                value={email}
                required
                disabled
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
              <button type="button" onClick={(_) => navigate("/admin/doctors")}>
                Cancel
              </button>
              <button type="submit" className="mx-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDoctors;
