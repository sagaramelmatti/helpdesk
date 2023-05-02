import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { saveAs } from 'file-saver';
import PageLoader from "../common/PageLoader";
import { filterFormFields } from "../constants";

import {
  getAdminComplaintsReport,
} from "../../api/CommonApi";


function ComplaintReport(props) {
	
	const [complaints, setComplaints] = useState([]);
	const [complaintId, setComplaintId] = useState("");
	const [commentMessage, setCommentMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [filterParams, setFilterParams] = useState({});
	
	const navigate = useNavigate();
	
  const createAndDownloadPdf = () => {
    axios.post('http://localhost:8080/api/admin/reports/complaints/')
      .then(() => axios.get('http://localhost:8080/api/admin/reports/complaints/', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
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
                                    <div className="App">
                                        <button onClick={() => createAndDownloadPdf()}>Download PDF</button>
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