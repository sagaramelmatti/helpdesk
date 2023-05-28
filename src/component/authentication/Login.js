import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loginFormConstantants, registerFormConstantants } from "../constants";
import { signIn, signUp, getDepartmentList, getLocationList } from "../../api";
import AuthContext from "../../context/AuthProvider";
import Topmenu from "../Topmenu";

export const Login = () => {
  const submitBtnRef = useRef(null);
  const [loginFormFields, setLoginFormFields] = useState({});
  const [registerFormFields, setRegisterFormFields] = useState({
    password: "",
    retype_password: "",
    email: "",
    name: "",
    departmentId: null,
    locationId: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [departmentList, setDepartmentList] = useState({});
  const [locationList, setLocationList] = useState({});

  const [showForm, setShowForm] = useState("login");
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentList().then((response) => {
      if (response?.status === 200) {
        const departmentListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setDepartmentList(departmentListTemp);
      }
    });

    getLocationList().then((response) => {
      if (response?.status === 200) {
        const locationListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setLocationList(locationListTemp);
      }
    });
  }, []);

  // Check Email Validation
  const emailValidation = (keyParam, emailParam) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (keyParam === "email") {
      if (!emailParam || regex.test(emailParam) === false) {
        setEmailError(true);
        return false;
      }
      setEmailError(false);
      return true;
    }
    return "";
  };

  const registerFormHandlers = (key, value) => {
    setRegisterFormFields({
      ...registerFormFields,
      [key]: value,
    });
    emailValidation(key, value);
    if (key === "password" || key === "retype_password") {
      setPasswordError(false);
    }
  };

  const renderLoginForm = (formFieldConstants) => {
    return formFieldConstants?.map((item) => {
      return (
        <>
          {item.type !== "select" ? (
            <div className="col-12" key={item?.key}>
              <div className="form-group">
                <label>{item?.label}</label>
                <input
                  type={item?.type}
                  placeholder={item?.label}
                  className="form-control"
                  name={item?.key}
                  onChange={(e) => {
                    // eslint-disable-next-line no-unused-expressions
                    showForm === "login"
                      ? (setLoginFormFields({
                          ...loginFormFields,
                          [item.key]: e.target.value,
                        }),
                        setErrorMessage(""))
                      : registerFormHandlers(item?.key, e.target.value);
                  }}
                />
                {item?.key === "email" && showForm !== "login" && emailError ? (
                  <p
                    className="text-right error-message"
                    style={{ marginTop: "0px" }}
                  >
                    Pease enter correct email.
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div className="col-12" key={item?.key}>
              <div className="form-group">
                <label>{item?.label}</label>
                <Select
                  value={departmentList?.find(
                    (department) =>
                      department?.value ===
                      registerFormConstantants?.departmentId
                  )}
                  onChange={(e) =>
                    setRegisterFormFields({
                      ...registerFormFields,
                      [item?.key]: e.value,
                    })
                  }
                  options={departmentList}
                />
              </div>
            </div>
          )}
        </>
      );
    });
  };

  const handleLogin = () => {
    signIn(loginFormFields)?.then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("role", res.data.roles[0]);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("locationId", res.data.locationId);
        localStorage.setItem("departmentId", res.data.departmentId);
        const updatedUser = {
          token: res.data.accessToken,
          name: res.data.name,
        };
        setAuth?.(updatedUser);
        if (res.data.roles[0] === "ROLE_ADMIN") {
          navigate("/admin/complaints", { replace: true });
        } else if (res.data.roles[0] === "ROLE_SUPERVISOR") {
          navigate("/supervisor/complaints", { replace: true });
        } else {
          navigate("/user/complaints", { replace: true });
        }
      }
      if (res?.response?.status === 401 || res?.response?.status === 404) {
        setErrorMessage(res?.response?.data?.message);
      }
    });
  };

  const handleRegister = () => {
    const signUpData = {
      ...registerFormFields,
      userType: "U",
    };

    if (registerFormFields?.password !== registerFormFields?.retype_password) {
      setPasswordError(true);
    }
    if (registerFormFields?.password === registerFormFields?.retype_password) {
      signUp(signUpData).then((response) => {
        if (response?.status === 200) {
          toast.success(
            "You have been registered successfully, Admin team will contact you soon."
          );
        } else {
          toast.error(
            response?.response?.data?.message ||
              "Something went wrong please try again latter!"
          );
        }
      });
    }
  };

  const renderFormLink = (text, formValue) => {
    return (
      <>
        <Topmenu />
        <div
          className="register-login-link"
          onClick={() => setShowForm(formValue)}
        >
          {text}
        </div>
        {formValue !== "login" ? (
          <div className="register-login-link forgot-link">
            I forgot my password
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  return (
    <>
      <Topmenu />
      <div className="content-wrapper">
        <section className="content">
          <div className="login-wrapper">
            <section className="content-header">
              <h1 className="login-heading">Sign In</h1>
            </section>
            <div className="box">
              <div className="box-body ">
                <div className="row">
                  {renderLoginForm(
                    showForm === "login"
                      ? loginFormConstantants
                      : registerFormConstantants
                  )}
                  {showForm === "login" ? (
                    <div className="error-message">{errorMessage}</div>
                  ) : (
                    ""
                  )}
                </div>
                {passwordError && showForm !== "login" ? (
                  <div className="row">
                    <div className="col-12">
                      <p className="error-message">
                        Please make sure your password match
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-flat r-btn login-btn"
                      onClick={() => handleLogin()}
                      ref={submitBtnRef}
                    >
                      {showForm === "login" ? "Sign In" : "Register"}
                    </button>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12 col-md-offset-7">
                    <Link to="/user/password/forgot">
                      <span STYLE="font-size:12.0pt;color:red; text-decoration:underline ">
                        {" "}
                        Forgot Password{" "}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
