/* eslint-disable no-unused-vars */
import React from "react";
import "../Menu/menu.css";
import { Link, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

function Menu() {
  return (
    <>
      <div className="Navbars">
        <ul className="NavbarWrappers">
          <li className="NavbarElement">
            <NavLink className="link" to="/">
              Ana səhifə
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/products">
              Məhsullar
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/rooms">
              Otaqlar
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/about">
              Haqqımızda
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/contact">
              Bizimlə əlaqə
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/login">
              Daxil ol
            </NavLink>
          </li>
          <li className="Navbutton">
            <NavLink className="linkbtn" to="/register">
              Qeydiyyat
            </NavLink>
          </li>
          <li className="Navbutton">
            <IoLogOutOutline />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
