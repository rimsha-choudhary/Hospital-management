import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

function Sidebar({ title }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuItems = useSelector((state) =>
    title === "Doctor" ? state.doctorMenuItems : state.userMenuItems
  );
  const _class = toggleMenu
    ? "admin-sidebar admin-mobile-sidebar"
    : "admin-sidebar";

  return (
    <div className="dashboard-sidebar">
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
            <Link to={ title === "Doctor" ? "/doctor-dashboard" : "/user"}>Dashboard</Link>
          </li>
          {menuItems && menuItems.length > 0
            ? menuItems.map(({ name, url }, index) => {
                return (
                  <li key={index}>
                    <Link to={url}>{name}</Link>
                  </li>
                );
              })
            : null}
        </ul>
      </div>

      <div className="mobile-sidebar" onClick={(_) => setToggleMenu(true)}>
        <GiHamburgerMenu />
      </div>
    </div>
  );
}

export default Sidebar;
