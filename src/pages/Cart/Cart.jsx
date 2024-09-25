/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Cart/cart.css";
import { Table } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {addToCartLocally, clearCart,removeItem,updateQuantity,} from "../../redux/slice/cartSlice";
import api from '../../config/axiosConfig';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Cart() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  //---------------------------------order--------------------------------------------
  const createOrder = async (values) => {
  const filteredProducts = cartItems.filter(product => {
    const strRepresentation = JSON.stringify(product);
    return strRepresentation.startsWith('{');
  });

    const transformedData = {
      products: filteredProducts.map((product) => ({
        productId: product.id,
        productCount: product.quantity,
      })),
    };

    if (!token) {
      navigate("/login");
    }


    try {
      const responses = await api.post(
        "/site/orders",
        {
          products: transformedData.products,
        },
      );

      dispatch(clearCart());
      message.success("Your order has been registered");
      navigate("/products");
    } catch (error) {
      message.error("We're sorry, but the requested product is currently out of stock");
      console.error("Error creating product:", error.message);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await api.get("/site/basket");

      
      if(response.response.data.data.length >0) {
        const cartItems = response.data.data.map(item =>
          ({
        basketId: item._id,
        id: item.productId,
        image: item.productImage, 
        title: item.productTitle, 
        price: item.productPrice,
        quantity: item.productCount,
      })
      );
      }
      
      dispatch(addToCartLocally(cartItems)); 
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCartItems();
      
    }
  }, [token]);

  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem({ item }));
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="cart-section">
      <div className="container mt-5 mb-4">
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <Table responsive="sm" className="table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th className="custom-th">Məhsul</th>
                  <th className="custom-th">Qiymət</th>
                  <th className="custom-th">Say</th>
                  <th className="custom-th">Ara cəmi</th>
                  <th className="custom-th"></th>
                </tr>
              </thead>
              <tbody className="body-text">
                {cartItems.map((item) => (
                  <tr className="tr-text" key={item.id}>
                    <td></td>
                    <td className="product-td-image">
                      <img src={item.image} alt="" />
                    </td>
                    <td className="product-td">
                      <p>{item.title}</p>
                    </td>
                    <td className="product-td">
                      <span>{item.price} AZN</span>
                    </td>
                    <td className="product-td">
                      <div className="d-flex  align-items-center">
                        <button
                          className="btn"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="product-td">
                      <span>{item.price * item.quantity} AZN</span>
                    </td>
                    <td className="product-td">
                      <i
                        className="bsx-icon"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <BsX />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {cartItems.length === 0 && <h2>Səbətiniz boşdur</h2>}
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <Table striped>
              <thead>
                <tr>
                  <th></th>
                  <th className="custom-th-custom">Səbət cəmi</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td className="product-td-product">Ara cəmi</td>
                  <td className="product-td-product">
                    <span>{calculateSubtotal()} AZN</span>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td className="product-td-product">Cəm</td>
                  <td className="product-td-product">
                    <span>{calculateTotal()}</span>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <p>Kupon var?</p>
                  </td>
                  <td className="product-td-product"></td>
                  <td></td>
                </tr>
                <tr style={{ height: "150px" }}>
                  <td></td>
                  <td>
                    <div
                      className="checkout"
                      style={{ marginTop: "50px", textAlign: "center" }}
                    >
                      <button onClick={() => createOrder()}>Yoxlamaq</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
