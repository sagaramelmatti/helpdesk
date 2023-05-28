import React from "react";

function PageNotFound() {
  return (
    <>
      <div className="content-wrapper">
        <section className="content-header"></section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  {/* <h3 className="box-title"> Sub Title</h3> */}
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-xs-12 text-center">
                      <h1>Not Authorized </h1>
                      <br/>
                      <h4>You are Not Authorized to view requested page , you can click to <a href="/login"><u> Sign In </u></a> to login again</h4>
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

export default PageNotFound;