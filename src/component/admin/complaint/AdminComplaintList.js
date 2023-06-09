import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import {
  sendAdminComplaint,
  getLocationList,
  getUsers,
  getAdminComplaints,
} from "../../../api/CommonApi";
import PageLoader from "../../common/PageLoader";
import { filterFormFields, complaintStatusList } from "../../constants";

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

function AdminComplaintList(props) {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const locationId = localStorage.getItem("locationId");
  const [departmentList, setDepartmentList] = useState({});
  const [locationList, setLocationList] = useState({});
  const [userList, setUserList] = useState({});
  const [filterParams, setFilterParams] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  useEffect(() => {
    getComplaints();
  }, [locationId]);

  useEffect(() => {
    getLocationList().then((response) => {
      if (response?.status === 200) {
        const locationListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setLocationList(locationListTemp);
      }
    });

    getUsers().then((response) => {
      if (response?.status === 200) {
        const userListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setUserList(userListTemp);
        return response?.data;
      }
    });
  }, []);

  // get complaints
  const getComplaints = (filterFormFieldsParams) => {
    setIsLoading(true);
    getAdminComplaints(filterFormFieldsParams).then((response) => {
      setIsLoading(false);
      if (response.status === 200) {
        setComplaints(response?.data);
      }
    });
  };

  const onDelete = async (id) => {
    axios.delete(`/admin/complaints/${id}`).then(() => {
      getComplaints();
    });
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

  const showOptionsList = (formFieldKey) => {
    switch (formFieldKey) {
      case "userId":
        return userList;
      case "locationId":
        return locationList;
      case "status":
        return complaintStatusList;
      default:
        return "";
    }
  };

  const findSelectedValue = (keyParam) => {
    const listName = showOptionsList(keyParam);
    if (listName?.length && filterParams?.[keyParam]) {
      const selectedList = listName?.find(
        (item) => item?.value === filterParams?.[keyParam]
      );
      return selectedList;
    }
    return "";
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Complaint List</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Complaint List</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    {filterFormFields?.map((formField) => {
                      return (
                        <div className="col-xs-2">
                          <label className="control-label">
                            {formField?.label}
                          </label>
                          <Select
                            onChange={(e) =>
                              setFilterParams({
                                ...filterParams,
                                [formField.key]: e.value,
                              })
                            }
                            options={showOptionsList(formField?.key)}
                            value={findSelectedValue(formField?.key)}
                          />
                        </div>
                      );
                    })}
                    <div className="col-xs-2">
                      <br />
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          getComplaints(filterParams);
                        }}
                      >
                        <i className="glyphicon glyphicon-search"></i> Search
                      </button>
                      <button
                        className="btn btn-default"
                        onClick={() => {
                          setFilterParams({});
                          getComplaints(null);
                        }}
                      >
                        <i className="glyphicon glyphicon-refresh"></i> Clear
                      </button>
                    </div>
                  </div>
                  <br />
                  <br />
                  {modalIsOpen ? (
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <h5 className="modal-title">Comment</h5>
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
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  id="inputComment"
                                  rows="2"
                                  value={commentMessage}
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

                  <br />
                  <table
                    id="table"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th width="4%">Sr. No. </th>
                        <th width="8%">Complaint Date</th>
                        <th width="8%">Resolved Date</th>
                        <th width="5%%">Ticket Number</th>
                        <th width="10%">Subject</th>
                        <th width="15%">Description</th>
                        <th width="10%">User Name</th>
                        <th width="10%">Location</th>
                        <th width="5%">Department</th>
                        <th width="10%">Comment</th>
                        <th width="5%">Status</th>
                        <th width="15%">Action</th>
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
                            <td>{complaint?.user.name}</td>
                            <td>{complaint?.location?.name}</td>
                            <td>{complaint?.department?.name}</td>
                            <td>{complaint?.comment}</td>
                            <td>{complaint?.status}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                data-toggle="modal"
                                onClick={() => {
                                  setModalIsOpen(true);
                                  setComplaintId(complaint?.id);
                                }}
                              >
                                <i className="fa fa-pencil"></i>{" "}
                              </button>
                              &nbsp; &nbsp;
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
                              </button>{" "}
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

export default AdminComplaintList;
