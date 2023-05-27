import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useLogout from "./authentication/useLogOut";
import { PATH_LOGIN } from "./constants";

import { navigationConstants } from "./constants";
import { removeUserLocalStorageData } from "../component/common/StoreLocalData";

function Topmenu(props) {
  const [logoutPath, setLogoutPath] = useState(false);
  const role = localStorage.getItem("role");
  const location = useLocation();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    removeUserLocalStorageData();
    Navigate(PATH_LOGIN, { replace: true });
  };

  const renderNavBar = () => {
    return navigationConstants?.map((item) =>
      item?.rolesList?.includes(role) ? (
        <li key={role.label}>
          <Link
            to={
              item?.iconName === "fa-power-off" || logoutPath === true
                ? location?.pathname
                : item?.path
            }
            onClick={() => {
              if (item?.iconName === "fa-power-off") {
                const confirmBox = window.confirm(
                  "Do you really want to Logout?"
                );
                setLogoutPath(confirmBox);
                if (confirmBox === true) {
                  signOut();
                } else {
                  return null;
                }
              }
            }}
          >
            <i className={`fa ${item?.iconName}`}></i> {item?.label}
          </Link>
        </li>
      ) : (
        ""
      )
    );
  };
  return (
    <>
      <div className="wrapper">
        <header className="main-header">
          <nav className="navbar navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <a href="#" className="navbar-brand">
                  <b><img src="/resource/ledzer-backend/images/logobrpl.png" width="120" ></img>&nbsp;&nbsp; &nbsp; IT Helpdesk Portal</b>
                </a>
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse"
                >
                  <i className="fa fa-bars"></i>
                </button>
              </div>
              <div
                className="collapse navbar-collapse pull-left"
                id="navbar-collapse"
              >
                <ul className="nav navbar-nav">{renderNavBar()}</ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Topmenu;
