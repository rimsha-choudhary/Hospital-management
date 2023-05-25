import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./index.scss";

function AdminSidebar() {
  const [toggle, setToggle] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const _class = toggleMenu
    ? "admin-sidebar admin-mobile-sidebar"
    : "admin-sidebar";

  return (
    <div>
      <div className={_class}>
        <div className="logo admin-navbar">
          <img src={logo} alt="logo-bg" />
          {toggleMenu && (
            <RxCross2
              className="cross-icon"
              onClick={(_) => setToggleMenu(false)}
            />
          )}
        </div>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <div className="heading" onClick={(_) => setToggle(!toggle)}>
              Doctors <RiArrowDropDownLine className="arrow" />
            </div>
            {toggle && (
              <div className="children">
                <div>
                  <Link to="/admin/add-doctor">Add Doctor</Link>
                </div>
                <div>
                  <Link to="/admin/doctors">Manage Doctor</Link>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link to="/admin/patients">Patients</Link>
          </li>
          <li>
            <Link to="/admin/appointments">Appointments</Link>
          </li>
        </ul>
      </div>

      <div className="mobile-sidebar" onClick={(_) => setToggleMenu(true)}>
        <GiHamburgerMenu />
      </div>
    </div>
  );
}

export default AdminSidebar;
