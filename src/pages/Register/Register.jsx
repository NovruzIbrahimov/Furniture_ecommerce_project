/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../Register/register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
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
      const response = await axios.post(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/site/register",
        {
          name: firstName,
          surname: surname,
          email: email,
          password: password,
        }
      );

      console.log("Registration successful", response.data);
      localStorage.setItem("token", "Bearer " + response.data.data.token);
      navigate("/login");

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
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Register</h3>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="mb-2">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              placeholder="Enter surname"
              className="form-control"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
