import React from "react";
import { getUserLocalStorageData } from "./StoreLocalData";

function Profile() {
  const localStorageData = getUserLocalStorageData();
  console.log("localStorageData", localStorageData);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Profile</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  {/* <h3 className="box-title"> Sub Title</h3> */}
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-4">
                      <label>User Name</label>
                    </div>
                    <div className="col-xs-8">
                      <label>: {localStorageData?.name}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4">
                      <label>Email</label>
                    </div>
                    <div className="col-xs-8">
                      <label>: {localStorageData?.email}</label>
                    </div>
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

export default Profile;
