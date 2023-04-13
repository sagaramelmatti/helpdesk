import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartmentList, getLocationList, getUsers, updateUser } from "../../api";
import { addUserFormConstants } from "../constants";
import Select from "react-select";
import { toast } from "react-toastify";

function EditUser(props) {
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    departmentId: "",
    locationId: "",
    status: "",
  });

  const [departmentList, setDepartmentList] = useState({});
  const [locationList, setLocationList] = useState({});

  const params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getUsers().then((res) => {
      const currentUser = res?.data?.find(
        (user) => user?.id === Number(params?.id)
      );
      setUserData({
        id: params?.id || null,
        name: currentUser?.name,
        email: currentUser?.email,
        password: currentUser?.password,
        departmentId: currentUser?.departmentId,
        status: currentUser?.status,
      });
    });
  }, [params.id]);

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
        setDepartmentList(locationListTemp);
      }
    });

  }, []);

  const handleUserSave = () => {
    updateUser(params?.id, userData).then((res) => {
      if (res.status === 200) {
        toast.success(res?.data?.message);
        navigate("/users");
      } else {
        toast.error("Something went wrong, please try again");
      }
    });
  };

  const findDepartmentOption = () => {
    if (departmentList && userData?.departmentId) {
      return departmentList?.find(
        (list) => list?.value === Number(userData?.departmentId)
      );
    }
  };

  const findLocationOption = () => {
    if (locationList && userData?.locationId) {
      return locationList?.find(
        (list) => list?.value === Number(userData?.locationId)
      );
    }
  };

  const renderFormFields = () => {
    return addUserFormConstants?.map((formField) => {
      if (formField?.formName?.includes("edit_user"))
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
                // value={
                //   departmentList &&
                //   userData?.departmentId &&
                //   findDepartmentOption()
                // }
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
          <h1>Edit User</h1>
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
                      Update
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

export default EditUser;
