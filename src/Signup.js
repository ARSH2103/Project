import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = values;

    if (!username || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    axios.post('http://localhost:5000/Signup', values)
      .then(response => {
        alert('Signup successful!');
        window.location.href = '/';
      })
      .catch(error => {
        alert('Error during signup, please try again.');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username"><strong>Username</strong></label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={values.username}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            <strong>Sign Up</strong>
          </button>
          <p>Already have an account? <Link to="/" className="btn btn-default border w-100 bg-light rounded-0">Log in</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
