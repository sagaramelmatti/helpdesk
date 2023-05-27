import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { toast } from "react-toastify";
import UserDataService from "../../services/UserDataService";

function ForgotPasswordPage(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            email: email
        };

        //console.log(`data=`+data.taxId);
        UserDataService.forgotPassword(data)
            .then(response => {
                if (response?.status === 200) {
                    console.log(response.data);
                    toast.success("New Password sent on registered email");
                    navigate("/login");
                  } else {
                    toast.error("Something went wrong, please try again");
                  }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Forgot Password</h1>
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
                                                    <label className="control-label">Email Id</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-3">
                                                <button type="submit" className="btn btn-success btn-block btn-flat r-btn" >
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

export default ForgotPasswordPage;
