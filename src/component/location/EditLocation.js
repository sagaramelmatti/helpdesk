import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import LocationDataService from '../../services/LocationDataService';

import {
    getLocationList,
} from "../../api";


function EditLocation(props) {

    const { id } = useParams();
    let navigate = useNavigate();

    const initialLocationState = {
        id: null,
        name: "",
        email: "",
        headName: ""
    };

    const [location, setCurrentLocation] = useState(initialLocationState);
    const [message, setMessage] = useState("");

    const getLocation = id => {
        LocationDataService.get(id)
            .then(response => {
                console.log('response =' + response.data);
                setCurrentLocation(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getLocation(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentLocation({ ...location, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        LocationDataService.update(location.id, location)
            .then(response => {
                console.log(response.data);
                navigate("/locations");
                setMessage("The Location has been updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    }


    return (
        <>
            {location ? (
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="box-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group required">
                                                        <label className="control-label">Location Name</label>
                                                        <input type="text" className="form-control" name="name" value={location.name} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group required">
                                                        <label className="control-label">Incharge Name</label>
                                                        <input type="text" className="form-control" name="headName" value={location.headName} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group required">
                                                        <label className="control-label">Incharge Email</label>
                                                        <input type="text" className="form-control" name="email" value={location.email} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                </div>
                                                <div className="col-md-3">
                                                    <button type="submit" className="btn btn-success btn-block btn-flat r-btn">Save</button>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Location...</p>
                </div>
            )}
        </>
    );
}

export default EditLocation;