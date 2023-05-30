import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDataService from "../../services/UserDataService";
import { Link } from "react-router-dom";
import Topmenu from "../Topmenu";

export const ForgotPasswordPage = () => {

    const submitBtnRef = useRef(null);
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            email: email
        };

        //console.log(`data=`+data.taxId);
        UserDataService.forgotPassword(data)
            .then(response => {
                console.log("status" +response.status);
                if (response?.status === 200) {
                    console.log(response.data);
                    setShow(true);
                    toast.success("New Password sent on registered email");
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
            <Topmenu />
            <div className="content-wrapper">
                <section className="content">
                    <div className="login-wrapper">
                        <section className="content-header">
                            <h1 className="login-heading">Forgot Password</h1>
                        </section>
                        <div className="box">
                        
                        <form method="post" className='form' onSubmit={handleSubmit}>
                            <br/>
                            <div className="box-body ">

                            {show && <div className="success-message">Please check email for new password</div>}
                                <div className="row">
                                    <div className="col-md-12">
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
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-success btn-block btn-flat r-btn" >
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12 col-md-offset-9">
                                        <Link to="/login">  
                                               <span STYLE="font-size:12.0pt;color:red; text-decoration:underline "> Sign In </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
