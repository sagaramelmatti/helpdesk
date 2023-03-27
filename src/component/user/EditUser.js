import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDataService from '../../services/UserDataService';
import {Link, Routes, Route, useParams, useNavigate} from 'react-router-dom'

function EditUser(props) {

    const { id }= useParams();
    let navigate = useNavigate();

    const initialUserState = {
        id: null,
        username: "",
        password: "",
        email: "",
        name: "",
        departmentId: "",
        status: "",
      };

    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

    const getUser = id => {
        UserDataService.get(id)
        .then(response => {
            console.log('response ='+response.data);
            setCurrentUser(response.data);
           
        })
        .catch(e => {
            console.log(e);
        });
    };

  useEffect(() => {
    if (id)
      getUser(id);
  }, [id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
            navigate('/customers');
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };


    return (
        <>
            {currentUser ? (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New User</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> User Master</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">User Name</label>
                                                <input type="text" className="form-control" name="username" value={currentUser.username} onChange={handleInputChange} />
                                                <input type="text" className="form-control" name="id" value={currentUser.id}  />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Contact Number</label>
                                                <input type="text" className="form-control" name="contactNo" value={currentUser.contactNo} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Address</label>
                                                <input type="text" className="form-control" name="address" value={currentUser.address }  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group required">
                                                <label className="control-label">City</label>
                                                <input type="text" className="form-control" name="city" value={currentUser.city} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Pin</label>
                                                <input type="text" className="form-control" name="pin" value={currentUser.pin} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" name="stateId" value={currentUser.stateId} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="email" value={currentUser.email} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>PAN</label>
                                                <input type="text" className="form-control" name="pan" value={currentUser.pan}  onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label>Current Outstanding Balance</label>
                                                <input type="text" className="form-control" name="totalOutBal" value={currentUser.totalOutBal} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-success btn-block btn-flat r-btn" onClick={updateUser}>Save</button>
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
            ) : (
                <div>
                  <br />
                  <p>Please click on a User...</p>
                </div>
              )}
        </>
    );
}

export default EditUser;