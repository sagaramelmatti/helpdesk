import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axiosInstance";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function ComplaintList(props) {
  const [complaints, setComplaints] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getComplaints();
  }, [userId]);

  // get complaints
  const getComplaints = () => {
    axios
      .get(`/user/complaints/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setComplaints(response?.data);
        }
      })
      .catch((error) => {});
  };

  const onDelete = (id) => {
    axios.delete(`/user/complaints/${id}`).then(() => {
      getComplaints();
    });
  };

  const setData = (data) => {
    let { id, title, description, status } = data;
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("status", status);
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Add New Complaint</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title"> Complaint List</h3>
                </div>
                <div className="box-body">
                  <Link to="/user/complaints/add">  
                      <button className="btn btn-success">
                      <i className="glyphicon glyphicon-plus"></i> Add Complaint
                      </button> 
                  </Link> 
                  <button className="btn btn-default" onClick="reload_table()">
                    <i className="glyphicon glyphicon-refresh"></i> Reload
                  </button>
                  <br />
                  <br />
                  <table
                    id="table"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th width="5%">Sr. No. </th>
                        <th width="10%">Ticket Number</th>
                        <th width="10%">Complaint Date</th>
                        <th width="10%">Resolved Date</th>
                        <th width="15%">Subject</th>
                        <th width="20%">Description</th>
                        <th width="10%">Location</th>
                        <th width="10%">Status</th>
                        <th width="5%">Edit</th>
                        <th width="5%">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints &&
                        complaints.map((complaint,index) => (
                          <tr key={complaint?.id}>
                            <td> {++index} </td>
                            <td>{complaint?.ticketNumberSequance}</td>
                            <td>{complaint?.complaint_added_date}</td>
                            <td>{complaint?.complaint_resolved_date}</td>
                            <td>{complaint?.title}</td>
                            <td>{complaint?.description}</td>
                            <td>{complaint?.location?.name}</td>
                            <td>{complaint?.status}</td>
                            <td>
                              <Link
                                to={`/user/complaints/${complaint?.userId}/${complaint?.id}`}
                                title={"Edit"}
                              >
                                {" "}
                                <i className="fa fa-pencil-o"></i> Edit{" "}
                              </Link>
                              </td>
                              <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => onDelete(complaint?.id)}
                              >
                                <i className="fa fa-trash-o"></i>{" "}
                              </button>
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

export default ComplaintList;
