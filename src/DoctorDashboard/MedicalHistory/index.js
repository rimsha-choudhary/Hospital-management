import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Sidebar from "../../components/Dashboard/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "./index.scss";
import { db } from "../../firebase";

function MedicalHistory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [weight, setWeight] = useState("");
  const [userData, setUserData] = useState(null);
  const [bloodSugar, setBloodSugar] = useState("");
  const [selectedLabTest, setLabTest] = useState("");
  const [prescription, setPrescription] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [labTestRequired, setLabTestRequired] = useState("");
  const [bodyTemperature, setBodyTemperature] = useState("");

  useEffect(() => {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const data = querySnapshot.docs.reduce((accum, doc, index) => {
        const id = doc.id;
        if (doc.data().user.email === state.userDetails.email) {
          const userData = {
            ...doc.data().user,
            id,
          };
          accum = userData;
        }
        return accum;
      }, {});
      if (data) {
        setUserData(data);
      }
    });
  }, [state.userDetails.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const _userId = doc(db, "users/", `${userData?.id}`);
    const _medicalReports = {
      weight,
      bloodPressure,
      bloodSugar,
      bodyTemperature,
      prescription,
      labTestName: selectedLabTest,
      labTestStatus: "not-completed",
      labTestRequired: labTestRequired === "yes" ? true : false,
    };
    const details = {
      ...state.userDetails,
      medicalReports: userData.medicalReports
        ? [...userData?.medicalReports, _medicalReports]
        : [_medicalReports],
    };
    updateDoc(_userId, { user: details }).then(() => {
      alert("Medical History added Successfully.");
      navigate("/doctor-dashboard/patients-details", { state: state });
    });
  };

  return (
    <div className="admin-dashboard doctor-dashboard">
      <Sidebar title="Doctor" />
      <div className="admin-header">
        <DashboardHeader />
        <div className="content">
          <div className="medical-history">
            <form onSubmit={handleSubmit}>
              <label>
                <p className="col-md-4 col-lg-3 col-12">Blood Pressure:</p>
                <input
                  type="text"
                  required
                  value={bloodPressure}
                  className="col-md-8 col-lg-6 col-12"
                  placeholder="Enter your blood pressure out of 120"
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </label>
              <br />
              <label>
                <p className="col-md-4 col-lg-3 col-12"> Blood Sugar: </p>
                <input
                  type="text"
                  required
                  value={bloodSugar}
                  className="col-md-8 col-lg-6 col-12"
                  placeholder="Enter your blood sugar level"
                  onChange={(e) => setBloodSugar(e.target.value)}
                />
              </label>
              <br />
              <label>
                <p className="col-md-4 col-lg-3 col-12"> Weight: </p>
                <input
                  type="text"
                  required
                  value={weight}
                  className="col-md-8 col-lg-6 col-12"
                  placeholder="Enter your weight in kg"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
              <br />
              <label>
                <p className="col-md-4 col-lg-3 col-12"> Body Temperature: </p>
                <input
                  type="text"
                  required
                  value={bodyTemperature}
                  className="col-md-8 col-lg-6 col-12"
                  placeholder="Enter your blood temperature"
                  onChange={(e) => setBodyTemperature(e.target.value)}
                />
              </label>
              <br />
              <label>
                <p className="col-md-4 col-lg-3 col-12"> Prescription: </p>
                <textarea
                  required
                  className="col-md-8 col-lg-6 col-12"
                  value={prescription}
                  placeholder="Your comments"
                  onChange={(e) => setPrescription(e.target.value)}
                />
              </label>
              <br />
              <label>
                <p className="col-md-4 col-lg-3 col-12">
                  Any Lab tests require ?
                </p>
                <div className="d-flex">
                  <div>
                    <input
                      type="radio"
                      id="choice"
                      name="choice"
                      required
                      value="yes"
                      className="m-2"
                      onChange={(_) => setLabTestRequired("yes")}
                    />
                    Yes
                  </div>
                  <div className="mx-4">
                    <input
                      type="radio"
                      id="choice"
                      name="choice"
                      required
                      value="no"
                      className="m-2"
                      onChange={(_) => setLabTestRequired("no")}
                    />
                    No
                  </div>
                </div>
              </label>
              {labTestRequired === "yes" && (
                <div>
                  <label className="d-flex">
                    <p className="col-md-4 col-lg-3 col-12"> Lab Test: </p>
                    <select
                      required
                      value={selectedLabTest}
                      className="col-md-8 col-lg-6 col-12"
                      onChange={(e) => setLabTest(e.target.value)}
                    >
                      <option>Select an Option</option>
                      <option value="Albumin Blood Test">
                        Albumin Blood Test
                      </option>
                      <option value="Allergy Blood Test">
                        Allergy Blood Test
                      </option>
                      <option value="Bacterial Vaginosis Test">
                        Bacterial Vaginosis Test
                      </option>
                      <option value="Cholesterol Levels">
                        Cholesterol Levels
                      </option>
                      <option value="Globulin Test"> Globulin Test</option>
                      <option value="MRI Scan"> MRI Scan </option>
                      <option value="Vitamin B Test"> Vitamin B Test </option>
                      <option value="Vitamin D Test"> Vitamin D Test </option>
                      <option value="PET Scan"> PET Scan </option>
                    </select>
                  </label>
                </div>
              )}
              <br />
              <br />
              <button
                type="button"
                onClick={(_) =>
                  navigate("/doctor-dashboard/patients-details", {
                    state: state,
                  })
                }
              >
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

export default MedicalHistory;
