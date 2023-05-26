import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  getLocationList,
  getDepartmentList,
  getUsers,
} from "../../api/CommonApi";
import PageLoader from "../common/PageLoader";
import { filterFormFields, userStatusList } from "../constants";

const page = "user_list";

function UserList(props) {
  const [users, setUsers] = useState([]);
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
    let { id, name, email, departmentId, locationId, status } = data;
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("departmentId", departmentId);
    localStorage.setItem("locationId", locationId);
    localStorage.setItem("status", status);
  };

  const showOptionsList = (formFieldKey) => {
    switch (formFieldKey) {
      case "userId":
        return userOptionList;
      case "locationId":
        return locationList;
      case "status":
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
                      <Link to="/admin/users/add"> <button className="btn btn-success">
                          <i className="glyphicon glyphicon-plus"></i> Add User
                        </button> </Link> 
                        
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
                                {user?.status === "A" ? "Active" : "Reject"}
                              </td>
                              <td>
                                <Link to={"/admin/users/" + user?.id} title={"Edit"}>
                                  {" "}
                                  Edit{" "}
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    const confirmBox = window.confirm(
                                      "Do you really want to delete this User?"
                                    )
                                    if (confirmBox === true) {
                                      onDelete(user?.id)
                                    }
                                  }}
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
