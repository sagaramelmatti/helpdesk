import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { addComplaints, getLocationList, getUsers } from "../../api";

import { addComplaintFormConstants } from "../constants";
import { toast } from "react-toastify";

function AddComplaint(props) {
	
  const navigate = useNavigate();
  const [userList, setUserList] = useState({});
  const localUserId = localStorage.getItem("userId");
  const localDepartmentId = localStorage.getItem("departmentId");
  const role = localStorage.getItem("role");
  const locationId = localStorage.getItem("locationId");
  const submitBtnRef = useRef(null);


  const [addComplaintFormFields, setAddComplaintFormFields] = useState({
    title: "",
    description: "",
    userId: "",
    locationId: "",
    departmentId: "",
    status: "New Complaint",
  });
  const [locationList, setLocationList] = useState({});

  

  useEffect(() => {
    if (localUserId) {
      setAddComplaintFormFields({
        ...addComplaintFormFields,
        userId: localUserId,
        departmentId: localDepartmentId,
      });
    }
  }, [localUserId, role]);

  useEffect(() => {
    getLocationList().then((response) => {
      if (response?.status === 200) {
        const locationListTemp = response?.data?.map((item) => {
          return { value: item?.id, label: item?.name };
        });
        setLocationList(locationListTemp);

        //
        if (role === "ROLE_USER") {
          const defaultLocationId =
            response?.data?.length &&
            response?.data?.find(
              (item) => Number(item?.id) === Number(locationId)
            );
          setAddComplaintFormFields({
            ...addComplaintFormFields,
            locationId: defaultLocationId.id,
            userId: localUserId,
            departmentId: localDepartmentId,
          });
        }
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    addComplaints(addComplaintFormFields).then((response) => {
      if (response?.status === 200) {
        toast.success("Complaint added successfully");
        navigate("/user/complaints");
      } else {
        toast.error("Something went wrong, please try again");
      }
    });
  };

  const showOptionsList = (formFieldKey) => {
    switch (formFieldKey) {
      case "locationId":
        return locationList;
      default:
        return "";
    }
  };

  const renderFormFields = () => {
    return addComplaintFormConstants?.map((formField) => {
      if (formField?.roleList?.includes(role)) {
        return formField?.type === "text" ? (
          <div className="col-md-6" key={formField?.key}>
            <div
              className={`form-group ${formField?.isRequired ? "required" : ""
                }`}
            >
              <label className="control-label">{formField?.label}</label>
              <input
                type={formField?.type}
                className="form-control"
                name={formField?.key}
                value={addComplaintFormFields?.[formField?.key]}
                onChange={(e) =>
                  setAddComplaintFormFields({
                    ...addComplaintFormFields,
                    [formField?.key]: e.target.value,
                  })
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
                  setAddComplaintFormFields({
                    ...addComplaintFormFields,
                    [formField?.key]: e.value,
                  })
                }
                options={showOptionsList(formField?.key)}
                value={
                  role === "ROLE_USER"
                    ? showOptionsList(formField?.key)?.length &&
                    showOptionsList(formField?.key)?.find(
                      (item1) =>
                        item1.value === addComplaintFormFields?.locationId
                    )
                    : ""
                }
              />
            </div>
          </div>
        );
      }
      return "";
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Add New Complaint</h1>
        </section>
        <section className="content" style={{ minHeight: "500px" }}>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title"> Complaint Master</h3>
                </div>
                <div className="box-body">
                  <div className="row">{renderFormFields()}</div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button
                        style={{ width: "200px", display: "inline-block" }}
                        type="submit"
                        className="btn btn-success btn-block btn-flat r-btn"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        ref={submitBtnRef}
                        disabled={
                          !addComplaintFormFields?.title ||

                          !addComplaintFormFields?.locationId
                        }
                      >
                        Save
                      </button>
                    </div>
                    <div className="col-md-6"></div>
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

export default AddComplaint;
