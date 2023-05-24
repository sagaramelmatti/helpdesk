import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  PATH_LOGIN,
  PATH_PROFILE,
  PATH_PAGE_NOT_FOUND,
  PATH_SUPERVISOR_COMPLAINTS
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

function App() {
  const role = localStorage.getItem("role");

  function ShowRoleWiseComponent({ children }) {
    if (role === "ROLE_ADMIN") {
      return <>{("admin", children)}</>;
    } else {
      return <PageNotFound />;
    }
  }

  function UserComponent({ children }) {
    if (role === "ROLE_USER") {
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
                  <Route path="/admin/users/add" exact element={<AddUser />} />
                  <Route path="/admin/users" element={<UserList />} />
                  <Route path="/admin/users/:id" element={<EditUser />} />
                  <Route
                    path="/user/complaints/add"
                    exact
                    element={<AddComplaint />}
                  />
                  <Route
                    path="/user/complaints/:id"
                    exact
                    element={<EditComplaint />}
                  />
                  <Route path="/admin/departments" element={<DepartmentList />} />
                  <Route path="/admin/departments/:id" element={<EditDepartment />} />
                  <Route
                    path="/admin/departments/add"
                    exact
                    element={<AddDepartment />}
                  />
                  <Route path="/admin/locations" element={<LocationList />} />
                  <Route path="/admin/locations/:id" element={<EditLocation />} />
                  <Route
                    path="/admin/locations/add"
                    exact
                    element={<AddLocation />}
                  />
                  <Route
                    path="/admin/complaints"
                    element={<AdminComplaintList />}
                  />
                  <Route path="/admin/complaints" element={<AdminComplaintList />} />
                  <Route path="/admin/complaints/:id" element={<EditComplaint />} />
                  <Route path="/user/complaints/" element={<ComplaintList />} />
                  <Route path="/user/password/change" element={<ChangePassword />} />
                  <Route path="/admin/reports/complaints" element={<ComplaintReport />} />
                  <Route path={PATH_PROFILE} element={<Profile />} />

                  <Route
                    path="/supervisor/complaints"
                    element={<SupervisorComplaints />}
                  />
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
