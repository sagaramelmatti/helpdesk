import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DepartmentDataService from "../../services/DepartmentDataService";

function EditDepartment(props) {
  const navigate = useNavigate(); // <-- hooks must be INSIDE the component

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState("");

  const saveDepartment = () => {
    var data = {
      name: name,
      locationId: locationId
    };
	
    DepartmentDataService.create(data)
      .then((response) => {
        navigate("/departments");
      })
      .catch((e) => {});
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
                  </div>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-flat r-btn"
                        onClick={saveDepartment}
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

export default EditDepartment;
