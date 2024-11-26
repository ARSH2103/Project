import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ token }) => {
    // State for holding the  information
    const [updatedInfo, setUpdatedInfo] = useState({
        username: '',
        firstname: '',
        lastname: '',
        current_year: '',
        branch: '',
        password: ''
    });

    // Fetch user info when the component mounts
    useEffect(() => {
        axios.post('http://localhost:5000/dashboard', { token })
            .then(response => {

                setUpdatedInfo({
                    username: response.data.username,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    current_year: response.data.current_year,
                    branch: response.data.branch,
                    password: ''
                });
            })
            .catch(error => {
                console.error('Error in fetching dashboard information', error);
            });
    }, [token]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUpdatedInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/dashboard', { token, updatedInfo });
            
        } catch (error) {
            console.error('Error updating dashboard information', error);
        }
    };

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Update Profile</h2>
                    <form onSubmit={handleUpdate}>
                        <div className='mb-3'>
                            <label htmlFor="username"><strong>Username</strong></label>
                            <input
                                type="text"
                                name="username"
                                value={updatedInfo.username}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                placeholder='Enter Username'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="firstname"><strong>First Name</strong></label>
                            <input
                                type="text"
                                name="firstname"
                                value={updatedInfo.firstname}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                placeholder='Enter First Name'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="lastname"><strong>Last Name</strong></label>
                            <input
                                type="text"
                                name="lastname"
                                value={updatedInfo.lastname}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                placeholder='Enter Last Name'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="current_year"><strong>Current Year</strong></label>
                            <input
                                type="number"
                                name="current_year"
                                value={updatedInfo.current_year}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                placeholder='Enter Your Current Year'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="branch"><strong>Branch</strong></label>
                            <input
                                type="text"
                                name="branch"
                                value={updatedInfo.branch}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                placeholder='Enter Your Branch'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                type="password"
                                name="password"
                                value={updatedInfo.password}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                placeholder='Enter Password'
                            />
                        </div>
                        <button type="submit" className='btn btn-success w-100 rounded-0 '>
                            <strong>Update</strong>
                        </button>
                        
                        <button type="Add Notes" className='btn btn-success w-100 rounded-0 mt-2'>
                            <strong>Add Notes</strong>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
