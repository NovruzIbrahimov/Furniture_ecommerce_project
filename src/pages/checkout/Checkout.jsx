/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../pages/checkout/checkout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, closeCartSidebar } from "../../redux/slice/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.items.length);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const [formData, setFormData] = useState({
    usernameEmail: "",
    firstName: "",
    surname: "",
    companyName: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = () => {
    const order = {
      userData: { ...formData },
      items: [...cartItems],
      total: calculateSubtotal(),
      orderId: Date.now(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    cartItems.forEach((item) => {
      dispatch(removeItem({ id: item.id }));
    });

    dispatch(closeCartSidebar());
    alert("Order placed successfully!");
    setFormData({
      usernameEmail: "",
      firstName: "",
      surname: "",
      companyName: "",
      phone: "",
    });
  };

  return (
    <>
      <div className="text-heading">
        <div className="container">
          <h2>WELCOME CHECKOUT PAGE</h2>
        </div>
      </div>
      <div
        className="checkout-section-main"
        style={{ margin: "-10px 0 0 0" }}
      >
        <div className="container " style={{ padding: "100px 0 100px 0" }}>
          <div className="row">
            <div className="col-md-6 col-lg-8 col-sm-12">
              <form>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username or Email"
                    name="usernameEmail"
                    value={formData.usernameEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <h2>Billing Details</h2>
                <div className="form-row">
                  <div className="form-group mt-4 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mt-4 col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Surname"
                      name="lastName"
                      value={formData.surname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-4 mb-5">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </form>
            </div>

            <div className="col-md-6 col-lg-4 col-sm-12 product-info-section">
              <div className="container" style={{ border: "1px solid #ffffff", backgroundColor: "#ffffff" }}>
                <div className="info-top d-flex justify-content-between align-items-center">
                  <div className="info-top-left">
                    <p>Product</p>
                  </div>
                  <div className="info-top-right">
                    <p>Subtotal</p>
                  </div>
                </div>
                <div className="info-second ">
                  {cartItems.map((item) => (
                    <div
                      className="info-second-content d-flex justify-content-between align-items-center"
                      key={item.id}
                    >
                      <div className="info-second-left">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="info-second-middle">
                        <p>{item.quantity}</p>
                      </div>
                      <div className="info-second-right">
                        <p>${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="info-third d-flex justify-content-between align-items-center">
                  <div className="info-third-left">
                    <p>Subtotal</p>
                  </div>
                  <div className="info-third-right">
                    <p>${calculateSubtotal()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
