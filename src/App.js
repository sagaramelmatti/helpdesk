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
import EditComplaint from "./component/complaint/EditComplaint";
import AdminComplaintList from "./component/admin/complaint/AdminComplaintList";
import LocationList from "./component/location/LocationList";
import AddLocation from "./component/location/AddLocation";
import EditLocation from "./component/location/EditLocation";
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
      return <>{children}</>;
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
                  <Route path="/" exact element={<UserList />} />
                  <Route path="/addUser" exact element={<AddUser />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/:id" element={<EditUser />} />
                  <Route
                    path="/addComplaint"
                    exact
                    element={<AddComplaint />}
                  />
                  <Route
                    path="/editComplaint/:id"
                    exact
                    element={<EditComplaint />}
                  />
                  <Route path="/departments" element={<DepartmentList />} />
                  <Route path="/departments/:id" element={<EditDepartment />} />
                  <Route
                    path="/addDepartment"
                    exact
                    element={<AddDepartment />}
                  />
                  <Route path="/locations" element={<LocationList />} />
                  <Route path="/locations/:id" element={<EditLocation />} />
                  <Route
                    path="/addLocation"
                    exact
                    element={<AddLocation />}
                  />
                  <Route
                    path="/adminComplaints"
                    element={<AdminComplaintList />}
                  />
                  <Route path="/complaints" element={<ComplaintList />} />
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
