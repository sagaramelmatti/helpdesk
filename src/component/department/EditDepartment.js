import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentDataService from "../../services/DepartmentDataService";
import { LOCATION_LIST } from "../constants";
import axios from "../../axiosInstance";

function EditDepartment(props) {

  const { id } = useParams();
  let navigate = useNavigate();

  const [location, setLocation] = React.useState([]);
  const [locationList, setLocationList] = useState({});

  React.useEffect(() => {
    async function getLocationList() {
      const response = await axios.get(LOCATION_LIST);

      console.log("response"+response);
      const body = await response.data;
      setLocationList(body.map(item => {
          return { value: item.id, label: item.name };
        }));
    }

    getLocationList();

  }, []);

  const initialDepartmentState = {
    id: null,
    name: "",
  };

  const [department, setCurrentDepartment] = useState(initialDepartmentState);
  const [message, setMessage] = useState("");

  const getDepartment = id => {
    DepartmentDataService.get(id)
      .then(response => {
        console.log('response =' + response.data);
        setCurrentDepartment(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getDepartment(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDepartment({ ...department, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    DepartmentDataService.update(department.id, department)
      .then(response => {
        console.log(response.data);
        navigate("/departments");
        setMessage("The Department has been updated successfully!");
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
                <form onSubmit={handleSubmit}>
                  <div className="box-body">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="form-group required">
                          <label className="control-label">Name</label>
                          <input type="text" className="form-control" name="name" value={department.name} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group required">
                          <label className="control-label">Location</label>
                          <select className='form-control select2' value={department.locationId} onChange={handleInputChange} >
                            <option key="" value="">Select Location</option>
                              {locationList.map(o => (
                                  <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                          </select>
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
    </>
  );
}

export default EditDepartment;
