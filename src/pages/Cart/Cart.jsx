/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Cart/cart.css";
import { Table } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartLocally,
  clearCart,
  removeItem,
  updateQuantity,
} from "../../redux/slice/cartSlice";
import api from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Cart() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  //---------------------------------order--------------------------------------------
  const createOrder = async (values) => {
    const filteredProducts = cartItems.filter((product) => {
      const strRepresentation = JSON.stringify(product);
      return strRepresentation.startsWith("{");
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
      const responses = await api.post("/site/orders", {
        products: transformedData.products,
      });

      dispatch(clearCart());
      message.success("Your order has been registered");
      navigate("/products");
    } catch (error) {
      message.error(
        "We're sorry, but the requested product is currently out of stock"
      );
      console.error("Error creating product:", error.message);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await api.get("/site/basket");

      if (response.response.data.data.length > 0) {
        const cartItems = response.data.data.map((item) => ({
          basketId: item._id,
          id: item.productId,
          image: item.productImage,
          title: item.productTitle,
          price: item.productPrice,
          quantity: item.productCount,
        }));
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
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <div className="container mt-5 mb-4">
        <div className="row">
          {/* Cart Items Section */}
          <div className="col-lg-8 col-md-12">
            <Table responsive="sm" className="cart-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="product-header">Məhsul</th>
                  <th className="price-header">Qiymət</th>
                  <th className="quantity-header">Say</th>
                  <th className="subtotal-header">Cəmi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="product-image">
                        <img src={item.image} alt={item.title} />
                      </td>
                      <td className="product-title">{item.title}</td>
                      <td className="product-price">{item.price} AZN</td>
                      <td className="product-quantity">
                        <div className="quantity-control">
                          <button onClick={() => handleDecrement(item.id)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrement(item.id)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        {item.price * item.quantity} AZN
                      </td>
                      <td className="remove-item">
                        <i onClick={() => handleRemoveItem(item)}>
                          <BsX />
                        </i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Səbətiniz boşdur
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Cart Summary Section */}
          <div className="col-lg-4 col-md-12">
            <div className="summary-container">
              <h3 className="summary-header">Səbət Cəmi</h3>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Ara cəmi</span>
                  <span>{calculateSubtotal()} AZN</span>
                </div>
                <div className="summary-item">
                  <span>Cəm</span>
                  <span>{calculateTotal()} AZN</span>
                </div>
                <div className="summary-item">
                  <span>Kupon var?</span>
                </div>
              </div>
              <div className="checkout-button">
                <button onClick={() => createOrder()}>Yoxlamaq</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
