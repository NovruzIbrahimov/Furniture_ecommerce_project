/* eslint-disable no-unused-vars */
import React from "react";
import "../sections/homesection4.css";
import Image41 from "../assets/living-room-bg.jpg";
import Image42 from "../assets/bedroom-bg.jpg";
import Image43 from "../assets/kitchen-bg.jpg";
import Image44 from "../assets/bath-room-bg.jpg";

function HomeSection4() {
  return (
    <div className="homesection4">
      <div className=" img-con">
        <img src={Image41} alt="" />
        <img src={Image42} alt="" />
        <img src={Image43} alt="" />
        <img src={Image44} alt="" />
      </div>
    </div>
  );
}

export default HomeSection4;
