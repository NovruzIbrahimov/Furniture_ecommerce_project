/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect  } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu'
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const [clicked, isClicked] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();


    useEffect(() => {
        if (user !== null && user.data.user.role !== "client") {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/');
        }
    }, [user]);

  return (
    <div>
      <Navbar clicked={clicked} isClicked={isClicked}/>
      {clicked ?<Menu />  : null}
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;