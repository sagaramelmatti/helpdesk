import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import {
    addComplaints,
} from "../../api";

import { addComplaintFormConstants } from "../constants";
import { toast } from "react-toastify";
import UserDataService from "../../services/UserDataService";

function ChangePassword(props) {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const role = localStorage.getItem("role");

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            newPassword: newPassword
        };

        //console.log(`data=`+data.taxId);
        UserDataService.updatePassword(userId,data)
            .then(response => {
                console.log(response.data);
                navigate("/profile");
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Change Password</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Change Password</h3>
                                </div>
                                <div className="box-body">
                                    <form method="post" className='form' onSubmit={handleSubmit}>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Old Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">New Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="newPassword"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-flat r-btn"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                            <div className="col-md-6"></div>
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

export default ChangePassword;
