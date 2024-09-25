/* eslint-disable no-unused-vars */
import React from "react";
import "../sections/homesection1.css";
import { NavLink } from "react-router-dom";

function HomeSection1() {
  return (
    <div className="homesection1">
      <div className="homesection-text">
        <span>HOLL.AZ MEBEL MAĞAZASI</span>
        <h1>Özünüzü evdəki kimi hiss edin</h1>
        <p>
          Bizim missiyamız hər bir parçanın zamanın sınağından çıxmasını <br />
          təmin etmək üçün dizayn və davamlılığı <br />
          birləşdirərək ən yaxşı mebel həllərini <br />
          təklif etməkdir.
        </p>
        <NavLink className="Link" to="/products">
          İndi alış-veriş edin
        </NavLink>
      </div>
    </div>
  );
}

export default HomeSection1;
