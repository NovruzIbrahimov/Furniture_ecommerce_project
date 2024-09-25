/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import "../sections/homesection2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image3 from "../assets/section2leftimg.jpg";
import { NavLink } from "react-router-dom";

function HomeSection2() {
  return (
    <div className="homesection2">
      <div className="container">
        <div className="row">
          <div className="left2 col-lg-7 col-md-12 col-sm-12">
            <div className="left2-box">
              <img src={Image3} alt="" />
            </div>
          </div>
          <div className="right2 col-lg-5 col-md-12 col-sm-12">
            <div className="right2-box">
              <span>Yeni kolleksiya</span>
              <h2>
                Sizin üçün mükəmməl <br /> Oturma otağı
              </h2>
              <p>
                "Holl.az" şirkəti 2023-cü ildən fəaliyyət göstərir. 17-dən çox
                mebel kateqoriyası üzrə ixtisaslaşmış olan şirkət, əsasən ofis
                mebelləri, yumşaq yataq dəstləri, funksional mətbəx müxtəlif
                dizaynlarda stol və stulların istehsalı ilə məşğuldur.
              </p>
              <NavLink className="Link" to="/products">
                Bu kolleksiyanı alın
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
