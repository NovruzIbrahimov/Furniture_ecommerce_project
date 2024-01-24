/* eslint-disable no-unused-vars */
import React from "react";
import "../Footer/footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from '../../assets/kayuu-logo-white.svg';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="all-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="section1-top">
              <img src={Image1} alt="" style={{width:'150px', height:'30px'}} />
            </div>
            <div className="section2-bottom">
              <ul>
                <li>3538 Torrance Blvd, Torrance, CA 90503, USA</li>
                <li>+1 123 456 7890</li>
                <li>info@example.com</li>
                <li>Visit Our Store</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="section3-top">
              <h2>Useful Links</h2>
            </div>
            <div className="section4-bottom">
              <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Rooms</li>
                <li>About Us</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="section5-top">
              <h2>Rooms</h2>
            </div>
            <div className="section6-bottom">
              <ul>
                <li>Living Room</li>
                <li>Bedroom</li>
                <li>Kitchen</li>
                <li>Bath Room</li>
                <li>Home Office</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="section7-top">
             <h2>Stay In Touch</h2>
            </div>
            <div className="section8-bottom">
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
             <i className="icon-main"><FaFacebookSquare/></i>
             <i className="icon-main"><FaTwitterSquare/></i>
             <i className="icon-main"><FaYoutubeSquare/></i>
             <i className="icon-main"><FaInstagramSquare/></i>
            </div>
          </div>
        </div>
        <div className="all-footer-second d-flex justify-between align-items-center">
          <h1>Copyright © 2023 Online Furniture Store</h1>
          <p style={{marginLeft:'auto'}}>Powered by Online Furniture Store</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
