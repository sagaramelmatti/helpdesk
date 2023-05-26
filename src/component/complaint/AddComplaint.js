import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import {
  addComplaints,
  getLocationList,
  getUsers,
} from "../../api";
import { addComplaintFormConstants } from "../constants";
import { toast } from "react-toastify";

function AddComplaint(props) {
  const navigate = useNavigate();

  const [userList, setUserList] = useState({});
  const [addComplaintFormFields, setAddComplaintFormFields] = useState({
    title: "",
    description: "",
    userId: "",
    status: "New Complaint",
  });
  const [locationList, setLocationList] = useState({});

  const localUserId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (localUserId) {
      if (role === "ROLE_USER") {
        setAddComplaintFormFields({
          ...addComplaintFormFields,
          userId: localUserId,
        });
      }
    }
    if (role === "ROLE_ADMIN") {
      getUsers().then((response) => {
        if (response?.status === 200) {
          const userListTemp = response?.data?.map((item) => {
            return { value: item?.id, label: item?.name };
          });
          setUserList(userListTemp);
          return response?.data;
        }
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
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    addComplaints(addComplaintFormFields).then((response) => {
      if (response?.status === 200) {
        toast.success("Complaint added successfully");
        if (role === "ROLE_ADMIN") {
          navigate("/admin/complaints");
        } else if (role === "ROLE_USER") {
          navigate("/user/complaints");
        }
      } else {
        toast.error("Something went wrong, please try again");
      }
    });
  };

  const showOptionsList = (formFieldKey) => {
    switch (formFieldKey) {
      case "userId":
        return userList;
      case "locationId":
        return locationList;
      default:
        return "";
    }
  };

  console.log("addComplaintFormFields", addComplaintFormFields);

  const renderFormFields = () => {
    return addComplaintFormConstants?.map((formField) => {
      if (formField?.roleList?.includes(role)) {
        return formField?.type === "text" ? (
          <div className="col-md-6" key={formField?.key}>
            <div className="form-group required">
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
                        disabled={Object.values(addComplaintFormFields)?.some(
                          (item) => item === "" || item === null
                        )}
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
