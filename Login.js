import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [Values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', Values)
      .then((response) => {

        const token = response.data.token;
        localStorage.setItem('authToken', token);
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrorMessage('Invalid credentials, please try again.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder='Enter Email'
              value={Values.email}
              onChange={handleChange}
              className='form-control rounded-0' 
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input 
              type="password" 
              id="password"
              name="password"
              placeholder='Enter Password' 
              value={Values.password}
              onChange={handleChange}
              className='form-control rounded-0'
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className='btn btn-success w-100 rounded-0'>
            <strong>Login</strong>
          </button>
          <p>Create an account if one does not exist</p>
          <Link to="/Signup" className='btn btn-default border w-100 bg-light rounded-0'>
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
