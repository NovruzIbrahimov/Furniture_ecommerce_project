/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Detail/detail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import api from "../../config/axiosConfig";
import { message } from "antd";
import { addToCartLocally } from "../../redux/slice/cartSlice";

function Detail() {
  const [quantity, setQuantity] = useState(1);
  const { _id } = useParams();
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //------------------------------------ADD TO CART FUNKSIYASI-------------------------------------
  const addBasket = async (id, count) => {
    try {
      await api
        .post("/site/basket", {
          basket: [
            {
              productId: id,
              productCount: count,
            },
          ],
        })
        .then(() => {
          message.success("added to basket");
          navigate("/products");
          window.location.reload();
        });

    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error(error.message);
      }
      console.error("Error creating product:", error.message);
    }
  };

  // const updateBasket = async (id, count) => {
  //   try {
  //     await api.put(`/site/basket/${id}`, {
  //       basket: [
  //         {
  //           productCount: count,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("Error creating product:", error.message);
  //   }
  // };

  const handleAddToCart = async () => {
    if (products && token) {
      addBasket(products._id, quantity);
    } else {
      const newItem = {
        id: products._id,
        image: products.images[0].url,
        title: products.title,
        price: products.productPrice,
        quantity,
      };
      dispatch(addToCartLocally(newItem));
      message.success("Item added to cart locally!");
    }
  };

  //-------------------------------------ARTMA FUNKSIYASI-------------------------------------------
  const increment = () => {
    setQuantity(quantity + 1);
  };
  //-------------------------------------AZALMA FUNKSIYASI-------------------------------------------
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  //--------------------------------------AXIOS GET METODU------------------------------------------
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/site/products/${_id}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  //-------------------------------------LOADING----------------------------------------------------
  if (!products) {
    return (
      <div className="detail">
      <div className="container">
        <div className="row">
          <div className="col-md-6 detail-left">
            <div className="left-detail">
              <img className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-detail">
              <h1 className="loading-box"></h1>
              <h2 className="loading-box"></h2>
              <p className="loading-box"></p>
            </div>
          </div>
        </div>
      </div>
      </div>

    );
  }

  return (
    <div className="detail">
      <div className="container">
        <div className="row">
          <div className="col-md-6 detail-left">
            <div className="left-detail">
              <img src={products.images[0].url} className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-detail">
              <h1>{products.title}</h1>
              <h2>{products.productPrice}AZN</h2>
              <p>{products.description}</p>
              <div className="d-flex  align-items-center">
                <button className="btn " onClick={decrement}>
                  -
                </button>
                <span>{quantity}</span>
                <button className="btn " onClick={increment}>
                  +
                </button>
              </div>
              <Link>
                <button className="btn btn-one mt-3" onClick={handleAddToCart}>
                  Səbətə əlavə et
                </button>
              </Link>
              <Link to={`/cart`}>
                <button className="btn btn-second mt-3">Səbətə get</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="description" title="Təsviri">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12"></div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="description-content">
                    <h3>Xüsusiyyətləri</h3>
                    <p>
                      Ut at ante diam. Vestibulum tincidunt lacus quis odio
                      iaculis, nec iaculis ipsum hendrerit. Curabitur nec
                      fringilla sem. Nullam at diam et ligula tincidunt luctus.
                      Ut fringilla vitae orci eget suscipit. Etiam ultricies
                      justo ac feugiat dignissim.
                    </p>
                    <ul>
                      <li>Etiam eu tortor tempor, malesuada</li>
                      <li>Nunc vitae erat sit amet neque varius</li>
                      <li>Lorem ipsum dolor sit amet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="review" title="Baxış(0)">
            <div className="container">
              <div className="review-content">
                <h2>Be the first to review “Brown Living Room Sofa”</h2>
                <p>
                E-poçt ünvanınız dərc olunmayacaq. Tələb olunan sahələr qeyd olunub *
                </p>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Mətn sahəsi</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ad</Form.Label>
                    <Form.Control type="text" placeholder="Ad" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Yoxlayın" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>E-poçt</Form.Label>
                    <Form.Control type="email" placeholder="E-poçtu daxil edin" />
                    <Form.Text className="text-muted">
                    E-poçtunuzu heç vaxt başqası ilə paylaşmayacağıq.
                    </Form.Text>
                  </Form.Group>

                  <Button  type="submit">
                    Təqdim et
                  </Button>
                </Form>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Detail;
