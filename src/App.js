import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import AddUser from "./component/user/AddUser";
import UserList from "./component/user/UserList";
import Topmenu from "./component/Topmenu";
import EditUser from './component/user/EditUser';
import DepartmentList from './component/department/DepartmentList';
import AddDepartment from './component/department/AddDepartment';
import EditDepartment from './component/department/EditDepartment';
import ComplaintList from './component/complaint/ComplaintList';
import AddComplaint from './component/complaint/AddComplaint';
import AdminComplaintList from './component/admin/complaint/AdminComplaintList';

function App() {
  return (
    <>
      <body className="hold-transition skin-blue layout-top-nav">
        <div className="wrapper">

          <Router>
            <Topmenu></Topmenu>
              <Routes>
                <Route path='/' exact element={ <UserList/>  } />
                <Route path='/addUser' exact element={ <AddUser/>  } />
                <Route path='/users' element={ <UserList/> } />
                <Route path='/users/:id' element={ <EditUser/> } />
                <Route path='/addComplaint' exact element={ <AddComplaint/>  } />
                <Route path='/complaints' element={ <ComplaintList/> } />
                <Route path='/departments' element={ <DepartmentList/> } />
                <Route path='/departments/:id' element={ <EditDepartment/> } />
                <Route path='/addDepartment' exact element={ <AddDepartment/>  } />
                <Route path='/adminComplaints' element={ <AdminComplaintList/> } />
              </Routes>
          </Router>
        </div>
      </body>
    </>
  );
}

export default App;
