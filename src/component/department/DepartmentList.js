import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function DepartmentList(props) {

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments();
    }, []);

    // get departments
    const getDepartments = () => {
        axios
            .get("http://localhost:8081/api/departments/")
            .then((response) => {
                if (response.status === 200) {
                    setDepartments(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        axios.delete(`http://localhost:8081/api/departments/${id}`)
        .then(() => {
            getDepartments();
        })
    }

    const setData = (data) => {
        let { id, name } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
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
                                    <h3 className="box-title"> Department List</h3>
                                </div>
                                <div className="box-body">
                                    <a href="/addDepartment"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add Department</button></a>
                                    <button className="btn btn-default" onClick="reload_table()"><i className="glyphicon glyphicon-refresh"></i> Reload</button>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No </th>
                                                <th width="30%">Name</th>
                                                <th width="30%">Location</th>
                                                <th width="15%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departments &&
                                                departments.map((department) => (
                                                    <tr key={department?.id} >
                                                        <td> {department?.id} </td>
                                                        <td>{department?.name}</td>
                                                        <td>{department?.location.name}</td>
                                                        
                                                        <td><button className="btn btn-danger" onClick={() => onDelete(department?.id)}><i className="fa fa-trash-o"></i> Delete </button></td>
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

export default DepartmentList;