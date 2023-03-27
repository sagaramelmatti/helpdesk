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
    const [hsnCode, setHsnCode] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [userId, setTaxId] = useState("");
    const [rate, setRate] = useState("");
    

    React.useEffect(() => {
      async function getDepartments() {
        const response = await fetch("http://localhost:8080/api/complaints/");
        const body = await response.json();
        setDepartment(body.map(item => {
            return { value: item.id, label: item.name };
          }));
      }

      async function getUsers() {
        const response = await fetch("http://localhost:8080/api/users/");
        const body = await response.json();
        setUsers(body.map(item => {
            return { value: item.id, label: item.name };
          }));
          
      }

      getDepartments();
      getUsers();

    }, []);

    useEffect(() => {
        setId(localStorage.getItem('iD'));
        setTitle(localStorage.getItem('title'));
        setHsnCode(localStorage.getItem('hsnCode'));
        setDepartmentId(localStorage.getItem('departmentId'));
        setRate(localStorage.getItem('rate'));
        setTaxId(localStorage.getItem('userId'));
        
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            title : title,
            hsnCode : hsnCode,
            departmentId : departmentId,
            userId : userId,
            rate : rate,
            
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
                                                <label className="control-label">HSN / SAC Code</label>
                                                <input type="text" className="form-control" name="hsnCode" value={hsnCode} onChange={(e) => setHsnCode(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Title</label>
                                                <input type="text" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Rate</label>
                                                <input type="text" className="form-control" name="rate" value={rate} onChange={(e) => setRate(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required">
                                                <label className="control-label">Tax</label>
                                                    <select className='form-control select2' value={userId} defaultValue={"default"} onChange={(e) => setTaxId(e.target.value)} >
                                                        {users.map(o => (
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