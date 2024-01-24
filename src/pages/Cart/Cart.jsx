/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Cart/cart.css";
import { Table } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {clearCart,removeItem,updateQuantity,} from "../../redux/slice/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Cart() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const createOrder = async (values) => {
    const transformedData = {
      products: cartItems.map((product) => ({
        productId: product.id,
        productCount: product.quantity,
      })),
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
          products: transformedData.products,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      dispatch(clearCart());
      message.success("Your order has been registered");
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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
    return cartItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return sum + itemPrice * itemQuantity;
      } else {
        return sum;
      }
    }, 0);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemQuantity = parseInt(item.quantity);

      if (!isNaN(itemQuantity)) {
        return sum + itemQuantity;
      } else {
        return sum;
      }
    }, 0);
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
                  <th className="custom-th">Product</th>
                  <th className="custom-th">Price</th>
                  <th className="custom-th">Quantity</th>
                  <th className="custom-th">Subtotal</th>
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
                      <span>${item.price}</span>
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
                      <span>${item.price * item.quantity}</span>
                    </td>
                    <td className="product-td">
                      <i
                        className="bsx-icon"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <BsX />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {cartItems.length === 0 && <h2>Card is Empty</h2>}
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <Table striped>
              <thead>
                <tr>
                  <th></th>
                  <th className="custom-th-custom">Cart totals</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td className="product-td-product">Subtotal</td>
                  <td className="product-td-product">
                    <span>${calculateSubtotal()}</span>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td className="product-td-product">Total</td>
                  <td className="product-td-product">
                    <span>{calculateTotal()}</span>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <p>Have a coupon?</p>
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
                      <button onClick={() => createOrder()}>CHECKOUT</button>
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
