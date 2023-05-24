import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import DepartmentDataService from "../../services/DepartmentDataService";
import { LOCATION_LIST } from "../constants";

function AddDepartment(props) {
  const navigate = useNavigate(); // <-- hooks must be INSIDE the component

  const [location, setLocation] = React.useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locationList, setLocationList] = React.useState([]);

  React.useEffect(() => {
    async function getLocationList() {
      const response = await axiosInstance.get(LOCATION_LIST);
      const body = await response.data;
      setLocationList(body.map(item => {
          return { value: item.id, label: item.name };
        }));
    }

    getLocationList();

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
        navigate("/admin/departments");
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
                            {locationList.map(o => (
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
