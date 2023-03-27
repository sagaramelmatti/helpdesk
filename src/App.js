import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import AddUser from "./component/user/AddUser";
import UserList from "./component/user/UserList";
import Topmenu from "./component/Topmenu";
import AddProduct from './component/product/AddProduct';
import ProductList from './component/product/ProductList';
import EditUser from './component/user/EditUser';
import DepartmentList from './component/department/DepartmentList';
import AddDepartment from './component/department/AddDepartment';
import EditDepartment from './component/department/EditDepartment';

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
                <Route path='/addProduct' exact element={ <AddProduct/>  } />
                <Route path='/products' element={ <ProductList/> } />
                <Route path='/departments' element={ <DepartmentList/> } />
                <Route path='/departments/:id' element={ <EditDepartment/> } />
                <Route path='/addDepartment' exact element={ <AddDepartment/>  } />
              </Routes>
          </Router>
        </div>
      </body>
    </>
  );
}

export default App;
