import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axiosInstance";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function LocationList(props) {

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getLocations();
    }, []);

    // get locations
    const getLocations = () => {
        axios
            .get("/admin/locations/list")
            .then((response) => {
                if (response.status === 200) {
                    setLocations(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        axios.delete(`/admin/locations/${id}`)
        .then(() => {
            getLocations();
        })
    }

    const setData = (data) => {
        let { id, name, headName , email } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('headName', headName);
        localStorage.setItem('email', email);
    }


    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Location Details</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Location List</h3>
                                </div>
                                <div className="box-body">
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No </th>
                                                <th width="20%">Name</th>
                                                <th width="30%">Location Incharge</th>
                                                <th width="40%">Incharge Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {locations &&
                                                locations.map((locationDetails, index) => (
                                                    <tr key={locationDetails?.id} >
                                                        <td> {++index} </td>
                                                        <td>{locationDetails.location.name}</td>
                                                        <td>{locationDetails.user.name}</td>
                                                        <td>{locationDetails.user.email}</td>
                                                       
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default LocationList;