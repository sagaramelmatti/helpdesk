import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { saveAs } from "file-saver";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import PageLoader from "../common/PageLoader";
import { adminReportsSelectConstants, filterFormFields } from "../constants";
import { getLocationList } from "../../api/CommonApi";

import { getAdminComplaintsReport } from "../../api/CommonApi";
import moment from "moment";

function ComplaintReport(props) {
  const [complaints, setComplaints] = useState([]);
  const [complaintId, setComplaintId] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [locationList, setLocationList] = useState({});
  const [reportParam, setReportParam] = useState({
    location: "",
    from_date: "",
    to_date: "",
  });

  const navigate = useNavigate();

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

  const returnParam = (key, param) => {
    if (key === "from_date" || key === "to_date") {
      return moment(reportParam[param]).format("DD/MM/YYYY");
    }
    return param;
  };

  const createAndDownloadPdf = () => {
    let queryString;
    if (reportParam) {
      queryString = Object.keys(reportParam)
        .map((key) => key + "=" + returnParam(key, reportParam[key]))
        .join("&");
    }
    axios
      .post(
        `http://localhost:8080/api/admin/reports/complaints/?${
          queryString ? queryString : ""
        }`
      )
      .then(() =>
        axios.get("http://localhost:8080/api/admin/reports/complaints/", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  const checkCalenderdisabledCondition = (keyParam) => {
    if (keyParam === "to_date" && !reportParam?.from_date) {
      return true;
    }
    return false;
  };

  const renderDropdown = (typeParam, keyParam) => {
    if (typeParam === "select") {
      return (
        <Select
          onChange={(e) => {
            setReportParam({
              ...reportParam,
              [keyParam]: e.label,
            });
          }}
          options={locationList}
          value={
            locationList?.length &&
            locationList?.find((loc) => loc?.label === reportParam?.[keyParam])
          }
        />
      );
    }
    if (typeParam === "calender") {
      return (
        <div>
          <DatePicker
            onChange={(e) => setReportParam({ ...reportParam, [keyParam]: e })}
            value={reportParam?.[keyParam]}
            disabled={checkCalenderdisabledCondition(keyParam)}
            minDate={keyParam === "to_date" ? reportParam?.from_date : null}
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Add New Report</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title"> Report List</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    {adminReportsSelectConstants?.map((formField) => (
                      <div className="col-xs-2">
                        <label className="control-label">
                          {formField?.label}
                        </label>
                        {renderDropdown(formField?.type, formField.key)}
                      </div>
                    ))}
                  </div>
                  <div className="App" style={{ marginTop: "15px" }}>
                    <button
                      style={{ width: "250px" }}
                      onClick={() => createAndDownloadPdf()}
                      className="btn btn-success btn-block btn-flat r-btn"
                      disabled={Object.values(reportParam)?.some(
                        (item) => item === "" || item === null
                      )}
                    >
                      Download PDF
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

export default ComplaintReport;
