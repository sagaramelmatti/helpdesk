import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartmentList, signUp } from "../../api";
import { addUserFormConstants } from "../constants";
import Select from "react-select";
import { toast } from "react-toastify";

function AddUser(props) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    departmentId: "",
    status: "A",
  });
  const [departmentList, setDepartmentList] = useState({});

  useEffect(() => {
    getDepartmentList().then((response) => {
      if (response?.status === 200) {
        const departmentListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setDepartmentList(departmentListTemp);
      }
    });
  }, []);

  const handleUserSave = () => {
    signUp(userData).then((res) => {
      console.log("11111", userData);
      console.log("res.data", res.data);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        navigate("/users");
      } else {
        toast.error("Something went wrong, please try again");
      }
    });
  };

  const renderFormFields = () => {
    return addUserFormConstants?.map((formField) => {
      return formField?.type !== "select" ? (
        <div className="col-md-6" key={formField?.key}>
          <div className="form-group required">
            <label className="control-label">{formField?.label}</label>
            <input
              type={formField?.type}
              className="form-control"
              name={formField?.key}
              required
              value={userData?.[formField?.key]}
              onChange={(e) =>
                setUserData({ ...userData, [formField.key]: e.target.value })
              }
            />
          </div>
        </div>
      ) : (
        <div className="col-md-6" key={formField?.key}>
          <div className="form-group required">
            <label className="control-label">{formField?.label}</label>
            <Select
              onChange={(e) =>
                setUserData({ ...userData, [formField.key]: e.value })
              }
              options={departmentList}
            />
          </div>
        </div>
      );
    });
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
                  <h3 className="box-title"> User Master</h3>
                </div>
                <div className="box-body">
                  <div className="row">{renderFormFields()}</div>
                </div>
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button
                      style={{
                        maxWidth: "200px",
                        display: "inline-block",
                        marginBottom: "50px",
                      }}
                      type="submit"
                      className="btn btn-success btn-block btn-flat r-btn"
                      onClick={() => handleUserSave()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddUser;
