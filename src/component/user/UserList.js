import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  // get users
  const getUsers = () => {
    axios
      .get("http://localhost:8080/api/admin/findAllUsers/")
      .then((response) => {
        if (response.status === 200) {
          setUsers(response?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`).then(() => {
      getUsers();
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
      complaintId: complaintId,
      comment: commentMessage,
    };

    console.log("complaintChangeData", complaintChangeData);
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
                  <a href="addUser">
                    <button className="btn btn-success">
                      <i className="glyphicon glyphicon-plus"></i> Add User
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
                        <th width="10%">Status</th>
                        <th width="10%"></th>
                        <th width="10%">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user) => (
                          <tr key={user?.id}>
                            <td> {user?.id} </td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.department?.name}</td>
                            <td>{user?.status}</td>
                            <td>
                              <Link to={"/users/" + user?.id} title={"Edit"}>
                                {" "}
                                Edit{" "}
                              </Link>
                            </td>
                            <td>
                              <button
                                href="#myModal"
                                class="btn btn-primary"
                                data-toggle="modal"
                                onClick={() => {
                                  setComplaintId(user?.id);
                                }}
                              >
                                <i className="fa fa-pencil"></i> Change{" "}
                              </button>
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

export default UserList;
