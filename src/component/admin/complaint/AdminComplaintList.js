import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminComplaintList(props) {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        getComplaints();
    }, []);

    // get complaints
    const getComplaints = () => {
        axios
            .get("http://localhost:8080/api/admin/findAllComplaints/")
            .then((response) => {
                if (response.status === 200) {
                    setComplaints(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/api/complaints/${id}`)
        .then(() => {
            getComplaints();
        })
    }

    const setData = (data) => {
        let { id, title, description, status} = data;
        localStorage.setItem('id', id);
        localStorage.setItem('title', title);
        localStorage.setItem('description', description);
        localStorage.setItem('status', status);
    }


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
                                    <a href="addComplaint"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add Complaint</button></a>
                                    <button className="btn btn-default" onClick="reload_table()"><i className="glyphicon glyphicon-refresh"></i> Reload</button>
                                    <br />
                                    <br />

    <div id="myModal" className="modal fade">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Your Feedback</h5>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <form>
                        
                        <div className="form-group">
                            <label for="inputComment">Comments</label>
                            <textarea className="form-control" id="inputComment" rows="2"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    </div>

                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sr. No. </th>
                                                <th width="20%">Title</th>
                                                <th width="40%">Description</th>
                                                <th width="10%">Status</th>
                                                <th width="15%">change status</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {complaints &&
                                                complaints.map((complaint) => (
                                                    <tr key={complaint?.id} >
                                                        <td> {complaint?.id} </td>
                                                        <td>{complaint?.title}</td>
                                                        <td>{complaint?.description}</td>
                                                        <td>{complaint?.status}</td>
                                                        <td>    
                                                        <button href="#myModal" class="btn btn-primary" data-toggle="modal"><i className="fa fa-pencil"></i> Change </button>    
                                                        </td>
                                                        <td><button className="btn btn-danger" onClick={() => onDelete(complaint?.id)}><i className="fa fa-trash-o"></i> Delete </button></td>
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