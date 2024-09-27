/* eslint-disable no-unused-vars */
import React from "react";
import "../sections/homesection6.css";
import Image61 from "../assets/section6-person1-img.jpg";
import Image62 from "../assets/section6-person2-img.jpg";
import { NavLink } from "react-router-dom";

function HomeSection6() {
  return (
    <div className="homesection6 mb-5">
      <div className="homesection6-top mb-5">
        <h2>İnsanlar nə deyir</h2>
        <NavLink className="Link" to="about">
          Bütün sözlərə baxın
        </NavLink>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 left-text d-flex align-items-center">
            <div className="left-text-left1">
              <img src={Image61} alt="" />
            </div>
            <div className="left-text-right1">
              <p>
                İnanılmaz müştəri xidməti! Evim üçün mükəmməl divanı
                fərdiləşdirmək üçün yuxarıda və kənarda getdilər.
              </p>
              <h1>Səbinə İbrahimova</h1>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 right-text d-flex align-items-center">
            <div className="right-text-left1">
              <img src={Image62} alt="" />
            </div>
            <div className="right-text-right1">
              <p>
                İnanılmaz müştəri xidməti! Evim üçün mükəmməl divanı
                fərdiləşdirmək üçün yuxarıda və kənarda getdilər.
              </p>
              <h1>Murad Babayev</h1>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HomeSection6;
