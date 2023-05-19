import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  sendUserComplaint,
  getLocationList,
  getDepartmentList,
  getUsers,
} from "../../api/CommonApi";
import PageLoader from "../common/PageLoader";
import { filterFormFields, userStatusList } from "../constants";

const page = "user_list";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locationList, setLocationList] = useState({});
  const [departmentList, setDepartmentList] = useState({});
  const [userOptionList, setUserOptionList] = useState({});
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    getLocationList().then((response) => {
      if (response?.status === 200) {
        const locationListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setLocationList(locationListTemp);
      }
    });

    getDepartmentList().then((response) => {
      if (response?.status === 200) {
        const departmentListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setDepartmentList(departmentListTemp);
      }
    });
  }, []);

  // get users
  const getUsersData = (filterParamsFields) => {
    setIsLoading(true);
    getUsers(filterParamsFields).then((response) => {
      setIsLoading(false);
      if (response.status === 200) {
        const userListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setUserOptionList(userListTemp);
        setUsers(response?.data);
      }
    });
  };

  const onDelete = (id) => {
    axios.delete(`/admin/users/${id}`).then(() => {
      getUsersData();
    });
  };

  const setData = (data) => {
    let { id, username, name, email, departmentId, status } = data;
    localStorage.setItem("id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("departmentId", departmentId);
    localStorage.setItem("status", status);
  };

  const sendComplaints = (statusParam) => {
    const complaintChangeData = {
      status: statusParam,
      // comment: commentMessage,
    };

    sendUserComplaint(complaintChangeData, complaintId).then((response) => {
      if (response?.status === 200) {
        toast.success("Status Updated");
        setIsLoading(false);
        getUsersData();
      }
      setIsLoading(false);
    });
  };

  const showOptionsList = (formFieldKey) => {
    switch (formFieldKey) {
      case "departmentId":
        return departmentList;
      case "userId":
        return userOptionList;
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
          <h1>Add New User</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title"> User List</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-4">
                      <br />
                      <a href="addUser">
                        <button className="btn btn-success">
                          <i className="glyphicon glyphicon-plus"></i> Add User
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
                      if (formField?.pageName?.includes(page))
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
                      <label className="control-label"></label>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          getUsersData(filterParams);
                        }}
                      >
                        <i className="glyphicon glyphicon-search"></i> Search
                      </button>
                      <button
                        className="btn btn-default"
                        onClick={() => {
                          setFilterParams({});
                          getUsersData(null);
                        }}
                      >
                        <i className="glyphicon glyphicon-refresh"></i> Clear
                        Search
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
                              <label for="inputComment">Comments</label>
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
                          <th width="10%">Sr. No </th>
                          <th width="20%">Name</th>
                          <th width="20%">Email</th>
                          <th width="20%">Department</th>
                          <th width="20%">Location</th>
                          <th width="10%">Status</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.length ? (
                          users.map((user,index) => (
                            <tr key={user?.id}>
                              <td> {++index} </td>
                              <td>{user?.name}</td>
                              <td>{user?.email}</td>
                              <td>{user?.department?.name}</td>
                              <td>{user?.location?.name}</td>
                              <td>
                                {user?.status === "A" ? "Active" : "Denied"}
                              </td>
                              <td>
                                <Link to={"/users/" + user?.id} title={"Edit"}>
                                  {" "}
                                  Edit{" "}
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => onDelete(user?.id)}
                                >
                                  <i className="fa fa-trash-o"></i> Delete{" "}
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

export default UserList;
