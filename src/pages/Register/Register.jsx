/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../Register/register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //-----------------------------------------------AXIOS POST METODU------------------------------------------
  const handleRegistration = async () => {
    try {
      const response = await api.post("/site/register", {
        name: firstName,
        surname: surname,
        email: email,
        password: password,
      });
      localStorage.setItem("token", "Bearer " + response.data.data.token);
      navigate("/");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    handleRegistration();
  };

  return (
    <div className="register template d-flex justify-content-center align-items-center vh-100">
      <div className="col-10 col-sm-8 col-md-6 col-lg-4 form-container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Qeydiyyat</h3>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="mb-2">
            <label htmlFor="firstName">Ad</label>
            <input
              type="text"
              placeholder="Adı daxil edin"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="surname">Soyad</label>
            <input
              type="text"
              placeholder="Soyadı daxil edin"
              className="form-control"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">E-poçt</label>
            <input
              type="email"
              placeholder="E-poçtu daxil edin"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Şifrə</label>
            <input
              type="password"
              placeholder="Şifrəni daxil edin"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-one">
              Qeydiyyatdan keç
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
