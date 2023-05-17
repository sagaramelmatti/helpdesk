import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import {
  sendAdminComplaint,
  getDepartmentList,
  getLocationList,
  getUsers,
  getAdminComplaints,
} from "../../../api/CommonApi";
import PageLoader from "../../common/PageLoader";
import { filterFormFields, userStatusList } from "../../constants";

function AdminComplaintList(props) {
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [departmentList, setDepartmentList] = useState({});
  const [locationList, setLocationList] = useState({});
  const [userList, setUserList] = useState({});
  const [filterParams, setFilterParams] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getComplaints();
  }, []);

  useEffect(() => {
    getDepartmentList().then((response) => {
      if (response?.status === 200) {
        const departmentListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setDepartmentList(departmentListTemp);
      }
    });

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

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/admin/complaints/${id}`)
      .then(() => {
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

  const showOptionsList = (formFieldKey) => {
    switch (formFieldKey) {
      case "userId":
        return userList;
      case "locationId":
        return locationList;
      case "statusId":
        return userStatusList;
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
                  <div className="row">
                    <div className="col-xs-2">
                      <br />
                      <a href="addComplaint">
                        <button className="btn btn-success">
                          <i className="glyphicon glyphicon-plus"></i> Add
                          Complaint
                        </button>
                      </a>
                      <button
                        className="btn btn-default"
                        onClick="reload_table()"
                      >
                        <i className="glyphicon glyphicon-refresh"></i> Reload
                      </button>
                    </div>
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
                              sendComplaints("Approved");
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
                              sendComplaints("Denied");
                              setCommentMessage("");
                            }}
                          >
                            Denied
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
                          <th width="10%">Complaint Date</th>
                          <th width="10%">Resolved Date</th>
                          <th width="10%">Subject</th>
                          <th width="10%">Description</th>
                          <th width="10%">User name</th>
                          <th width="10%">User email</th>
                          <th width="5%">User location</th>
                          <th width="5%">Status</th>
                          <th width="10%">Comment</th>
                          <th width="5%">change status</th>
                          <th width="10%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {complaints?.length ? (
                          complaints.map((complaint) => (
                            <tr key={complaint?.id}>
                              <td> {complaint?.id} </td>
                              <td>{complaint?.complaint_added_date} </td>
                              <td>{complaint?.complaint_resolved_date} </td>
                              <td>{complaint?.title}</td>
                              <td>{complaint?.description}</td>
                              <td>{complaint?.user?.name}</td>
                              <td>{complaint?.user?.email}</td>
                              <td>{complaint?.location?.name}</td>
                              <td>{complaint?.department?.name}</td>
                              <td>{complaint?.status}</td>
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
                                  Change{" "}
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => onDelete(complaint?.id)}
                                >
                                  <i className="fa fa-trash-o"></i>{" "}
                                </button>{" "}
                                &nbsp;
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    navigate(`/editComplaint/${complaint?.id}`)
                                  }
                                >
                                  <i className="fa fa-pencil"></i>{" "}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colspan="10" className="text-center">
                              <h3>No records found</h3>
                            </td>
                          </tr>
                        )}
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
