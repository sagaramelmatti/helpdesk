import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  PATH_LOGIN,
  PATH_PROFILE,
  PATH_PAGE_NOT_FOUND,
  SUPERVISOR_COMPLAINTS,
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
import ChangePassword from "./component/complaint/ChangePassword";
import AddComplaint from "./component/complaint/AddComplaint";
import EditComplaint from "./component/complaint/EditComplaint";
import AdminComplaintList from "./component/admin/complaint/AdminComplaintList";
import LocationList from "./component/location/LocationList";
import AddLocation from "./component/location/AddLocation";
import EditLocation from "./component/location/EditLocation";
import ComplaintReport from "./component/report/ComplaintReport";
import { Login } from "./component/authentication/Login";
import ProtectedRoutes from "./component/authentication/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";
import Toaster from "./component/common/Toaster";
import Profile from "./component/common/Profile";
import PageNotFound from "./component/common/PageNotFound";
import SupervisorComplaints from "./component/complaint/SupervisorComplaints";
import EditSupervisorComplaint from "./component/complaint/EditSupervisorComplaint";
import EditAdminComplaint from "./component/complaint/EditAdminComplaint";
import { ForgotPasswordPage } from "./component/authentication/ForgotPasswordPage";

function App() {

   function AdminComponent({ children }) {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN" || "") {
      return <>{("admin", children)}</>;
    } else {
      return <PageNotFound />;
    }
  }

  function UserComponent({ children }) {
    const role = localStorage.getItem("role");
    if (role === "ROLE_USER" || "") {
      return <>{("user", children)}</>;
    } else {
      return <PageNotFound />;
    }
  }

  function SupervisorComponent({ children }) {
    const role = localStorage.getItem("role");
    if (role === "ROLE_SUPERVISOR" || "") {
      return <>{("user", children)}</>;
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
                  <Route path="/" exact element={<Login />} />
                  <Route
                    path="/admin/users/add"
                    exact
                    element={
                      <AdminComponent>
                        <AddUser />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminComponent>
                        <UserList />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/users/:id"
                    element={
                      <AdminComponent>
                        <EditUser />
                      </AdminComponent>
                    }
                  />

                  <Route
                    path="/admin/departments"
                    element={
                      <AdminComponent>
                        <DepartmentList />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/departments/:id"
                    element={
                      <AdminComponent>
                        <EditDepartment />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/departments/add"
                    exact
                    element={
                      <AdminComponent>
                        <AddDepartment />
                      </AdminComponent>
                    }
                  />

                  <Route
                    path="/admin/locations"
                    element={
                      <AdminComponent>
                        <LocationList />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/locations/:id"
                    element={
                      <AdminComponent>
                        <EditLocation />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/locations/add"
                    exact
                    element={
                      <AdminComponent>
                        <AddLocation />
                      </AdminComponent>
                    }
                  />

                  <Route
                    path="/admin/complaints"
                    element={
                      <AdminComponent>
                        <AdminComplaintList />
                      </AdminComponent>
                    }
                  />
                  <Route
                    path="/admin/complaints/:id"
                    element={
                      <AdminComponent>
                        <EditAdminComplaint />
                      </AdminComponent>
                    }
                  />

                  <Route
                    path="/admin/reports/complaints"
                    element={
                      <AdminComponent>
                        <ComplaintReport />
                      </AdminComponent>
                    }
                  />

                  <Route
                    path="/user/complaints/"
                    element={
                      <UserComponent>
                        <ComplaintList />
                      </UserComponent>
                    }
                  />
                  <Route
                    path="/user/complaints/add"
                    exact
                    element={
                      <UserComponent>
                        <AddComplaint />
                      </UserComponent>
                    }
                  />
                  <Route
                    path="/user/complaints/:userId/:id"
                    exact
                    element={
                      <UserComponent>
                        <EditComplaint />
                      </UserComponent>
                    }
                  />
                  <Route
                    path="/user/password/change"
                    element={
                      <UserComponent>
                        <ChangePassword />
                      </UserComponent>
                    }
                  />
                  <Route path={PATH_PROFILE} element={<Profile />} />

                  <Route
                    path="/supervisor/complaints"
                    element={
                      <SupervisorComponent>
                        <SupervisorComplaints />
                      </SupervisorComponent>
                    }
                  />
                  <Route
                    path="/supervisor/complaints/:locationId/:id"
                    exact
                    element={
                      <SupervisorComponent>
                        <EditSupervisorComplaint />
                      </SupervisorComponent>
                    }
                  />
                </Route>
                <Route path="/user/password/forgot" element={<ForgotPasswordPage />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </body>
    </>
  );
}

export default App;
