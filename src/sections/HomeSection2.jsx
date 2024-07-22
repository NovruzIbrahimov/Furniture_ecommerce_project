/* eslint-disable no-unused-vars */
import React from 'react'
import '../sections/homesection2.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Image3 from '../assets/section2leftimg.jpg'

function HomeSection2() {
  return (
    <div className='homesection2'>
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
            <h2>Sizin üçün mükəmməl <br/> Oturma otağı</h2>
            <p>Massa cras egestas laoreet montes, dapibus eu sit etiam curabitur faucibus habitasse lectus vestibulum leo, odio dolor quis maecenas faucibus vulputate pharetra nunc sed maecenas diam quisque habitasse.</p>
            <a href="">Bu kolleksiyanı alın</a>
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default HomeSection2