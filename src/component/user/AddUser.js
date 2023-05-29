import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartmentList, getLocationList, signUp } from "../../api";
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
    locationId: "",
    status: "A",
  });

  const [originalDepartmentList, setOriginalDepartmentList] = useState({});
  const [departmentList, setDepartmentList] = useState({});
  const [locationList, setLocationList] = useState({});

  useEffect(() => {
    getDepartmentList().then((response) => {
      if (response?.status === 200) {
        const departmentListTemp = response?.data?.map((item) => {
          return {
            value: item?.id,
            label: item?.name,
            locationId: item?.locationId,
          };
        });
        setOriginalDepartmentList(departmentListTemp);
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

  useEffect(() => {
    const filteredDepartmentList =
      originalDepartmentList?.length &&
      originalDepartmentList?.filter(
        (department) => department?.locationId === userData?.locationId
      );
    setDepartmentList(filteredDepartmentList);
    setUserData({ ...userData, departmentId: "" });
  }, [userData?.locationId]);

  const handleUserSave = () => {
    signUp(userData).then((res) => {
      if (res.status === 200) {
        toast.success(res?.data?.message);
        navigate("/admin/users");
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
              options={
                formField?.key === "departmentId"
                  ? departmentList
                  : locationList
              }
              value={
                formField?.key === "departmentId"
                  ? departmentList?.length &&
                    departmentList?.find((item1) => {
                      return item1?.value === userData?.departmentId;
                    })
                  : locationList?.length &&
                    locationList?.find(
                      (item1) => item1?.value === userData?.locationId
                    )
              }
              isDisabled={
                formField?.label === "Department" && !userData?.locationId
                  ? true
                  : false
              }
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
                      disabled={
                        !userData?.name ||
                        !userData?.email ||
                        !userData?.password ||
                        !userData?.departmentId ||
                        !userData?.locationId
                      }
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
