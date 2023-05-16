import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DepartmentDataService from "../../services/DepartmentDataService";

function AddDepartment(props) {
  const navigate = useNavigate(); // <-- hooks must be INSIDE the component

  const [location, setLocation] = React.useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState("");


  React.useEffect(() => {

    async function getLocations() {
      const response = await fetch("http://localhost:8081/api/locations/");
      const body = await response.json();
      setLocation(body.map(item => {
          return { value: item.id, label: item.name };
        }));
    }

    getLocations();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      name: name,
      locationId: locationId
    };

    //console.log(`data=`+data.taxId);
    DepartmentDataService.create(data)
      .then(response => {
        console.log(response.data);
        navigate("/departments");
      })
      .catch(e => {
        console.log(e);
      });
}

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
                <form method ="post" className='form' onSubmit={handleSubmit}>
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
                    <div className="col-md-6">
                      <div className="form-group required">
                        <label className="control-label">Location</label>
                        <select className='form-control select2' value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                          <option key="" value="">Select Location</option>
                            {location.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-flat r-btn"
                        >
                        Save
                      </button>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                  </form>
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
