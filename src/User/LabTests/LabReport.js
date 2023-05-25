import React, { useRef } from "react";
import Pdf from "react-to-pdf";
import { Table } from "react-bootstrap";
import logo from "../../images/logo.png";
import { useLocation } from "react-router-dom";
import "./index.scss";

function LabReport() {
  const ref = useRef();
  const { state } = useLocation();
  const { details, medicalReport, date } = state;

  return (
    <div>
      <Pdf targetRef={ref} filename="report.pdf">
        {({ toPdf }) => (
          <button onClick={toPdf} className="btn btn-primary download-pdf">
            Download PDF
          </button>
        )}
      </Pdf>
      <div ref={ref} className="col-7 lab-report-pdf">
        <div className="col-12 logo-div">
          <img src={logo} alt="logo-design" />
        </div>
        <h2 className="text-center py-4">Laboratory Test Report</h2>
        <div className="content">
          <div className="name-and-date">
            <p>
              <strong>Patient Name: </strong>
              {details?.firstname} {details?.lastname}
            </p>
            <p>
              <strong>Date:</strong>
              {date}
            </p>
          </div>
          <br />

          <p className=" text-left">
            <strong>Comments: </strong> {medicalReport.prescription}
          </p>
          <br />

          <div className="d-flex flex-wrap text-left">
            <p className="col-6">
              <strong>Patient ID Number:</strong> 5625242
            </p>
            <p className="col-6">
              <strong>Date of Birth: </strong> {details?.dob}
            </p>
            <p className="col-6">
              <strong>Medications:</strong> none
            </p>
            <br />
            <br />
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>Blood Pressure</th>
                  <th>Blood Sugar</th>
                  <th>Body temperature</th>
                  <th>Lab Test name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{medicalReport.bloodPressure}</td>
                  <td>{medicalReport.bloodSugar}</td>
                  <td>{medicalReport.bodyTemperature}</td>
                  <td>{medicalReport.labTestName}</td>
                </tr>
              </tbody>
            </Table>
            <Table responsive stripedble="true">
              <thead>
                <tr>
                  <th>Lab Test</th>
                  <th>Results</th>
                  <th>Reference</th>
                  <th>Units</th>
                </tr>
                <tr>
                  <td>Na</td>
                  <td>H123</td>
                  <td>13.7 - 3.3</td>
                  <td>mg/dL</td>
                </tr>
                <tr>
                  <td>K</td>
                  <td>H5.9</td>
                  <td>3.6 - 5.2</td>
                  <td>mg/dL</td>
                </tr>
                <tr>
                  <td>CO2</td>
                  <td>28</td>
                  <td>88 - 32</td>
                  <td>mg/dL</td>
                </tr>
                <tr>
                  <td>Glucose</td>
                  <td>H110</td>
                  <td>78 - 104</td>
                  <td>mg/dL</td>
                </tr>
              </thead>
            </Table>
            <p>(Note: L=Abnormal Low, H=Abnormal High)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabReport;
