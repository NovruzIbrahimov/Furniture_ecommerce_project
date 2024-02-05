/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import Header from "../components/AdminHeader/Header";
import Sidebar from "../components/AdminSideBar/Sidebar";
import {useNavigate} from "react-router-dom";

function DashboardMenu({ children }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
    }
    else if (user !== null && user.data.user.role === "client") {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [user]);

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

DashboardMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardMenu;
