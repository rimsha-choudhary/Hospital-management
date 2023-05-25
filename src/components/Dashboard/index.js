import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard({ title }) {
  const menuItems = useSelector((state) =>
    title === "Doctor" ? state.doctorMenuItems : state.userMenuItems
  );

  return (
    <div className="content">
      <div className="heading">
        <h3>{title} | Dashboard</h3>
        <p className="breadcrumbs">
          {title} {">"} <span className="curr-page">Dashboard</span>{" "}
        </p>
      </div>
      <div className="dashboard-content">
        {menuItems && menuItems.length > 0
          ? menuItems.map((value, index) => {
              return (
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={index}>
                  <div className={`div${index + 1}`}>
                    {value.iconName}
                    <Link to={value.url}>
                      <h5>{value.name}</h5>
                    </Link>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Dashboard;
