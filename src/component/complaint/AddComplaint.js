import React, { useState, useEffect } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'
import Select from 'react-select';
import axios from 'axios';
import ComplaintDataService from '../../services/ComplaintDataService';

function AddComplaint(props) {
    const navigate = useNavigate();

    const [department, setDepartment] = React.useState([]);
    const [user, setUsers] = React.useState([]);

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [userId, setUserId] = useState("");

    React.useEffect(() => {
      async function getDepartments() {
        const response = await fetch("http://localhost:8080/api/complaints/");
        const body = await response.json();
        setDepartment(body.map(item => {
            return { value: item.id, label: item.name };
          }));
      }

      getDepartments();
    }, []);

    useEffect(() => {
        setId(localStorage.getItem('iD'));
        setTitle(localStorage.getItem('title'));
        setDescription(localStorage.getItem('description'));
        setDepartmentId(localStorage.getItem('departmentId'));
        
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            title : title,
            description : description,
            departmentId : departmentId,
            userId : userId
        };

        //console.log(`data=`+data.userId);

        ComplaintDataService.create(data)
          .then(response => {
            console.log(response.data);
            navigate("/complaints");
          })
          .catch(e => {
            console.log(e);
          });
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
                                    <h3 className="box-title"> Complaint Master</h3>
                                </div>
                                <div className="box-body">
                                    <form method ="post" className='form' onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Title</label>
                                                <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Description</label>
                                                <input type="text" className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Department</label>
                                                    <select className='form-control select2' value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                                                        {department.map(o => (
                                                            <option key={o.value} value={o.value}>{o.label}</option>
                                                        ))}
                                                    </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <button type="submit" className="btn btn-success btn-block btn-flat r-btn">Save</button>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AddComplaint;