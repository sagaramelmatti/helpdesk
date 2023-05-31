import React, { useState , useRef} from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useLogout from "./authentication/useLogOut";
import { PATH_LOGIN } from "./constants";

import { navigationConstants } from "./constants";
import { removeUserLocalStorageData } from "../component/common/StoreLocalData";
import { isMobile } from 'react-device-detect';

function Topmenu(props) {

  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);

  
  const [logoutPath, setLogoutPath] = useState(false);
  const role = localStorage.getItem("role");
  const location = useLocation();
  const logout = useLogout();
  const [toggle, setToggle] = useState(false);

  const signOut = async () => {
    await logout();
    removeUserLocalStorageData();
    Navigate(PATH_LOGIN, { replace: true });
  };

  function setToggleValue (event, value){
    setToggle(value);
}

  const renderNavBar = () => {
    /*
    if(isMobile) {
      setToggle(true);
    }
    */

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
        <header className="main-header">
          <nav className="navbar navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <a href="#" className="navbar-brand">
                  <b><img src="/resource/ledzer-backend/images/logobrpl.png" width="120" ></img>&nbsp;&nbsp; &nbsp; IT Helpdesk Portal</b>
                </a>
                <button 
                  onClick={e => setToggleValue(e, !toggle)} 
                  className="btn btn-primary mb-5" id="fabar">
                  <i className="fa fa-bars"></i>
                </button>
              </div>
              <div className="collapse navbar-collapse pull-left" id="navbar-collapse" >
                {toggle && (
                  <ul className="nav navbar-nav">{renderNavBar()}</ul>
                )}
              </div>
            </div>
          </nav>
        </header>
    </>
  );
}

export default Topmenu;
