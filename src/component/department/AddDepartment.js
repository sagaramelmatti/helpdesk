import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DepartmentDataService from "../../services/DepartmentDataService";

function AddDepartment(props) {
  const navigate = useNavigate(); // <-- hooks must be INSIDE the component

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contactNo, setContactNo] = useState("");

  const saveDepartment = () => {
    var data = {
      name: name,
      address: address,
      city: city,
      contactNo: contactNo,
    };
    DepartmentDataService.create(data)
      .then((response) => {
        console.log(response.data);
        navigate("/departments");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Add New Department</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title"> Department Master</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group required">
                        <label className="control-label">Department Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group required">
                        <label className="control-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group required">
                        <label className="control-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group required">
                        <label className="control-label">Contact No</label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactNo"
                          value={contactNo}
                          onChange={(e) => setContactNo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-flat r-btn"
                        onClick={saveDepartment}
                        disabled={!name || !address || !city || !contactNo}
                      >
                        Save
                      </button>
                    </div>
                    <div className="col-md-6"></div>
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

export default AddDepartment;
