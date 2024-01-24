/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Products/products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars } from "react-icons/fa";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";

function Products() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const getBrandName = (brandId) => {
    const brand = brandList.find((b) => b._id === brandId);
    return brand ? brand.name : "Unknown Brand";
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minValue !== "" && maxValue !== "") {
      filtered = filtered.filter(
        (product) =>
          product.productPrice >= parseFloat(minValue) &&
          product.productPrice <= parseFloat(maxValue)
      );
    }

    if (inStock && !outOfStock) {
      filtered = filteredProducts.filter(
        (product) => product.stock === "inStock"
      );
    }

    if (!inStock && outOfStock) {
      filtered = filteredProducts.filter(
        (product) => product.stock !== "inStock"
      );
    }

    // if (inStock) {
    //   filtered = filtered.filter((product) => product.stock === "inStock");
    // }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brandId)
      );
    }

    setFilteredProducts(filtered);
  };

  //----------------------------------------AXİOS GET METODU-----------------------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/site/products?page=1&perPage=100&minPrice=&maxPrice=&search=&stock=inStock",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setProducts(response.data.data.product);
      setFilteredProducts(response.data.data.product);

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

  const openSidebar = (event) => {
    event.preventDefault();
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleBrandFilterChange = (brandId) => {
    const updatedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(updatedBrands);
  };

  const applySortingAndFiltering = () => {
    let sortedAndFiltered = [...filteredProducts];

    if (selectedBrands.length > 0) {
      sortedAndFiltered = sortedAndFiltered.filter((product) =>
        selectedBrands.includes(product.brandId)
      );
    }

    if (sortOption === "A to Z") {
      sortedAndFiltered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Z to A") {
      sortedAndFiltered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "Low to High") {
      sortedAndFiltered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOption === "High to Low") {
      sortedAndFiltered.sort((a, b) => b.productPrice - a.productPrice);
    }

    setFilteredProducts(sortedAndFiltered);
  };

  useEffect(() => {
    fetchData();
  }, [isModalOpen, selectedProductId]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, minValue, maxValue, inStock, outOfStock, selectedBrands]);

  useEffect(() => {
    applySortingAndFiltering();
  }, [sortOption, selectedBrands]);

  return (
    <div className="products-section">
      <div className="container">
        <div className="products-top">
          <div className="products-top-left" onClick={openSidebar}>
            <Link to="">
              <FaBars style={{ marginRight: "8px", fontSize: "16px" }} />
              OPTIONS
            </Link>
          </div>

          {isSidebarOpen && (
            <div className="sidebar-menu">
              <div className="close-icon">
                <Link to="" className="bars" onClick={closeSidebar}>
                  <BsX />
                </Link>
              </div>
              <div className="sidebar-top ">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="sidebar-middle mt-5">
                <p>Filter by price</p>
                <a href="" onClick={filterProducts}>
                  FILTER
                </a>
                <div className="minMaxInputContainer">
                  <label>
                    Min:
                    <input
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                    />
                  </label>

                  <label>
                    Max:
                    <input
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="sidebar-middle-2 mt-4">
                <Form.Group controlId="stockFilter">
                  <Form.Check
                    type="checkbox"
                    label="In Stock"
                    checked={inStock}
                    onChange={() => setInStock(!inStock)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Out of Stock"
                    checked={outOfStock}
                    onChange={() => setOutOfStock(!outOfStock)}
                  />
                </Form.Group>
              </div>
              <div className="sidebar-bottom mt-5">
                <p>Product categories</p>
                <Form.Group controlId="stockFilter">
                  {brandList.map((brand) => (
                    <Form.Check
                      key={brand._id}
                      type="checkbox"
                      label={brand.name}
                      checked={selectedBrands.includes(brand._id)}
                      onChange={() => handleBrandFilterChange(brand._id)}
                    />
                  ))}
                </Form.Group>
              </div>
            </div>
          )}

          <div className="products-top-right">
            <Form.Group controlId="sortOptions">
              <Form.Label>Sort By:</Form.Label>
              <Form.Control
                as="select"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option>A to Z</option>
                <option>Z to A</option>
                <option>Low to High</option>
                <option>High to Low</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row mt-5">
          {filteredProducts.map((products) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={products._id}>
              <div className="card shadow-lg">
                <NavLink to={`/detail/${products._id}`}>
                  <img src={products.images[0].url} alt="" />
                </NavLink>

                <div className="card-body">
                  <p>
                    {brandList.length
                      ? getBrandName(products.brandId)
                      : "Loading..."}
                  </p>
                  <h2>{products.title}</h2>
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

export default Products;
