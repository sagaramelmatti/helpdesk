import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  PATH_LOGIN,
  PATH_PROFILE,
  PATH_PAGE_NOT_FOUND,
  // PATH_ROOT,
  // ADD_CUSTOMER,
  // CUSTOMERS,
  // CUSTOMERS_ID,
  // ADD_PRODUCT,
  // PRODUCTS,
  // ADD_INVOICE,
  // INVOICES,
  // INVOIC_ID,
  // CATEGORY,
  // ADD_CATEGORY,
} from "./component/constants";

import AddUser from "./component/user/AddUser";
import UserList from "./component/user/UserList";
import EditUser from "./component/user/EditUser";
import DepartmentList from "./component/department/DepartmentList";
import AddDepartment from "./component/department/AddDepartment";
import EditDepartment from "./component/department/EditDepartment";
import ComplaintList from "./component/complaint/ComplaintList";
import AddComplaint from "./component/complaint/AddComplaint";
import AdminComplaintList from "./component/admin/complaint/AdminComplaintList";
import { Login } from "./component/authentication/Login";
import ProtectedRoutes from "./component/authentication/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";
import Toaster from "./component/common/Toaster";
import Profile from "./component/common/Profile";
import PageNotFound from "./component/common/PageNotFound";

function App() {
  const role = localStorage.getItem("role");

  function ShowRoleWiseComponent({ children }) {
    if (role === "ROLE_ADMIN") {
      console.log("11111");
      return <>{children}</>;
    } else {
      return <PageNotFound />;
    }
  }

  function UserComponent({ children }) {
    if (role === "ROLE_USER") {
      return <>{children}</>;
    } else {
      return <PageNotFound />;
    }
  }

  return (
    <>
      <body className="hold-transition skin-blue layout-top-nav">
        <div className="wrapper">
          <Toaster />
          <Router>
            <AuthProvider>
              <Routes>
                <Route path={PATH_LOGIN} element={<Login />} />
                <Route path={PATH_PAGE_NOT_FOUND} element={<PageNotFound />} />
                <Route element={<ProtectedRoutes />}>
                  <Route
                    path="/"
                    exact
                    element={
                      <ShowRoleWiseComponent>
                        <UserList />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/addUser"
                    exact
                    element={
                      <ShowRoleWiseComponent>
                        <AddUser />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ShowRoleWiseComponent>
                        <UserList />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/users/:id"
                    element={
                      <ShowRoleWiseComponent>
                        <EditUser />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/addComplaint"
                    exact
                    element={
                      <ShowRoleWiseComponent>
                        <AddComplaint />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/departments"
                    element={
                      <ShowRoleWiseComponent>
                        <DepartmentList />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/departments/:id"
                    element={
                      <ShowRoleWiseComponent>
                        <EditDepartment />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/addDepartment"
                    exact
                    element={
                      <ShowRoleWiseComponent>
                        <AddDepartment />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/adminComplaints"
                    element={
                      <ShowRoleWiseComponent>
                        <AdminComplaintList />
                      </ShowRoleWiseComponent>
                    }
                  />
                  <Route
                    path="/complaints"
                    element={
                      <UserComponent>
                        <ComplaintList />
                      </UserComponent>
                    }
                  />
                  <Route path={PATH_PROFILE} element={<Profile />} />
                </Route>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </body>
    </>
  );
}

export default App;
