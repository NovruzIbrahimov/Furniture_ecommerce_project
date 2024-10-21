/* eslint-disable no-unused-vars */
import React from "react";
import "../Footer/footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from "../../assets/logoo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="all-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="section1-top">
              <img src={Image1} alt="" style={{ width: "150px" }} />
            </div>
            <div className="section2-bottom">
              <ul>
                <li>Q.Məmmədov 123, Bakı, Azərbaycan</li>
                <li>(+994) 051 858 58 00</li>
                <li>info@holl.az</li>
                <li>Mağazamızı ziyarət edin</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="section3-top">
              <h2>Faydalı Linklər</h2>
            </div>
            <div className="section4-bottom">
              <ul>
                <li>Ana səhifə</li>
                <li>Məhsullar</li>
                <li>Otaqlar</li>
                <li>Haqqımızda</li>
                <li>Bizimlə əlaqə</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="section5-top">
              <h2>Otaqlar</h2>
            </div>
            <div className="section6-bottom">
              <ul>
                <li>Oturma otağı</li>
                <li>Yataq otağı</li>
                <li>Mətbəx</li>
                <li>Hamam otağı</li>
                <li>Ev ofisi</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="section7-top">
              <h2>Əlaqədə qal</h2>
            </div>
            <div className="section8-bottom">
              <p>Müştəri çox önəmlidir, müştərini müştəri izləyəcək.</p>
              <i className="icon-main">
                <FaFacebookSquare />
              </i>
              <i className="icon-main">
                <FaTwitterSquare />
              </i>
              <i className="icon-main">
                <FaYoutubeSquare />
              </i>
              <i className="icon-main">
                <FaInstagramSquare />
              </i>
            </div>
          </div>
        </div>

        <div className="all-footer-second container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 text-lg-start text-center footer-second-left">
              <h1>
                Müəllif hüququ © 2023 Onlayn Mebel Mağazası
              </h1>
            </div>

            <div className="col-lg-6 col-md-12 d-flex justify-content-lg-end justify-content-center footer-second-right">
              <p>
                 Created by{" "}
                <a
                  href="https://www.linkedin.com/in/novruz-ibrahimov-80a45a288/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Novruz Ibrahimov
                </a>
                .
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;
