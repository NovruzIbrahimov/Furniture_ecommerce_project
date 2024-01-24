/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import "../Navbar/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "../../assets/kayuu-logo-white.svg";
import { FaShoppingCart } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { openCartSidebar, closeCartSidebar } from "../../redux/slice/cartSlice";
import { updateQuantity } from "../../redux/slice/cartSlice";
import { removeItem } from "../../redux/slice/cartSlice";
import axios from "axios";


function Navbar({ clicked, isClicked }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.items.length);
  const isCartSidebarOpen = useSelector((state) => state.cart.isSidebarOpen);
  // const [fetchedCartItems, setFetchedCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const createOrder = async (values) => {

    const transformedData = {
      products: cartItems.map(product => ({
        productId: product.id,
        productCount: product.quantity // You can adjust this count based on your requirements
      }))
    };

    if (!token) {
      navigate("/login");
    }

    const a = JSON.stringify(transformedData);
    console.log(a);
    try {
      const response = await axios.post(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/site/orders",
        {
          products: transformedData.products
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      message.success("Your order has been registered");
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const handleClicked = () => {
    isClicked(!clicked);
    console.log("clicked");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleOpenCart = () => {
    dispatch(openCartSidebar());
  };

  const handleCloseCart = () => {
    dispatch(closeCartSidebar());
  };

  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="Nav">
      <ul className="NavbarWrapper">
        <li className="NavLogo">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <img
              src={Image}
              alt=""
              style={{ width: "100px", height: "20px" }}
            />
          </Link>
        </li>
        <li className="NavElements">
          <NavLink className="Link" to="/">
            Home
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink className="Link" to="/products">
            Products
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink className="Link" to="/rooms">
            Rooms
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink className="Link" to="/about">
            About Us
          </NavLink>
        </li>
        <li className="NavElements">
          <NavLink className="Link" to="/contact">
            Contact Us
          </NavLink>
        </li>

        <li
          className="NavElements"
          style={{ float: "right", margin: "-8px 2px 1px 2px" }}
        >
          <div className="cart-icon-container" onClick={() => handleOpenCart()}>
            <div to="" className="cart-icon">
              <FaShoppingCart />
            </div>
            <div className="cart-count">
              <span>{cartCount}</span>
            </div>
          </div>

          {isCartSidebarOpen && (
            <div className="cart-sidebar-menu">
              <div className="cart-sidebar-header d-flex justify-content-between align-items-center mt-3">
                <div className="cart-sidebar-header-left">
                  <p>Shopping Cart</p>
                </div>
                <div className="cart-sidebar-header-right">
                  <div
                    className="header-right-icon"
                    onClick={() => handleCloseCart()}
                  >
                    {" "}
                    <BsX />{" "}
                  </div>
                </div>
              </div>

              <div className="cart-sidebar-middle mb-5 mt-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="container pt-4">
                    <div className="row">
                      <div className="col-lg-2 cart-sidebar-middle-left">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="col-lg-10 cart-sidebar-middle-right">
                        <div className="middle-right-top d-flex justify-content-between align-items-center">
                          <div className="right-top-left">
                            <p>{item.title}</p>
                          </div>
                          <div className="right-top-right">
                            <i
                              className="right-top-right-icon"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <FaTrashAlt />
                            </i>
                          </div>
                        </div>
                        <div className="middle-right-bottom d-flex justify-content-between align-items-center">
                          <div className="right-bottom-left d-flex  align-items-center">
                            <button
                              className="btn "
                              onClick={() => handleDecrement(item.id)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn "
                              onClick={() => handleIncrement(item.id)}
                            >
                              +
                            </button>
                          </div>
                          <div className="right-bottom-right">
                            <p>${item.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-sidebar-footer">
                <div className="cart-sidebar-footer-top d-flex justify-content-between align-items-center">
                  <div className="footer-top-left">
                    <p>Subtotal:</p>
                  </div>
                  <div className="footer-top-right">
                    <p>${calculateSubtotal()}</p>
                  </div>
                </div>
                <div className="cart-sidebar-footer-bottom">
                  <div className="footer-bottom-top">
                    <Link to="/cart" onClick={handleCloseCart}>
                      VIEW CART
                    </Link>
                  </div>
                  <div className="footer-bottom-bottom mt-5">
                  <button onClick={() => createOrder()}>CHECKOUT</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>

        {token && (
        <li className="NavButton" onClick={handleLogout}>
          <IoLogOutOutline />
        </li>
        )}
        {!token && (
        <li className="NavButton">
          <NavLink className="Link link-register" to="/register">
            Register
          </NavLink>
        </li>
        )}
        {!token && (
        <li
          className="NavElements"
          style={{ float: "right", margin: "-8px 2px 1px 2px" }}
        >
          <NavLink className="Link" to="/login">
            Login
          </NavLink>
        </li>
        )}

      </ul>
      {!clicked ? (
        <GiHamburgerMenu onClick={handleClicked} className="Icon" />
      ) : (
        <ImCross onClick={handleClicked} className="Icon" />
      )}
    </div>
  );
}

export default Navbar;
