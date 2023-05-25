import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Sidebar from "../../components/Dashboard/Sidebar";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import "./index.scss";

function Profile() {
  const currentEmail = localStorage.getItem("email");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => {
        const userId = doc.id;
        const data = doc.data().user;
        const result = { userId, ...data };
        return result;
      });
      const currentUser = usersData.find(({ email }) => email === currentEmail);
      if (currentUser) {
        setCurrentUser(currentUser);
        setEmail(currentUser.email);
        setGender(currentUser.gender);
        setFirstname(currentUser.firstname);
        setLastName(currentUser.lastname);
        setAddress(currentUser.address);
        setDateOfBirth(currentUser.dob);
      }
    });
  }, [currentEmail]);

  async function onSubmit(e) {
    e.preventDefault();
    const _userId = doc(db, "users/", `${currentUser?.userId}`);
    updateDoc(_userId, {
      user: {
        firstname,
        lastname,
        email,
        dob,
        gender,
        address,
      },
    }).then(() => alert("Your profile has been updated."));
  }

  return (
    <div className="admin-dashboard user-dashboard">
      <Sidebar />
      <div className="admin-header">
        <DashboardHeader />
        <div className="content profile-form">
          <div className="row login-form">
            <div className="col-sm-12 col-lg-9 p-0">
              <div className="login-form-holder">
                <form name="editProfile" onSubmit={onSubmit}>
                  <h3>Edit Profile</h3>

                  <label>First Name:</label>
                  <br />

                  <input
                    className="form-control"
                    type="text"
                    value={firstname}
                    required
                    placeholder=""
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <br />

                  <label>Last Name:</label>
                  <br />
                  <input
                    className="form-control"
                    type="text"
                    value={lastname}
                    required
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <br />

                  <label>Email:</label>
                  <br />
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    placeholder=""
                    required
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />

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
                        checked={gender === "male"}
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
                        checked={gender === "female"}
                        onChange={(_) => setGender("female")}
                      />
                      Female
                    </div>
                  </div>

                  <label>Address:</label>
                  <br />
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    required
                    placeholder=""
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <br />

                  <label>Date Of Birth:</label>
                  <br />
                  <input
                    className="form-control"
                    type="date"
                    value={dob}
                    required
                    disabled
                    placeholder=""
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <br />

                  <br />
                  <button type="submit" className="login-btn">
                    Save
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

export default Profile;
