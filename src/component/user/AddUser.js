import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDataService from '../../services/UserDataService';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'

function AddUser(props) {

    const navigate = useNavigate();

    const initialUserState = {
        id: null,
        username: "",
        password: "",
        email: "",
        name: "",
        departmentId: "",
        status: "",
        
      };

        const [user, setUser] = useState(initialUserState);
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(null)

        const handleInputChange = event => {
            const { name, value } = event.target;
            setUser({ ...user, [name]: value });
        };

        const saveUser = () => {
            var data = {
                username : user.username,
                password : user.password,
                email : user.email,
				name : user.name,
				departmentId : user.departmentId
            };

            UserDataService.create(data)
            .then(response => {
                console.log(response.data);
                navigate("/users");
            })
            .catch(e => {
                console.log(e);
            });
          };

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New User</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            {error && (
                                <p className="error"> {error} </p>
                            )}
                                <div className="box-header">
                                    <h3 className="box-title"> User Master</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">User Name</label>
                                                <input type="text" className="form-control" name="username" required value={user.name} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Contact Number</label>
                                                <input type="text" className="form-control" name="contactNo" required value={user.contactNo} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Address</label>
                                                <input type="text" className="form-control" name="address" value={user.address}  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group required">
                                                <label className="control-label">City</label>
                                                <input type="text" className="form-control" name="city" value={user.city} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Pin</label>
                                                <input type="text" className="form-control" name="pin" value={user.pin} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" name="departmentId" value={user.departmentId} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="email" value={user.email} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>PAN</label>
                                                <input type="text" className="form-control" name="pan" value={user.pan}  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Current Outstanding Balance</label>
                                                <input type="text" className="form-control" name="totalOutBal" value={user.totalOutBal} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-success btn-block btn-flat r-btn" onClick={saveUser}>Save</button>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AddUser;