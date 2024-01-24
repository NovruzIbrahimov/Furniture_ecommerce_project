/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import '../../pages/admin/adminlogin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {message} from "antd";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //------------------------------------------------AXIOS POST METODU--------------------------------------
  const handleLogin = async () => {
    try {
      console.log("here login")
      const response = await axios.post('https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/login', 
      {
        email: email,
        password: password,
      });

      console.log('Login successful', response.data);

      console.log("role : " + response.data.data.user.role)
      if (response.data.data.user.role !== "client")  {
        localStorage.setItem("token", "Bearer " + response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/dashboard');
      }
      else {
        message.error('Your user is intended for user.');
      }
  
      } catch (error) {
          setErrorMessage('Incorrect email or password. Please try again.');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrorMessage('');
      handleLogin();
    };
  
    return (
      <div className='admin-login d-flex justify-content-center align-items-center vh-100'>
        <div className="form-container p-5 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Login</h3>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className='mb-2'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder='Enter Email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder='Enter Password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input type="checkbox" className='custom-control custom-checkbox' id='check' />
              <label htmlFor="check" className='custom-input-label ms-2'>
                Remember me
              </label>
            </div>
            <div className='d-grid'>
              <button type="submit" className='btn btn-primary'>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;