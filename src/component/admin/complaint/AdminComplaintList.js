import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { sendAdminComplaint } from "../../../api/CommonApi";
import PageLoader from "../../common/PageLoader";

function AdminComplaintList(props) {
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getComplaints();
  }, []);

  // get complaints
  const getComplaints = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/api/admin/findAllComplaints/")
      .then((response) => {
        if (response.status === 200) {
          setComplaints(response?.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8080/api/complaints/${id}`).then(() => {
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

  const sendComplaints = (statusParam) => {
    setIsLoading(true);
    const complaintChangeData = {
      status: statusParam,
      comment: commentMessage,
    };
    sendAdminComplaint(complaintChangeData, complaintId).then((response) => {
      if (response?.status === 200) {
        setIsLoading(false);
        getComplaints();
        toast.success("Status Updated");
      }
      setIsLoading(false);
    });
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
                  <a href="addComplaint">
                    <button className="btn btn-success">
                      <i className="glyphicon glyphicon-plus"></i> Add Complaint
                    </button>
                  </a>
                  <button className="btn btn-default" onClick="reload_table()">
                    <i className="glyphicon glyphicon-refresh"></i> Reload
                  </button>
                  <br />
                  <br />

                  <div id="myModal" className="modal fade">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Your Feedback</h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            onClick={() => {
                              setComplaintId("");
                            }}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="form-group">
                              <label htmlFor="inputComment">Comments</label>
                              <textarea
                                className="form-control"
                                id="inputComment"
                                rows="2"
                                value={commentMessage}
                                // value={
                                //   complaints?.find(
                                //     (complaint) => complaint?.id === complaintId
                                //   )?.comment
                                // }
                                onChange={(e) =>
                                  setCommentMessage(e.target.value)
                                }
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            data-dismiss="modal"
                            className="btn btn-success"
                            onClick={() => {
                              setComplaintId("");
                              sendComplaints("A");
                              setCommentMessage("");
                            }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            data-dismiss="modal"
                            className="btn btn-danger"
                            onClick={() => {
                              setComplaintId("");
                              sendComplaints("D");
                              setCommentMessage("");
                            }}
                          >
                            Deny
                          </button>
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            onClick={() => {
                              setComplaintId("");
                              setCommentMessage("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isLoading ? (
                    <PageLoader />
                  ) : (
                    <table
                      id="table"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Sr. No. </th>
                          <th width="20%">Title</th>
                          <th width="30%">Description</th>
                          <th width="10%">Status</th>
                          <th width="10%">Comment</th>
                          <th width="15%">change status</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaints &&
                          complaints.map((complaint) => (
                            <tr key={complaint?.id}>
                              <td> {complaint?.id} </td>
                              <td>{complaint?.title}</td>
                              <td>{complaint?.description}</td>
                              <td>
                                {complaint?.status === "A"
                                  ? "Active"
                                  : "Denied"}
                              </td>
                              <td>{complaint?.comment}</td>
                              <td>
                                <button
                                  href="#myModal"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  onClick={() => {
                                    setComplaintId(complaint?.id);
                                    setCommentMessage(complaint?.comment);
                                  }}
                                >
                                  <i className="fa fa-pencil"></i> Change{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => onDelete(complaint?.id)}
                                >
                                  <i className="fa fa-trash-o"></i> Delete{" "}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminComplaintList;
