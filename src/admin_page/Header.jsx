/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import 
 {BsJustify}
 from 'react-icons/bs';
import '../admin_page/header.css'
import { FaSearch } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { FaEnvelope } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <FaSearch style={{fontSize:'25px',color:'#EDB932'}}/>
        </div>
        <div className='header-right d-flex'>
           <GoBellFill style={{fontSize:'25px',color:'#EDB932'}}/>
           <FaEnvelope style={{fontSize:'22px',color:'#EDB932'}}/>
           <FaUser style={{fontSize:'20px',color:'#EDB932'}}/>
        </div>
    </header>
  )
}

export default Header