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
            .get("/admin/locations")
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
                    <h1>Add New Location</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Location List</h3>
                                </div>
                                <div className="box-body">

                                    <Link to="/admin/locations/add"> 
                                        <button className="btn btn-success">
                                            <i className="glyphicon glyphicon-plus"></i> Add Location
                                        </button> 
                                    </Link>

                                    <button className="btn btn-default" onClick="reload_table()"><i className="glyphicon glyphicon-refresh"></i> Reload</button>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No </th>
                                                <th width="20%">Name</th>
                                                <th width="20%">Location Incharge</th>
                                                <th width="20%">Incharge Email</th>
                                                <th width="20%">Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {locations &&
                                                locations.map((location, index) => (
                                                    <tr key={location?.id} >
                                                        <td> {++index} </td>
                                                        <td>{location?.name}</td>
                                                        <td>{location?.headName}</td>
                                                        <td>{location?.email}</td>
                                                        <td>
                                                            <Link to={"/admin/locations/" + location?.id} title={"Edit"}>
                                                            {" "}
                                                            Edit{" "}
                                                            </Link>
                                                        </td>
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