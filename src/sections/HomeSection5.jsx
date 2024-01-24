/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../sections/homesection5.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import { FaRegEye, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

function HomeSection5() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    fetchData();

    const limitLetters = (elementId, maxLetters) => {
      const element = document.getElementById(elementId);
      if (element) {
        const text = element.textContent.trim();
        if (text.length > maxLetters) {
          element.textContent = text.slice(0, maxLetters) + "...";
        }
      }
    };

    products.forEach((products) => {
      limitLetters(`brandId1_${products._id}`, 20);
      limitLetters(`title2_${products._id}`, 25);
    });
  }, []);

  const getBrandName = (brandId) => {
    const brand = brandList.find((b) => b._id === brandId);
    return brand ? brand.name : "Unknown Brand";
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/site/products?page=1&perPage=8&minPrice=&maxPrice=&search=&stock=inStock",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setProducts(response.data.data.product);

      const brandsResponse = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/site/brands",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBrandList(brandsResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  

  const openModal = (_id) => {
    setSelectedProductId(_id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="homesection5">
      <div className="homesection5-top">
        <h2>
          Discover Our <br />
          Most Selling Products
        </h2>
        <a href="">VIEW ALL BEST SELLERS</a>
      </div>
      <div className="container mb-5">
        <div className="row">
          {products.map((products) => (
            <div className="col-md-6 col-lg-3 col-sm-12" key={products._id}>
              <div className="card shadow-lg">
                <NavLink to={`/detail/${products._id}`}>
                  <img src={products.images[0].url} alt="" />
                </NavLink>
                <div className="card-body">
                  <p className="single-line11" id={`brandId1_${products._id}`}>
                  {brandList.length ? getBrandName(products.brandId) : "Loading..."}
                  </p>
                  <h2 className="single-line22" id={`title2_${products._id}`}>
                    {products.title}
                  </h2>
                  <span>${products.productPrice}</span>
                </div>
                <div className="icons-container">
                  <div className="icon shopping-cart-icon">
                    <i className="icons-icons">
                      <FaShoppingCart />
                    </i>
                  </div>
                  <div
                    className="icon quick-view-icon"
                    onClick={() => openModal(products._id)}
                  >
                    <i className="icons-icons">
                      <FaRegEye />
                    </i>
                  </div>
                </div>
              </div>

              {isModalOpen && selectedProductId === products._id && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 detail-left">
                          <div className="left-detail">
                            <img
                              src={products.images[0].url}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="right-detail">
                            <h1>{products.title}</h1>
                            <h2>${products.productPrice}</h2>
                            <p className="single-line1">
                              {products.description}
                            </p>
                            <div className="d-flex  align-items-center">
                              <button className="btn " onClick={decrement}>
                                -
                              </button>
                              <span>{quantity}</span>
                              <button className="btn " onClick={increment}>
                                +
                              </button>
                            </div>
                            <Link to={`/cart`}>
                              <button className="btn btn-primary mt-3">
                                Add to Cart
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <p></p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSection5;
