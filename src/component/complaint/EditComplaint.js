import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import {
  addComplaints,
  getUsers,
  getComplaintById,
  updateComplaintById,
  getLocationList,
} from "../../api";
import { addComplaintFormConstants } from "../constants";
import { toast } from "react-toastify";
import {
  API_USER_COMPLAINTS,
  API_ADMIN_COMPLAINTS,
} from "../../component/constants";

function EditComplaint(props) {
  const navigate = useNavigate();

  const [userList, setUserList] = useState({});
  const [locationList, setLocationList] = useState({});
  const [addComplaintFormFields, setAddComplaintFormFields] = useState({
    title: "",
    description: "",
    userId: "",
    status: "",
    locationId: "",
  });

  const localUserId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      getComplaintById(params?.id).then((res) => {
        setAddComplaintFormFields({
          title: res?.data?.title || "",
          description: res?.data?.description || "",
          userId: res?.data?.userId || "",
          status: res?.data?.status || "",
          locationId: res?.data?.locationId || "",
        });
      });
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
  }, [params.id, role]);

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
    const apiPath =
      role === "ROLE_USER" ? API_USER_COMPLAINTS : API_ADMIN_COMPLAINTS;
    updateComplaintById(apiPath, params?.id, addComplaintFormFields).then(
      (response) => {
        if (response?.status === 200) {
          toast.success("Complaint added successfully");
          if (role === "ROLE_ADMIN") {
            navigate("/admin/complaints");
          } else if (role === "ROLE_SUPERVISOR") {
            navigate("/supervisor/complaints");
          } else {
            navigate("/user/complaints");
          }
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    );
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

  const findSelectedOption = (listParam) => {
    const listParamTemp = showOptionsList(listParam);
    if (listParamTemp?.length) {
      return listParamTemp?.find(
        (list) => list?.value === addComplaintFormFields[listParam]
      );
    }
  };

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
                value={findSelectedOption(formField?.key)}
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
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Edit Complaint</h1>
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
                        disabled={
                          !addComplaintFormFields?.title ||
                          !addComplaintFormFields?.description |
                            !addComplaintFormFields?.userId ||
                          !addComplaintFormFields?.locationId
                        }
                      >
                        Update
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

export default EditComplaint;
