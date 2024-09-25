/* eslint-disable no-unused-vars */
import React from 'react'
import '../sections/homesection7.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Image71 from '../assets/section7-icon1.png'
import Image72 from '../assets/section7-icon2.png'
import Image73 from '../assets/section7-icon3.png'
import Image74 from '../assets/section7-icon4.png'

function HomeSection7() {
  return (
    <div className='homesection7'>
      <div className="homesection7-top">
        <h2>Niyə bizi seçirsiniz</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
           <img src={Image71} alt="" />
           <h5>Böyük endirimlər</h5>
           <p>Holl.az onlayn mebel mağazasında yataq dəstindən yumşaq mebelə qədər sərfəli və keyfiyyətli ev mebeli ala bilərsiniz.</p>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Image72} alt="" />
           <h5>Rahat çatdırılma</h5>
           <p>Holl.az onlayn mebel mağazasında yataq dəstindən yumşaq mebelə qədər sərfəli və keyfiyyətli ev mebeli ala bilərsiniz.</p>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Image73} alt="" />
           <h5>Kartla ödəniş</h5>
           <p>Holl.az onlayn mebel mağazasında yataq dəstindən yumşaq mebelə qədər sərfəli və keyfiyyətli ev mebeli ala bilərsiniz.</p>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Image74} alt="" />
           <h5>Rahat məkan</h5>
           <p>Holl.az onlayn mebel mağazasında yataq dəstindən yumşaq mebelə qədər sərfəli və keyfiyyətli ev mebeli ala bilərsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection7