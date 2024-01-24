/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "../admin_page/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegCompass } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 style={{ color: "#1a1a1a", fontSize: "21px" }} />
          <h3>Shop</h3>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <BsGrid1X2Fill style={{ color: "#fff" }} />
            <h3>Dashboard</h3>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/dashboardProducts" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <BsFillArchiveFill style={{ color: "#fff" }} />
            <h3>Products</h3>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/dashboardCategories" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <BsFillGrid3X3GapFill style={{ color: "#fff" }} />
            <h3>Categories</h3>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/dashboardAdmins" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <BsPeopleFill style={{ color: "#fff", fontSize: "22px" }} />
            <h3>Admins</h3>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/dashboardOrders" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <FaRegCompass style={{ color: "#fff", fontSize: "22px" }} />
            <h3>Orders</h3>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
