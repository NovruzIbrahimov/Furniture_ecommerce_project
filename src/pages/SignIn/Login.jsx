/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../SignIn/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from '../../config/axiosConfig';
import { useNavigate } from "react-router-dom";
import {message} from "antd";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //-------------------------------------------AXIOS POST METODU--------------------------------------------
  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.data.user.role == "client")  {
        localStorage.setItem("token", "Bearer " + response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
      else {
        message.error('Sizin istifadəçi admin üçün nəzərdə tutulub.');
      }
    } catch (error) {
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    handleLogin();
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100">
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Daxil ol</h3>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
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
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Xatırla
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-one">
              Daxil ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
