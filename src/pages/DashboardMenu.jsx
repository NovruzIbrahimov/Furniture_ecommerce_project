/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import Header from "../admin_page/Header";
import Sidebar from "../admin_page/Sidebar";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function DashboardMenu({ children }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
    }

  }, []);



  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className={`grid-container ${openSidebarToggle ? 'no-scroll' : ''}`} style={{overflow:'hidden'}}>
      <div className="row">
        <Header OpenSidebar={OpenSidebar} />
        <div className="col-lg-3">
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        </div>
        <div className="col-lg-9" style={{ height: '100vh', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}

export default DashboardMenu;
