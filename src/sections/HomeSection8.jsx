/* eslint-disable no-unused-vars */
import React from "react";
import "../sections/homesection8.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image8 from "../assets/section8-img.jpg";

function HomeSection8() {
  return (
    <div className="homesection8">
      <div className="container mb-3">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 homesection8-left">
          <div className="homesection8-left-content">
            <img src={Image8} alt="" style={{width:'100%'}} />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 homesection8-right">
          <div className="homesection8-right-content">
            <span>SUBSCRIBE TO OUR NEWSLETTER</span>
            <h2>
              See The Latest Collection & <br /> Get Special Offer
            </h2>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Email address"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">SUBSCRIBE</InputGroup.Text>
            </InputGroup>
            <p>Cras interdum lectus velit nibh senectus fringilla ut.</p>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default HomeSection8;
