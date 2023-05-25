import React, { useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./index.scss";

function Header() {
  const navigate = useNavigate();
  const [toggle, onToggle] = useState(false);

  return (
    <header className="app-header">
      <nav className="navbar menu">
        <h1 onClick={(_) => navigate("/")}>
          <img src={logo} alt="logo" />
        </h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#departments">Departments</a>
          </li>
          <li>
            <a href="#doctors">Doctors</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
      <nav className="navbar mobile-menu">
        <div className="hamburger-menu">
          <GiHamburgerMenu onClick={(_) => onToggle(!toggle)} />
        </div>
        {toggle && (
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#departments">Departments</a>
            </li>
            <li>
              <a href="#doctors">Doctors</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        )}

        <h1 onClick={(_) => navigate("/")}>
          <img src={logo} alt="logo" />
        </h1>
      </nav>
    </header>
  );
}

export default Header;
