import React,  { useEffect }  from "react";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import "./index.scss";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if(!userEmail || userEmail !== "admin@email.com") {
      navigate("/admin-login");
    } else {
      getDocs(collection(db, "doctors")).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data().doctor);
        dispatch({ type: "SET_DOCTORS_LIST", data: data });
      });
      getDocs(collection(db, "users")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => doc.data().user);
        dispatch({ type: "SET_PATIENTS_LIST", data: newData });
      });
      getDocs(collection(db, "appointments")).then((querySnapshot) => {
        const _data = querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: "SET_APPOINTMENTS_LIST", data: _data });
      });
    }
  }, [dispatch, navigate]);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-header">
        <AdminHeader />
        <AdminDashboard />
      </div>
    </div>
  );
}

export default Admin;
