import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axiosInstance";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import {
  sendSupervisorComplaint,
  getAdminComplaints,
} from "../../api/CommonApi";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function SupervisorComplaints(props) {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const locationId = localStorage.getItem("locationId");
  const userId = localStorage.getItem("userId");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  useEffect(() => {
    getComplaints();
  }, [userId]);

  // get complaints
  const getComplaints = () => {
    axios
      .get(`/supervisor/locations/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setComplaints(response?.data);
        }
      })
      .catch((error) => {});
  };

  const onDelete = (id) => {
    axios.delete(`/supervisor/complaints/${id}`).then(() => {
      getComplaints();
    });
  };

  const sendComplaints = (statusParam) => {
    setIsLoading(true);
    const complaintChangeData = {
      status: statusParam,
      comment: commentMessage,
    };
    sendSupervisorComplaint(complaintChangeData, complaintId).then(
      (response) => {
        if (response?.status === 200) {
          console.log("status"+response?.status);
          setIsLoading(false);
          getComplaints();
          toast.success("Status Updated");
        }
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Location Incharge Complaint List</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Complaint List</h3>
                </div>
                <div className="box-body">
                  {modalIsOpen ? (
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h6 className="modal-title">Comment</h6>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              onClick={() => {
                                setComplaintId("");
                                setModalIsOpen(false);
                              }}
                            >
                              &times;
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
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
                                sendComplaints("Resolved");
                                setCommentMessage("");
                                setModalIsOpen(false);
                              }}
                            >
                              Resolved
                            </button>
                            <button
                              type="button"
                              data-dismiss="modal"
                              className="btn btn-danger"
                              onClick={() => {
                                setComplaintId("");
                                sendComplaints("Reject");
                                setCommentMessage("");
                                setModalIsOpen(false);
                              }}
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              className="btn btn-default"
                              data-dismiss="modal"
                              onClick={() => {
                                setComplaintId("");
                                setCommentMessage("");
                                setModalIsOpen(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  ) : (
                    ""
                  )}
                  {/* <div id="supervisorMyModal" className="modal fade">
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
                              sendComplaints("Resolved");
                              setCommentMessage("");
                            }}
                          >
                            Resolved
                          </button>
                          <button
                            type="button"
                            data-dismiss="modal"
                            className="btn btn-danger"
                            onClick={() => {
                              setComplaintId("");
                              sendComplaints("Reject");
                              setCommentMessage("");
                            }}
                          >
                            Reject
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
                  </div> */}
                  <br />
                  <table
                    id="table"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Sr. No. </th>
                        <th width="10%">Complaint Date</th>
                        <th width="10%">Resolved Date</th>
                        <th width="10%">Ticket Number</th>
                        <th width="10%">Subject</th>
                        <th width="10%">Description</th>
                        <th width="10%">User Name</th>
                        <th width="10%">Comment</th>
                        <th width="10%">Status</th>
                        {/* <th width="5%">Change Status</th> */}
                        <th width="10%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints &&
                        complaints.map((complaint, index) => (
                          <tr key={complaint?.id}>
                            <td> {++index} </td>
                            <td>{complaint?.complaint_added_date} </td>
                            <td>{complaint?.complaint_resolved_date} </td>
                            <td>{complaint?.ticketNumberSequance}</td>
                            <td>{complaint?.title}</td>
                            <td>{complaint?.description}</td>
                            <td>{complaint?.user?.name}</td>
                            <td>{complaint?.comment}</td>
                            <td>{complaint?.status}</td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => {
                                  setComplaintId(complaint?.id);
                                  setModalIsOpen(true);
                                }}
                              >
                                <i className="fa fa-pencil"></i>{" "}
                              </button>
                              {/* <button
                                href="#supervisorMyModal"
                                className="btn btn-primary"
                                data-toggle="modal"
                                onClick={() => {
                                  setComplaintId(complaint?.id);
                                  // setCommentMessage(complaint?.comment);
                                }}
                              >
                                Change{" "}
                              </button> */}
                              {/* </td>
                            <td> */}
                              {/* <button
                                className="btn btn-warning"
                                onClick={() =>
                                  navigate(
                                    `/supervisor/complaints/${complaint.location?.id}/${complaint?.id}`
                                  )
                                }
                              >
                                <i className="fa fa-pencil"></i>{" "}
                              </button> */}
                              &nbsp; &nbsp; &nbsp;
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  const confirmBox = window.confirm(
                                    "Do you really want to delete this Complaint?"
                                  );
                                  if (confirmBox === true) {
                                    onDelete(complaint?.id);
                                  }
                                }}
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

export default SupervisorComplaints;