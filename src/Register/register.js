import React, { useState } from "react";
import { auth, db } from "../firebase";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "../Login/login.scss";

function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      //firebase create with email password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //send verification email
          sendEmailVerification(userCredential.user);
          alert("Verification Email has been sent, Kindly Check your email.");
          navigate("/patient-login");
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            setErr("Email address already exists.");
          }
        });

      const user = { firstname, lastname, address, email, dob, gender };
      try {
        await addDoc(collection(db, "users"), {
          user: user,
        });
        navigate("/patient-login");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else setErr("Password Does Not Match");
  }

  return (
    <div className="">
      <Header />
      <div className="row login-form register-form">
        <h3>Register</h3>
        <div className="col-sm-10 col-lg-6 col-xl-6 col-md-8 p-0 login-form-container">
          <div className="login-form-holder">
            <form onSubmit={register} name="registerform">
              {err && <p className="err">{err}</p>}
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
              />

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

              <label>Gender:</label>
              <br />
              <div className="gender-container">
                <div className="gender-male">
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    required
                    value="male"
                    onChange={(_) => setGender("male")}
                  />
                  Male
                </div>
                <div className="gender-female">
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    required
                    value="female"
                    onChange={(_) => setGender("female")}
                  />
                  Female
                </div>
              </div>

              <label>Password:</label>
              <br />
              <input
                className="form-control"
                type="password"
                value={password}
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirm Password:</label>
              <br />
              <input
                className="form-control"
                type="password"
                value={confirmPassword}
                required
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <br />
              <div>
                Already have an Account? &nbsp;
                <a href="/patient-login">Login Here</a>
              </div>
              <br />
              <button type="submit" className="login-btn">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
