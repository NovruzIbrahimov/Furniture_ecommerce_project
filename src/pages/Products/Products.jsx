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
import api from "../../config/axiosConfig";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

function Products() {
  const [isLoading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const perPage = 15;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inStockFilter, setInStockFilter] = useState(false);
  const [outOfStockFilter, setOutOfStockFilter] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("A to Z");

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    searchQuery,
    inStockFilter,
    outOfStockFilter,
    minPrice,
    maxPrice,
  ]);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `/site/products?page=${currentPage}&perPage=${perPage}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${searchQuery}${
          inStockFilter ? "&stock=inStock" : ""
        }${outOfStockFilter ? "&stock=outOfStock" : ""}`
      );

      setProducts(response.data.data.product);
      setFilteredProducts(response.data.data.product);
      setTotalProducts(response.data.data.totalProducts);

      const brandsResponse = await api.get("/site/brands");
      setBrandList(brandsResponse.data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [selectedBrands, products]);

  const handleFilter = () => {
    if (
      currentPage === 1 &&
      searchQuery === "" &&
      !inStockFilter &&
      !outOfStockFilter &&
      selectedBrands.length === 0 &&
      minPrice === "" &&
      maxPrice === ""
    ) {
      return;
    }
    setCurrentPage(1);
    fetchData();
  };

  const handleBrandFilter = (brandId) => {
    const updatedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(updatedBrands);
  };

  const filterProducts = () => {
    const filtered = products.filter((product) =>
      selectedBrands.length === 0
        ? true
        : selectedBrands.includes(product.brandId)
    );

    setFilteredProducts(filtered);
  };

  const handleSort = (sortOption) => {
    setSelectedSort(sortOption);
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "A to Z":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z to A":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Low to High":
        sorted.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "High to Low":
        sorted.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  const getBrandName = (brandId) => {
    const brand = brandList.find((b) => b._id === brandId);
    return brand ? brand.name : "Unknown Brand";
  };

  const openModal = (_id) => {
    setSelectedProductId(_id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  const totalPages = Math.ceil(totalProducts / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="products-section">
      <div className="container">
        {isLoading ? (
          <div className="loading-spinner">
            <BounceLoader color="#f3f013" size={60} speedMultiplier={2} />
          </div>
        ) : (
          <>
            <div className="products-top">
              <div
                className="products-top-left"
                onClick={() => setSidebarOpen(true)}
              >
                <Link to="">
                  <FaBars style={{ marginRight: "8px", fontSize: "16px" }} />
                  OPTIONS
                </Link>
              </div>

              {isSidebarOpen && (
                <div className="sidebar-menu">
                  <div className="close-icon">
                    <Link
                      to=""
                      className="bars"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <BsX />
                    </Link>
                  </div>
                  <div className="sidebar-top ">
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className="sidebar-middle mt-5">
                    <p>Filter by price</p>
                    <button onClick={handleFilter}>FILTER</button>
                    <div className="minMaxInputContainer">
                      <label>
                        Min:
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </label>

                      <label>
                        Max:
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="sidebar-middle-2 mt-4">
                    <Form.Group controlId="stockFilter">
                      <Form.Check
                        type="checkbox"
                        label="In Stock"
                        checked={inStockFilter}
                        onChange={() => setInStockFilter(!inStockFilter)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Out of Stock"
                        checked={outOfStockFilter}
                        onChange={() => setOutOfStockFilter(!outOfStockFilter)}
                      />
                    </Form.Group>
                  </div>
                  <div className="sidebar-bottom mt-4">
                    <p>Product categories</p>
                    <Form.Group controlId="stockFilter">
                      {brandList.map((brand) => (
                        <Form.Check
                          key={brand._id}
                          type="checkbox"
                          label={brand.name}
                          checked={selectedBrands.includes(brand._id)}
                          onChange={() => handleBrandFilter(brand._id)}
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
                    value={selectedSort}
                    onChange={(e) => handleSort(e.target.value)}
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
                      {products.images[0] && (
                        <img src={products.images[0].url} alt="Product Image" />
                      )}
                    </NavLink>

                    <div className="card-body">
                      <p>
                        {brandList.length
                          ? getBrandName(products.brandId)
                          : "Loading..."}
                      </p>
                      <h2>{products.title}</h2>
                      <h2>Stock: {products.stock}</h2>
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
                                <div className="d-flex  align-items-center"></div>
                                <Link to={`/cart`}>
                                  <button className="btn btn-one mt-3">
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

            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
