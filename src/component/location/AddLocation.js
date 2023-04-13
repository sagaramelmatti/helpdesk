import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import LocationDataService from '../../services/LocationDataService';

function AddLocation(props) {

    const navigate = useNavigate() // <-- hooks must be INSIDE the component

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [headName, setHeadName] = useState("");
    const [email, setEmail] = useState("");

    const saveLocation = () => {
        var data = {
            name : name,
            headName : headName,
            email : email
        };
        LocationDataService.create(data)
          .then(response => {
            console.log(response.data);
            navigate("/locations");
          })
          .catch(e => {
            console.log(e);
          });
    };

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add New Location</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Location Master</h3>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Location Name</label>
                                                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Location Incharge</label>
                                                <input type="text" className="form-control" name="headName" value={headName} onChange={(e) => setHeadName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Incharge Email</label>
                                                <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-success btn-block btn-flat r-btn" onClick={saveLocation}>Save</button>
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

export default AddLocation;