/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu'

function Layout({ children }) {
  const [clicked, isClicked] = useState(false);

  return (
    <div>
      <Navbar clicked={clicked} isClicked={isClicked}/>
      {clicked ?<Menu />  : null}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;