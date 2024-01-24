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
              Home
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/rooms">
              Rooms
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/about">
              About Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/contact">
              Contact Us
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="Navbutton">
            <NavLink className="linkbtn" to="/register">
              Register
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
