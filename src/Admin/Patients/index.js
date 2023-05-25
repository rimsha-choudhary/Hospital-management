import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Table } from "react-bootstrap";
import AdminHeader from "../AdminHeader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AdminSidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";
import { collection,doc, getDocs, deleteDoc } from "firebase/firestore";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const onCLickEdit = (index) => {
    navigate("/admin/patients/edit", { state: patients[index] });
  };

  const onCLickDelete = async (userId) => {
    try {
    const userRef = doc(collection(db, "users"), userId);
    await deleteDoc(userRef).then(() => window.location.reload());
    } catch (error) {
      console.error("Error finding user: ", error);
    }
  };

  useEffect(() => {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const value = doc.data().user;
        const data = { id, ...value };
        return data;
      });
      setPatients(newData);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <div className="content">
          <div className="heading">
            <h3>View Patient's</h3>
            <p className="breadcrumbs">
              Admin {">"} <span className="curr-page">Patient's</span>{" "}
            </p>
          </div>
          <div>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Date of birth</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients?.length > 0 &&
                  patients.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.firstname}</td>
                        <td>{value.lastname}</td>
                        <td>{value.email}</td>
                        <td>{value.address}</td>
                        <td>{value.dob}</td>
                        <td>
                          <FaEdit
                            size="25"
                            color="green"
                            onClick={() => onCLickEdit(index)}
                          />
                          {"   "}
                          <MdDelete
                            size="25"
                            color="red"
                            onClick={() => onCLickDelete(value.id)}
                          />
                        </td>
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

export default Patients;
