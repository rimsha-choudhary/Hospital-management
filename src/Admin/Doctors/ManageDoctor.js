import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import AdminHeader from "../AdminHeader";
import { MdDelete } from "react-icons/md";
import AdminSidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import "../index.scss";

function ManageDoctor() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const onCLickEdit = (index) => {
    navigate("/admin/doctors/edit", { state: doctors[index] });
  };

  const onCLickDelete = async (userId) => {
    try {
      if (window.confirm("Are you sure you want to delete ?")) {
        const userRef = doc(collection(db, "doctors"), userId);
        await deleteDoc(userRef).then(() => {
          alert("Your data has been deleted successfully.");
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error finding user: ", error);
    }
  };

  useEffect(() => {
    getDocs(collection(db, "doctors")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const value = doc.data().doctor;
        const data = { id, ...value };
        return data;
      });
      setDoctors(newData);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <div className="content">
          <div className="heading doctors-heading">
            <h3>Manage Doctor</h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Manage Doctor</span>{" "}
            </p>
          </div>
          <div className="manage_doc_container">
            <Table responsive stripedble="true">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Specialization</th>
                  <th>Doctor Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Fees</th>
                  <th>Action</th>
                </tr>
              </thead>
              {doctors && doctors.length > 0 ? (
                <tbody>
                  {doctors.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.speciality}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.phone}</td>
                        <td>{value.fees}</td>
                        <td>
                          <FaEdit
                            size="28"
                            color="green"
                            onClick={(_) => onCLickEdit(index)}
                          />
                          {"   "}
                          <MdDelete
                            size="28"
                            color="red"
                            onClick={() => onCLickDelete(value.id)}
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

export default ManageDoctor;
