import React from "react";
import { Link, Navigate } from "react-router-dom";
import useLogout from "./authentication/useLogOut";
import { PATH_ROOT } from "./constants";

import { navigationConstants } from "./constants";

function Topmenu(props) {
  const role = localStorage.getItem("role");

  const logout = useLogout();

  const signOut = async () => {
    await logout();
    Navigate(PATH_ROOT, { replace: true });
  };

  const renderNavBar = () => {
    return navigationConstants?.map((item) =>
      item?.rolesList?.includes(role) ? (
        <li key={role.label}>
          <Link
            to={item?.path}
            onClick={() => (item?.key === "log_out" ? signOut() : null)}
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
                <a href="/" className="navbar-brand">
                  <b>Ledzer</b>
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
